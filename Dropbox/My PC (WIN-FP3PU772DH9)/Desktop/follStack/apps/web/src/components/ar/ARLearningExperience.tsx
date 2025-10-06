'use client'

// @ts-ignore
import { useState, useEffect, useRef, useCallback } from 'react'
import { Camera, Target, Zap, Eye, Layers, RotateCcw, Play, Pause } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ARNode {
  id: string
  x: number
  y: number
  label?: string
}

interface AREdge {
  id: string
  from: string
  to: string
  label?: string
}

interface ARDiagramContent {
  nodes: ARNode[]
  edges: AREdge[]
}

interface ARCodeContent {
  language: string
  code: string
  syntaxHighlighting: boolean
}

interface AR3DModelContent {
  modelUrl: string
  textureUrl?: string
  animations?: string[]
}

interface ARAnimationContent {
  type: 'rotation' | 'translation' | 'scale' | 'custom'
  duration: number
  loop: boolean
  keyframes: Array<{
    time: number
    value: Record<string, number>
  }>
}

type ARContent = ARDiagramContent | ARCodeContent | AR3DModelContent | ARAnimationContent

interface ARObject {
  id: string
  type: 'code' | 'diagram' | '3d-model' | 'animation'
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  scale: { x: number; y: number; z: number }
  content: ARContent
  interactive: boolean
}

interface ARLessonData {
  arObjects: Array<{
    id: string
    type: 'code' | 'diagram' | '3d-model' | 'animation'
    position?: { x: number; y: number; z: number }
    rotation?: { x: number; y: number; z: number }
    scale?: { x: number; y: number; z: number }
    content: ARContent
    interactive?: boolean
  }>
}

interface ARLearningExperienceProps {
  isActive: boolean
  lessonId: string
  onClose: () => void
}

