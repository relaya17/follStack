'use client'

import { useState } from 'react'
import { Brain, Camera, Languages, Shield, Globe, Zap, Settings, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { VoiceAIMentor } from './ai/VoiceAIMentor'
import { ARLearningExperience } from './ar/ARLearningExperience'
import { NeuralTranslator } from './translation/NeuralTranslator'
import { BlockchainCertificates } from './blockchain/BlockchainCertificates'
import { MetaverseClassroom } from './metaverse/MetaverseClassroom'

interface AdvancedFeaturesProps {
  isOpen: boolean
  onClose: () => void
}

export function AdvancedFeatures({ isOpen, onClose }: AdvancedFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [selectedLesson, setSelectedLesson] = useState<string>('html-css-basics')

  const features = [
    {
      id: 'voice-ai',
      title: 'מורה AI אישי',
      description: 'זיהוי קול מתקדם עם תמיכה רב-לשונית',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      component: VoiceAIMentor
    },
    {
      id: 'ar-learning',
      title: 'למידה במציאות רבודה',
      description: 'חוויה אינטראקטיבית עם AR',
      icon: Camera,
      color: 'from-blue-500 to-cyan-500',
      component: ARLearningExperience
    },
    {
      id: 'neural-translation',
      title: 'תרגום נוירלי',
      description: 'תרגום מתקדם עם AI',
      icon: Languages,
      color: 'from-green-500 to-emerald-500',
      component: NeuralTranslator
    },
    {
      id: 'blockchain-certificates',
      title: 'תעודות בלוקצ\'יין',
      description: 'תעודות מאומתות ומוגנות',
      icon: Shield,
      color: 'from-orange-500 to-red-500',
      component: BlockchainCertificates
    },
    {
      id: 'metaverse-classroom',
      title: 'כיתה במטאוורס',
      description: 'למידה בסביבה וירטואלית',
      icon: Globe,
      color: 'from-indigo-500 to-purple-500',
      component: MetaverseClassroom
    }
  ]

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId)
  }

  const handleCloseFeature = () => {
    setActiveFeature(null)
  }

  const renderActiveFeature = () => {
    const feature = features.find(f => f.id === activeFeature)
    if (!feature) return null

    switch (feature.id) {
      case 'voice-ai':
        return <VoiceAIMentor isOpen={true} onClose={handleCloseFeature} />
      case 'ar-learning':
        return <ARLearningExperience isActive={true} lessonId={selectedLesson} onClose={handleCloseFeature} />
      case 'neural-translation':
        return <NeuralTranslator isOpen={true} onClose={handleCloseFeature} />
      case 'blockchain-certificates':
        return <BlockchainCertificates isOpen={true} onClose={handleCloseFeature} />
      case 'metaverse-classroom':
        return <MetaverseClassroom isOpen={true} onClose={handleCloseFeature} roomId="demo-room" />
      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  תכונות מתקדמות
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI • AR • Blockchain • Metaverse • Neural Translation
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="סגור"
                title="סגור"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group cursor-pointer"
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-600">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {feature.description}
                      </p>
                      
                      <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                        <span>התחל עכשיו</span>
                        <svg className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                טכנולוגיות מתקדמות
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">AI & Machine Learning</h4>
                  <ul className="space-y-1">
                    <li>• זיהוי קול מתקדם</li>
                    <li>• תרגום נוירלי</li>
                    <li>• המלצות אישיות</li>
                    <li>• ניתוח התקדמות</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Extended Reality</h4>
                  <ul className="space-y-1">
                    <li>• מציאות רבודה (AR)</li>
                    <li>• מציאות מדומה (VR)</li>
                    <li>• מטאוורס</li>
                    <li>• אינטראקציה 3D</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Blockchain & Web3</h4>
                  <ul className="space-y-1">
                    <li>• תעודות מאומתות</li>
                    <li>• NFT certificates</li>
                    <li>• Smart contracts</li>
                    <li>• Decentralized learning</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Real-time Collaboration</h4>
                  <ul className="space-y-1">
                    <li>• שיתוף קוד בזמן אמת</li>
                    <li>• צ&#39;אט וידאו</li>
                    <li>• מסכים משותפים</li>
                    <li>• עבודה קבוצתית</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Render Active Feature */}
        {renderActiveFeature()}
      </motion.div>
    </AnimatePresence>
  )
}
