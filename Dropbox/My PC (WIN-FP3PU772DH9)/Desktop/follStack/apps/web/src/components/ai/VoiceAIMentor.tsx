'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Mic, MicOff, Volume2, VolumeX, Settings, Brain, MessageCircle, Camera, Globe } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface VoiceMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  audioUrl?: string
  confidence?: number
  language?: string
}

interface VoiceAIMentorProps {
  isOpen: boolean
  onClose: () => void
}

export function VoiceAIMentor({ isOpen, onClose }: VoiceAIMentorProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<VoiceMessage[]>([])
  const [currentLanguage, setCurrentLanguage] = useState('he')
  const [voiceSettings, setVoiceSettings] = useState({
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8,
    voice: 'default'
  })
  const [isARMode, setIsARMode] = useState(false)
  const [isMetaverseMode, setIsMetaverseMode] = useState(false)

  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = currentLanguage === 'he' ? 'he-IL' : 'en-US'

      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = ''
        let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        if (finalTranscript) {
          handleUserMessage(finalTranscript)
        }
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [currentLanguage])

  // Initialize audio context for advanced audio processing
  useEffect(() => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      audioContextRef.current = new AudioContext()
    }
  }, [])

  const handleUserMessage = useCallback(async (transcript: string) => {
    const userMessage: VoiceMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: transcript,
      timestamp: new Date(),
      language: currentLanguage
    }

    setMessages(prev => [...prev, userMessage])

    // Send to AI API with voice context
    try {
      const response = await fetch('/api/ai/voice-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          message: transcript,
          language: currentLanguage,
          context: 'voice',
          arMode: isARMode,
          metaverseMode: isMetaverseMode
        })
      })

      const data = await response.json()
      
      const aiMessage: VoiceMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date(),
        audioUrl: data.audioUrl,
        language: currentLanguage
      }

      setMessages(prev => [...prev, aiMessage])
      
      // Speak the response
      speakText(data.response, data.audioUrl)
    } catch (error) {
      console.error('Error sending voice message:', error)
    }
  }, [currentLanguage, isARMode, isMetaverseMode])

  const speakText = useCallback((text: string, audioUrl?: string) => {
    if (audioUrl) {
      // Play pre-generated audio
      const audio = new Audio(audioUrl)
      audio.play()
      setIsSpeaking(true)
      audio.onended = () => setIsSpeaking(false)
    } else {
      // Use speech synthesis
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = currentLanguage === 'he' ? 'he-IL' : 'en-US'
        utterance.rate = voiceSettings.speed
        utterance.pitch = voiceSettings.pitch
        utterance.volume = voiceSettings.volume

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)

        speechSynthesis.speak(utterance)
        synthesisRef.current = utterance
      }
    }
  }, [currentLanguage, voiceSettings])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const toggleARMode = () => {
    setIsARMode(!isARMode)
    if (!isARMode) {
      // Initialize AR features
      initializeAR()
    }
  }

  const toggleMetaverseMode = () => {
    setIsMetaverseMode(!isMetaverseMode)
    if (!isMetaverseMode) {
      // Initialize Metaverse features
      initializeMetaverse()
    }
  }

  const initializeAR = () => {
    // AR initialization logic
    console.log('Initializing AR mode...')
  }

  const initializeMetaverse = () => {
    // Metaverse initialization logic
    console.log('Initializing Metaverse mode...')
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  מורה AI אישי
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  זיהוי קול מתקדם • תרגום נוירלי • AR • מטאוורס
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {/* Mode toggles */}
              <button
                onClick={toggleARMode}
                className={`p-2 rounded-lg transition-colors ${
                  isARMode 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                title="מציאות רבודה"
              >
                <Camera className="h-5 w-5" />
              </button>
              
              <button
                onClick={toggleMetaverseMode}
                className={`p-2 rounded-lg transition-colors ${
                  isMetaverseMode 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                title="מטאוורס"
              >
                <Globe className="h-5 w-5" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.language && (
                      <span className="bg-white/20 px-2 py-1 rounded">
                        {message.language === 'he' ? 'עברית' : 'English'}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Voice Controls */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-6 rtl:space-x-reverse">
              {/* Language Selector */}
              <select
                value={currentLanguage}
                onChange={(e) => setCurrentLanguage(e.target.value)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
                <option value="ar">العربية</option>
                <option value="es">Español</option>
              </select>

              {/* Voice Controls */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={isListening ? stopListening : startListening}
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-primary-500 text-white hover:bg-primary-600'
                  }`}
                >
                  {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                </button>

                <button
                  onClick={isSpeaking ? stopSpeaking : undefined}
                  disabled={!isSpeaking}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isSpeaking
                      ? 'bg-orange-500 text-white animate-pulse'
                      : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>

              {/* Settings */}
              <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Settings className="h-5 w-5" />
              </button>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-center mt-4 space-x-4 rtl:space-x-reverse text-sm">
              {isListening && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span>מאזין...</span>
                </div>
              )}
              {isSpeaking && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-orange-500">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span>מדבר...</span>
                </div>
              )}
              {isARMode && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-blue-500">
                  <Camera className="h-4 w-4" />
                  <span>AR פעיל</span>
                </div>
              )}
              {isMetaverseMode && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-green-500">
                  <Globe className="h-4 w-4" />
                  <span>מטאוורס פעיל</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any
    SpeechRecognition: any
  }
}