export function ARLearningExperience({ isActive, lessonId, onClose }: ARLearningExperienceProps) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [arObjects, setArObjects] = useState<ARObject[]>([])
  const [selectedObject, setSelectedObject] = useState<ARObject | null>(null)
  const [isTracking, setIsTracking] = useState(false)
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(null)
  const [arMode, setArMode] = useState<'surface' | 'face' | 'image' | 'world'>('surface')
  const [isPlaying, setIsPlaying] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const arContextRef = useRef<WebGLRenderingContext | null>(null)

  // Initialize AR
  useEffect(() => {
    if (isActive && !isInitialized) {
      initializeAR()
    }
  }, [isActive, isInitialized])

  const initializeAR = useCallback(async () => {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      
      setCameraPermission(true)
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }

      // Initialize AR.js or similar AR library
      await initializeARLibrary()
      
      // Load lesson-specific AR content
      await loadARContent(lessonId)
      
      setIsInitialized(true)
      setIsTracking(true)
    } catch (error) {
      console.error('Failed to initialize AR:', error)
      setCameraPermission(false)
    }
  }, [lessonId])

  const initializeARLibrary = async () => {
    // Initialize AR.js or WebXR
    if (typeof window !== 'undefined') {
      // This would typically initialize AR.js or similar
      console.log('Initializing AR library...')
      
      // Mock AR context for development
      arContextRef.current = {
        start: () => setIsTracking(true),
        stop: () => setIsTracking(false),
        addObject: (obj: ARObject) => setArObjects(prev => [...prev, obj]),
        removeObject: (id: string) => setArObjects(prev => prev.filter(obj => obj.id !== id))
      }
    }
  }

  const loadARContent = async (lessonId: string) => {
    try {
      const response = await fetch(`/api/ar/lesson/${lessonId}`)
      const data = await response.json()
      
      // Create AR objects based on lesson content
      const objects: ARObject[] = data.arObjects.map((obj) => ({
        id: obj.id,
        type: obj.type,
        position: obj.position || { x: 0, y: 0, z: 0 },
        rotation: obj.rotation || { x: 0, y: 0, z: 0 },
        scale: obj.scale || { x: 1, y: 1, z: 1 },
        content: obj.content,
        interactive: obj.interactive || false
      }))
      
      setArObjects(objects)
    } catch (error) {
      console.error('Failed to load AR content:', error)
      // Create mock AR objects for development
      createMockARObjects()
    }
  }

  const createMockARObjects = () => {
    const mockObjects: ARObject[] = [
      {
        id: '1',
        type: 'code',
        position: { x: 0, y: 0, z: -0.5 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        content: {
          language: 'javascript',
          code: `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`
        },
        interactive: true
      },
      {
        id: '2',
        type: 'diagram',
        position: { x: 0.5, y: 0, z: -0.5 },
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
        scale: { x: 1, y: 1, z: 1 },
        content: {
          type: 'flowchart',
          nodes: [
            { id: 'start', label: 'Start', x: 0, y: 0 },
            { id: 'process', label: 'Process', x: 0, y: -100 },
            { id: 'end', label: 'End', x: 0, y: -200 }
          ],
          edges: [
            { from: 'start', to: 'process' },
            { from: 'process', to: 'end' }
          ]
        },
        interactive: true
      },
      {
        id: '3',
        type: '3d-model',
        position: { x: -0.5, y: 0, z: -0.5 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 0.5, y: 0.5, z: 0.5 },
        content: {
          model: 'cube',
          material: 'wireframe',
          color: '#3b82f6'
        },
        interactive: true
      }
    ]
    
    setArObjects(mockObjects)
  }

  const handleObjectInteraction = (objectId: string) => {
    const object = arObjects.find(obj => obj.id === objectId)
    if (object) {
      setSelectedObject(object)
    }
  }

  const renderARObject = (object: ARObject) => {
    switch (object.type) {
      case 'code':
        return (
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-w-xs">
            <pre>{object.content.code}</pre>
          </div>
        )
      case 'diagram':
        return (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <svg width="200" height="200" viewBox="0 0 200 200">
              {(object.content as ARDiagramContent).nodes.map((node) => (
                <circle
                  key={node.id}
                  cx={node.x + 100}
                  cy={node.y + 100}
                  r="20"
                  fill="#3b82f6"
                  className="cursor-pointer hover:fill-blue-600"
                />
              ))}
              {(object.content as ARDiagramContent).edges.map((edge, index: number) => (
                <line
                  key={index}
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="0"
                  stroke="#3b82f6"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
        )
      case '3d-model':
        return (
          <div className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            3D Model
          </div>
        )
      default:
        return null
    }
  }

  if (!isActive) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black z-50 flex flex-col"
      >
        {/* AR Camera View */}
        <div className="flex-1 relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            muted
          />
          
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
          />

          {/* AR Objects Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {arObjects.map((object) => (
              <motion.div
                key={object.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute pointer-events-auto"
                style={{
                  left: `${50 + object.position.x * 100}%`,
                  top: `${50 + object.position.y * 100}%`,
                  transform: `translate(-50%, -50%) rotateY(${object.rotation.y}rad)`
                }}
                onClick={() => object.interactive && handleObjectInteraction(object.id)}
              >
                {renderARObject(object)}
              </motion.div>
            ))}
          </div>

          {/* Tracking Status */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded-lg">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className={`w-2 h-2 rounded-full ${isTracking ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                {isTracking ? 'מעקב פעיל' : 'מחפש משטח'}
              </span>
            </div>
          </div>
        </div>

        {/* AR Controls */}
        <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {/* Mode Selector */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setArMode('surface')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  arMode === 'surface' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                משטח
              </button>
              <button
                onClick={() => setArMode('face')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  arMode === 'face' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                פנים
              </button>
              <button
                onClick={() => setArMode('image')}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  arMode === 'image' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
              >
                תמונה
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              
              <button
                onClick={() => setArObjects([])}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        {/* Object Details Panel */}
        <AnimatePresence>
          {selectedObject && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="absolute bottom-20 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedObject.type === 'code' ? 'קוד' : 
                   selectedObject.type === 'diagram' ? 'דיאגרמה' : 
                   selectedObject.type === '3d-model' ? 'מודל 3D' : 'אובייקט'}
                </h3>
                <button
                  onClick={() => setSelectedObject(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-2">
                {selectedObject.type === 'code' && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      שפת תכנות: {selectedObject.content.language}
                    </p>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                      <pre>{selectedObject.content.code}</pre>
                    </div>
                  </div>
                )}
                
                {selectedObject.type === 'diagram' && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      סוג דיאגרמה: {selectedObject.content.type}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      מספר צמתים: {selectedObject.content.nodes.length}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded-lg max-w-xs">
          <p className="text-sm">
            {arMode === 'surface' && 'הצב את המצלמה על משטח שטוח'}
            {arMode === 'face' && 'הצב את המצלמה על פנים'}
            {arMode === 'image' && 'הצב את המצלמה על תמונה'}
            {arMode === 'world' && 'סובב את המצלמה בחלל'}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
