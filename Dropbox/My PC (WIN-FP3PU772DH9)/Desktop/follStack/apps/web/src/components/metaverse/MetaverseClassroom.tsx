'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Users, Mic, MicOff, Video, VideoOff, Hand, Chat, Settings, Globe, Headphones, Share, Lock, Unlock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Avatar {
  id: string
  name: string
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  isMuted: boolean
  isVideoOn: boolean
  isHandRaised: boolean
  isSpeaking: boolean
  avatar: {
    skin: string
    hair: string
    clothes: string
    accessories: string[]
  }
}

interface MetaverseClassroomProps {
  isOpen: boolean
  onClose: () => void
  roomId: string
}

export function MetaverseClassroom({ isOpen, onClose, roomId }: MetaverseClassroomProps) {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [currentUser, setCurrentUser] = useState<Avatar | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isHandRaised, setIsHandRaised] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{
    id: string
    user: string
    message: string
    timestamp: Date
    isPrivate: boolean
    type: 'text' | 'system' | 'announcement'
  }>>([])
  const [newMessage, setNewMessage] = useState('')
  const [isPrivate, setIsPrivate] = useState(false)
  const [roomSettings, setRoomSettings] = useState({
    maxParticipants: 50,
    allowScreenShare: true,
    allowChat: true,
    allowHandRaise: true,
    recordingEnabled: false
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  // Initialize Metaverse environment
  useEffect(() => {
    if (isOpen) {
      initializeMetaverse()
    }
    
    return () => {
      cleanup()
    }
  }, [isOpen])

  const initializeMetaverse = useCallback(async () => {
    try {
      // Initialize WebGL context
      const canvas = canvasRef.current
      if (!canvas) return

      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) {
        console.error('WebGL not supported')
        return
      }

      // Initialize audio context
      audioContextRef.current = new AudioContext()

      // Get user media
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      mediaStreamRef.current = stream

      // Connect to WebSocket for real-time communication
      connectToRoom()

      // Create current user avatar
      const userAvatar: Avatar = {
        id: 'current-user',
        name: 'אני',
        position: { x: 0, y: 0, z: 0 },
        rotation: { x: 0, y: 0, z: 0 },
        isMuted: false,
        isVideoOn: true,
        isHandRaised: false,
        isSpeaking: false,
        avatar: {
          skin: 'light',
          hair: 'brown',
          clothes: 'casual',
          accessories: []
        }
      }

      setCurrentUser(userAvatar)
      setAvatars([userAvatar])

      // Start rendering loop
      startRenderLoop()

    } catch (error) {
      console.error('Failed to initialize Metaverse:', error)
    }
  }, [])

  const connectToRoom = useCallback(() => {
    const socket = new WebSocket(`ws://localhost:3001/metaverse/room/${roomId}`)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('Connected to Metaverse room')
    }

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      handleRoomMessage(data)
    }

    socket.onclose = () => {
      console.log('Disconnected from Metaverse room')
    }
  }, [roomId])

  const handleRoomMessage = (data: any) => {
    switch (data.type) {
      case 'avatar_joined':
        setAvatars(prev => [...prev, data.avatar])
        break
      case 'avatar_left':
        setAvatars(prev => prev.filter(avatar => avatar.id !== data.avatarId))
        break
      case 'avatar_moved':
        setAvatars(prev => prev.map(avatar => 
          avatar.id === data.avatarId 
            ? { ...avatar, position: data.position, rotation: data.rotation }
            : avatar
        ))
        break
      case 'avatar_updated':
        setAvatars(prev => prev.map(avatar => 
          avatar.id === data.avatarId 
            ? { ...avatar, ...data.updates }
            : avatar
        ))
        break
      case 'chat_message':
        setChatMessages(prev => [...prev, data.message])
        break
      case 'hand_raised':
        setAvatars(prev => prev.map(avatar => 
          avatar.id === data.avatarId 
            ? { ...avatar, isHandRaised: data.isHandRaised }
            : avatar
        ))
        break
    }
  }

  const startRenderLoop = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return

    const render = () => {
      // Clear canvas
      gl.clearColor(0.1, 0.1, 0.2, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      // Render 3D environment
      renderEnvironment(gl)
      
      // Render avatars
      avatars.forEach(avatar => {
        renderAvatar(gl, avatar)
      })

      requestAnimationFrame(render)
    }

    render()
  }, [avatars])

  const renderEnvironment = (gl: WebGLRenderingContext) => {
    // Render classroom environment
    // This would typically use a 3D engine like Three.js
    // For now, we'll just render a simple background
  }

  const renderAvatar = (gl: WebGLRenderingContext, avatar: Avatar) => {
    // Render individual avatar
    // This would typically use 3D models and animations
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({
        type: 'toggle_mute',
        isMuted: !isMuted
      }))
    }
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({
        type: 'toggle_video',
        isVideoOn: !isVideoOn
      }))
    }
  }

  const toggleHandRaise = () => {
    setIsHandRaised(!isHandRaised)
    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({
        type: 'toggle_hand_raise',
        isHandRaised: !isHandRaised
      }))
    }
  }

  const sendChatMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      senderName: 'אני',
      content: newMessage,
      timestamp: new Date(),
      type: 'text'
    }

    setChatMessages(prev => [...prev, message])
    setNewMessage('')

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({
        type: 'chat_message',
        message
      }))
    }
  }

  const moveAvatar = (direction: 'forward' | 'backward' | 'left' | 'right') => {
    if (!currentUser) return

    const moveDistance = 0.1
    let newPosition = { ...currentUser.position }

    switch (direction) {
      case 'forward':
        newPosition.z -= moveDistance
        break
      case 'backward':
        newPosition.z += moveDistance
        break
      case 'left':
        newPosition.x -= moveDistance
        break
      case 'right':
        newPosition.x += moveDistance
        break
    }

    setCurrentUser(prev => prev ? { ...prev, position: newPosition } : null)
    setAvatars(prev => prev.map(avatar => 
      avatar.id === 'current-user' 
        ? { ...avatar, position: newPosition }
        : avatar
    ))

    if (socketRef.current) {
      socketRef.current.send(JSON.stringify({
        type: 'avatar_moved',
        position: newPosition,
        rotation: currentUser.rotation
      }))
    }
  }

  const cleanup = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
    }
    if (socketRef.current) {
      socketRef.current.close()
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex flex-col"
      >
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          />

          {/* UI Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Bar */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="bg-black/50 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{avatars.length} משתתפים</span>
                  </div>
                </div>
                
                <div className="bg-black/50 text-white px-3 py-2 rounded-lg">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Globe className="h-4 w-4" />
                    <span className="text-sm">כיתה וירטואלית</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setIsPrivate(!isPrivate)}
                  className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                  aria-label={isPrivate ? "פתח חדר" : "נעל חדר"}
                >
                  {isPrivate ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Movement Controls */}
            <div className="absolute bottom-4 left-4 pointer-events-auto">
              <div className="bg-black/50 text-white p-2 rounded-lg">
                <div className="grid grid-cols-3 gap-1">
                  <div></div>
                  <button
                    onClick={() => moveAvatar('forward')}
                    className="p-2 hover:bg-white/20 rounded transition-colors"
                  >
                    ↑
                  </button>
                  <div></div>
                  <button
                    onClick={() => moveAvatar('left')}
                    className="p-2 hover:bg-white/20 rounded transition-colors"
                  >
                    ←
                  </button>
                  <div className="p-2 text-center text-xs">מרכז</div>
                  <button
                    onClick={() => moveAvatar('right')}
                    className="p-2 hover:bg-white/20 rounded transition-colors"
                  >
                    →
                  </button>
                  <div></div>
                  <button
                    onClick={() => moveAvatar('backward')}
                    className="p-2 hover:bg-white/20 rounded transition-colors"
                  >
                    ↓
                  </button>
                  <div></div>
                </div>
              </div>
            </div>

            {/* Participants List */}
            <div className="absolute top-4 right-4 w-64 bg-black/50 text-white rounded-lg p-4 pointer-events-auto">
              <h3 className="font-semibold mb-3">משתתפים</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {avatars.map((avatar) => (
                  <div
                    key={avatar.id}
                    className="flex items-center space-x-2 rtl:space-x-reverse p-2 hover:bg-white/10 rounded transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {avatar.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{avatar.name}</div>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {avatar.isMuted && <MicOff className="h-3 w-3 text-red-400" />}
                        {!avatar.isVideoOn && <VideoOff className="h-3 w-3 text-red-400" />}
                        {avatar.isHandRaised && <Hand className="h-3 w-3 text-yellow-400" />}
                        {avatar.isSpeaking && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {/* Media Controls */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={toggleMute}
                className={`p-3 rounded-full transition-colors ${
                  isMuted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              <button
                onClick={toggleVideo}
                className={`p-3 rounded-full transition-colors ${
                  !isVideoOn 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </button>

              <button
                onClick={toggleHandRaise}
                className={`p-3 rounded-full transition-colors ${
                  isHandRaised 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Hand className="h-5 w-5" />
              </button>

              <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Share className="h-5 w-5" />
              </button>
            </div>

            {/* Chat */}
            <div className="flex-1 max-w-md mx-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="הקלד הודעה..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  dir="rtl"
                />
                <button
                  onClick={sendChatMessage}
                  className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Chat className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Settings */}
            <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages Overlay */}
        <AnimatePresence>
          {chatMessages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 left-4 w-80 bg-black/50 text-white rounded-lg p-4 max-h-64 overflow-y-auto"
            >
              <div className="space-y-2">
                {chatMessages.slice(-10).map((message) => (
                  <div key={message.id} className="text-sm">
                    <span className="font-medium text-blue-400">{message.senderName}:</span>
                    <span className="ml-2">{message.content}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
