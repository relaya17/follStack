'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Languages, Mic, MicOff, Volume2, Copy, Download, Globe, Brain, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface TranslationResult {
  id: string
  originalText: string
  translatedText: string
  sourceLanguage: string
  targetLanguage: string
  confidence: number
  timestamp: Date
  context?: string
  alternatives?: string[]
}

interface NeuralTranslatorProps {
  isOpen: boolean
  onClose: () => void
}

const SUPPORTED_LANGUAGES = [
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
]

export function NeuralTranslator({ isOpen, onClose }: NeuralTranslatorProps) {
  const [sourceLanguage, setSourceLanguage] = useState('he')
  const [targetLanguage, setTargetLanguage] = useState('en')
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [isTranslating, setIsTranslating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [translationHistory, setTranslationHistory] = useState<TranslationResult[]>([])
  const [confidence, setConfidence] = useState(0)
  const [alternatives, setAlternatives] = useState<string[]>([])
  const [isRealTime, setIsRealTime] = useState(false)
  const [context, setContext] = useState('general')

  const recognitionRef = useRef<any>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = getLanguageCode(sourceLanguage)

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
          setInputText(finalTranscript)
          if (isRealTime) {
            translateText(finalTranscript)
          }
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
  }, [sourceLanguage, isRealTime])

  // Real-time translation
  useEffect(() => {
    if (isRealTime && inputText) {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
      
      debounceRef.current = setTimeout(() => {
        translateText(inputText)
      }, 500)
    }
  }, [inputText, isRealTime])

  const getLanguageCode = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      'he': 'he-IL',
      'en': 'en-US',
      'ar': 'ar-SA',
      'es': 'es-ES',
      'fr': 'fr-FR',
      'de': 'de-DE',
      'it': 'it-IT',
      'pt': 'pt-PT',
      'ru': 'ru-RU',
      'zh': 'zh-CN',
      'ja': 'ja-JP',
      'ko': 'ko-KR'
    }
    return languageMap[lang] || 'en-US'
  }

  const translateText = useCallback(async (text: string) => {
    if (!text.trim()) return

    setIsTranslating(true)
    
    try {
      const response = await fetch('/api/translation/neural', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          text,
          sourceLanguage,
          targetLanguage,
          context,
          realTime: isRealTime
        })
      })

      const data = await response.json()
      
      setTranslatedText(data.translatedText)
      setConfidence(data.confidence)
      setAlternatives(data.alternatives || [])

      // Add to history
      const translation: TranslationResult = {
        id: Date.now().toString(),
        originalText: text,
        translatedText: data.translatedText,
        sourceLanguage,
        targetLanguage,
        confidence: data.confidence,
        timestamp: new Date(),
        context,
        alternatives: data.alternatives
      }

      setTranslationHistory(prev => [translation, ...prev.slice(0, 49)]) // Keep last 50
    } catch (error) {
      console.error('Translation error:', error)
    } finally {
      setIsTranslating(false)
    }
  }, [sourceLanguage, targetLanguage, context, isRealTime])

  const speakText = useCallback((text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = getLanguageCode(language)
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 0.8

      speechSynthesis.speak(utterance)
      synthesisRef.current = utterance
    }
  }, [])

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

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setInputText(translatedText)
    setTranslatedText(inputText)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const downloadTranslation = (translation: TranslationResult) => {
    const content = `Original (${translation.sourceLanguage}): ${translation.originalText}\n\nTranslated (${translation.targetLanguage}): ${translation.translatedText}\n\nConfidence: ${translation.confidence}%\nTimestamp: ${translation.timestamp.toISOString()}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `translation-${translation.id}.txt`
    a.click()
    URL.revokeObjectURL(url)
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
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  תרגום נוירלי מתקדם
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI-powered translation • Real-time • Voice support
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button
                onClick={() => setIsRealTime(!isRealTime)}
                className={`p-2 rounded-lg transition-colors ${
                  isRealTime 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}
                title="תרגום בזמן אמת"
              >
                <Zap className="h-5 w-5" />
              </button>
              
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Main Translation Area */}
            <div className="flex-1 flex flex-col p-6">
              {/* Language Selector */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">משפה:</span>
                    <select
                      value={sourceLanguage}
                      onChange={(e) => setSourceLanguage(e.target.value)}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                    >
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={swapLanguages}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    title="החלף שפות"
                  >
                    <Languages className="h-5 w-5" />
                  </button>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">לשפה:</span>
                    <select
                      value={targetLanguage}
                      onChange={(e) => setTargetLanguage(e.target.value)}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                    >
                      {SUPPORTED_LANGUAGES.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <select
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                  >
                    <option value="general">כללי</option>
                    <option value="technical">טכני</option>
                    <option value="academic">אקדמי</option>
                    <option value="business">עסקי</option>
                    <option value="casual">לא פורמלי</option>
                  </select>
                </div>
              </div>

              {/* Translation Input/Output */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Input */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      טקסט מקור
                    </h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={isListening ? stopListening : startListening}
                        className={`p-2 rounded-lg transition-colors ${
                          isListening
                            ? 'bg-red-500 text-white animate-pulse'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        title="הקלטה קולית"
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => speakText(inputText, sourceLanguage)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="השמעה"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="הקלד או הקלט טקסט לתרגום..."
                    className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    dir={sourceLanguage === 'he' || sourceLanguage === 'ar' ? 'rtl' : 'ltr'}
                  />
                  
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {inputText.length} תווים
                    </span>
                    <button
                      onClick={() => translateText(inputText)}
                      disabled={!inputText.trim() || isTranslating}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isTranslating ? 'מתרגם...' : 'תרגם'}
                    </button>
                  </div>
                </div>

                {/* Output */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      תרגום
                    </h3>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => speakText(translatedText, targetLanguage)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="השמעה"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => copyToClipboard(translatedText)}
                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        title="העתק"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 overflow-y-auto">
                    {translatedText ? (
                      <div>
                        <p 
                          className="text-gray-900 dark:text-white leading-relaxed"
                          dir={targetLanguage === 'he' || targetLanguage === 'ar' ? 'rtl' : 'ltr'}
                        >
                          {translatedText}
                        </p>
                        
                        {confidence > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-600 dark:text-gray-400">רמת ביטחון:</span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {confidence}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  confidence >= 90 ? 'bg-green-500' :
                                  confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${confidence}%` }}
                              ></div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-center">
                        התרגום יופיע כאן...
                      </p>
                    )}
                  </div>

                  {/* Alternatives */}
                  {alternatives.length > 0 && (
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                        חלופות:
                      </h4>
                      <div className="space-y-1">
                        {alternatives.map((alt, index) => (
                          <button
                            key={index}
                            onClick={() => setTranslatedText(alt)}
                            className="block w-full text-right p-2 text-sm bg-gray-100 dark:bg-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors"
                            dir={targetLanguage === 'he' || targetLanguage === 'ar' ? 'rtl' : 'ltr'}
                          >
                            {alt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Translation History */}
            <div className="w-80 border-l border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                היסטוריית תרגומים
              </h3>
              
              <div className="space-y-3">
                {translationHistory.map((translation) => (
                  <motion.div
                    key={translation.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => {
                      setInputText(translation.originalText)
                      setTranslatedText(translation.translatedText)
                      setSourceLanguage(translation.sourceLanguage)
                      setTargetLanguage(translation.targetLanguage)
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {translation.timestamp.toLocaleTimeString()}
                      </span>
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            downloadTranslation(translation)
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                          <Download className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-900 dark:text-white mb-1 line-clamp-2">
                      {translation.originalText}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                      {translation.translatedText}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {SUPPORTED_LANGUAGES.find(l => l.code === translation.sourceLanguage)?.flag} → 
                        {SUPPORTED_LANGUAGES.find(l => l.code === translation.targetLanguage)?.flag}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {translation.confidence}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
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
