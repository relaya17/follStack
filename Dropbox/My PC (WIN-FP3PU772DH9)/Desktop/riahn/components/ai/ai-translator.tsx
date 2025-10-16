'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { 
  Languages, 
  Mic, 
  MicOff, 
  Volume2, 
  Copy, 
  RefreshCw,
  Sparkles,
  Globe,
  BookOpen,
  Lightbulb
} from 'lucide-react'
// import { useToast } from '@/components/ui/toast'

// Mock toast functions for now
const useToast = () => ({
  success: (message: string) => console.log('Success:', message),
  error: (message: string) => console.log('Error:', message)
})

interface AITranslatorProps {
  onTranslation?: (result: TranslationResult) => void
  initialSourceLanguage?: string
  initialTargetLanguage?: string
}

interface TranslationResult {
  translatedText: string
  confidence: number
  pronunciation?: string
  culturalNotes?: string[]
  alternatives?: string[]
  detectedLanguage?: string
  processingTime: number
}

export function AITranslator({ 
  onTranslation, 
  initialSourceLanguage = 'he',
  initialTargetLanguage = 'ar'
}: AITranslatorProps) {
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLanguage, setSourceLanguage] = useState(initialSourceLanguage)
  const [targetLanguage, setTargetLanguage] = useState(initialTargetLanguage)
  const [isTranslating, setIsTranslating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [translationResult, setTranslationResult] = useState<TranslationResult | null>(null)
  const [context, setContext] = useState('')
  const [includePronunciation, setIncludePronunciation] = useState(true)
  const [includeCulturalNotes, setIncludeCulturalNotes] = useState(true)
  const [translationHistory, setTranslationHistory] = useState<TranslationResult[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [favorites, setFavorites] = useState<TranslationResult[]>([])
  const [showFavorites, setShowFavorites] = useState(false)
  
  const { success, error } = useToast()
  const recognitionRef = useRef<any>(null)

  const languages = [
    { value: 'auto', label: 'זיהוי אוטומטי', flag: '🔍' },
    { value: 'he', label: 'עברית', flag: '🇮🇱' },
    { value: 'ar', label: 'ערבית', flag: '🇸🇦' },
    { value: 'en', label: 'אנגלית', flag: '🇺🇸' },
    { value: 'si', label: 'סינהלית', flag: '🇱🇰' },
    { value: 'ta', label: 'טמילית', flag: '🇱🇰' }
  ]

  const contexts = [
    { value: '', label: 'כללי' },
    { value: 'formal', label: 'רשמי' },
    { value: 'casual', label: 'לא רשמי' },
    { value: 'business', label: 'עסקי' },
    { value: 'academic', label: 'אקדמי' },
    { value: 'medical', label: 'רפואי' }
  ]

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = getLanguageCode(sourceLanguage)

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSourceText(transcript)
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
        error('שגיאה בזיהוי דיבור')
      }
    }
  }, [sourceLanguage, error])

  const getLanguageCode = (lang: string) => {
    const codes = {
      'he': 'he-IL',
      'ar': 'ar-SA',
      'en': 'en-US',
      'si': 'si-LK',
      'ta': 'ta-LK'
    }
    return codes[lang as keyof typeof codes] || 'he-IL'
  }

  const detectLanguage = async (text: string) => {
    try {
      const response = await fetch('/api/translate/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.data) {
          setSourceLanguage(data.data.language)
          success(`שפה זוהתה: ${languages.find(l => l.value === data.data.language)?.label}`)
        }
      }
    } catch (error) {
      console.error('Language detection failed:', error)
    }
  }

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    setIsTranslating(true)
    try {
      // Auto-detect language if source language is not set
      if (sourceLanguage === 'auto') {
        await detectLanguage(sourceText)
      }

      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage: sourceLanguage === 'auto' ? undefined : sourceLanguage,
          targetLanguage,
          context,
          includePronunciation,
          includeCulturalNotes
        }),
      })

      if (!response.ok) {
        throw new Error('Translation failed')
      }

      const data = await response.json()
      if (data.success && data.data) {
        const result: TranslationResult = data.data
        setTranslatedText(result.translatedText)
        setTranslationResult(result)
        
        // Add to history
        setTranslationHistory(prev => [result, ...prev.slice(0, 9)]) // Keep last 10 translations
        
        onTranslation?.(result)
      } else {
        throw new Error(data.error || 'Translation failed')
      }
      
      success('תרגום הושלם בהצלחה!')
    } catch (err) {
      error('שגיאה בתרגום')
      console.error('Translation error:', err)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      error('זיהוי דיבור לא נתמך בדפדפן זה')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const handleSpeak = (text: string, language: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = getLanguageCode(language)
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    success('הטקסט הועתק ללוח')
  }

  const handleToggleFavorite = (translation: TranslationResult) => {
    const isFavorite = favorites.some(fav => 
      fav.translatedText === translation.translatedText && 
      fav.confidence === translation.confidence
    )
    
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => 
        !(fav.translatedText === translation.translatedText && 
          fav.confidence === translation.confidence)
      ))
      success('הוסר מהמועדפים')
    } else {
      setFavorites(prev => [...prev, translation])
      success('נוסף למועדפים')
    }
  }

  const isFavorite = (translation: TranslationResult) => {
    return favorites.some(fav => 
      fav.translatedText === translation.translatedText && 
      fav.confidence === translation.confidence
    )
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600'
    if (confidence >= 0.7) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            AI Translator
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFavorites(!showFavorites)}
            className="text-gray-600 hover:text-gray-800"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            מועדפים ({favorites.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-600 hover:text-gray-800"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            היסטוריה ({translationHistory.length})
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSourceText('')
              setTranslatedText('')
              setTranslationResult(null)
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            נקה הכל
          </Button>
        </div>
      </div>

      {/* Language Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                שפת מקור
              </label>
              <div className="flex gap-2">
                <Select
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  options={languages}
                  className="flex-1"
                />
                {sourceText.trim() && sourceLanguage !== 'auto' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => detectLanguage(sourceText)}
                    className="px-3"
                    title="זהה שפה אוטומטית"
                  >
                    🔍
                  </Button>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={handleSwapLanguages}
                className="p-2"
                aria-label="החלף שפות"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                שפת יעד
              </label>
              <Select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                options={languages}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Translation Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            <span>טקסט לתרגום</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="הקלד או דבר את הטקסט שתרצה לתרגם..."
              className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
              rows={4}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoiceInput}
              className={`absolute top-2 right-2 ${isListening ? 'bg-red-100 text-red-600' : ''}`}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>

          {/* Advanced Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                הקשר
              </label>
              <Select
                value={context}
                onChange={(e) => setContext(e.target.value)}
                options={contexts}
              />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includePronunciation}
                  onChange={(e) => setIncludePronunciation(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">כולל הגייה</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={includeCulturalNotes}
                  onChange={(e) => setIncludeCulturalNotes(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">הערות תרבותיות</span>
              </label>
            </div>
          </div>

          <Button
            onClick={handleTranslate}
            disabled={isTranslating || !sourceText.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
          >
            {isTranslating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                מתרגם...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                תרגם עם AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Translation Result */}
      {translatedText && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>תרגום</span>
              </div>
              {translationResult && (
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${getConfidenceColor(translationResult.confidence)}`}>
                    דיוק: {Math.round(translationResult.confidence * 100)}%
                  </span>
                  <span className="text-xs text-gray-500">
                    {translationResult.processingTime}ms
                  </span>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-900 dark:text-white leading-relaxed">
                  {translatedText}
                </p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => translationResult && handleToggleFavorite(translationResult)}
                  className={`p-1 ${translationResult && isFavorite(translationResult) ? 'text-yellow-500' : 'text-gray-500'}`}
                  title={translationResult && isFavorite(translationResult) ? 'הסר ממועדפים' : 'הוסף למועדפים'}
                >
                  <Sparkles className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSpeak(translatedText, targetLanguage)}
                  className="p-1"
                  title="השמע"
                >
                  <Volume2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(translatedText)}
                  className="p-1"
                  title="העתק"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Pronunciation */}
            {translationResult?.pronunciation && (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Volume2 className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-400">
                    הגייה
                  </span>
                </div>
                <p className="text-blue-700 dark:text-blue-300">
                  {translationResult.pronunciation}
                </p>
              </div>
            )}

            {/* Cultural Notes */}
            {translationResult?.culturalNotes && translationResult.culturalNotes.length > 0 && (
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                    הערות תרבותיות
                  </span>
                </div>
                <ul className="space-y-1">
                  {translationResult.culturalNotes.map((note, index) => (
                    <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                      • {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Alternatives */}
            {translationResult?.alternatives && translationResult.alternatives.length > 0 && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-400">
                    תרגומים חלופיים
                  </span>
                </div>
                <div className="space-y-1">
                  {translationResult.alternatives.map((alt, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-green-700 dark:text-green-300">
                        {alt}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSpeak(alt, targetLanguage)}
                          className="p-1 h-6 w-6"
                        >
                          <Volume2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(alt)}
                          className="p-1 h-6 w-6"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Translation History */}
      {showHistory && translationHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>היסטוריית תרגומים</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTranslationHistory([])}
                className="text-red-600 hover:text-red-800"
              >
                נקה היסטוריה
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {translationHistory.map((item, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">
                          {new Date().toLocaleTimeString('he-IL')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                          item.confidence >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {Math.round(item.confidence * 100)}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        {item.translatedText}
                      </p>
                      {item.pronunciation && (
                        <p className="text-xs text-gray-500 italic">
                          הגייה: {item.pronunciation}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSourceText('')
                          setTranslatedText(item.translatedText)
                          setTranslationResult(item)
                        }}
                        className="p-1 h-6 w-6"
                        title="השתמש בתרגום זה"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSpeak(item.translatedText, targetLanguage)}
                        className="p-1 h-6 w-6"
                        title="השמע"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(item.translatedText)}
                        className="p-1 h-6 w-6"
                        title="העתק"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Favorites */}
      {showFavorites && favorites.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                <span>תרגומים מועדפים</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFavorites([])}
                className="text-red-600 hover:text-red-800"
              >
                נקה מועדפים
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {favorites.map((item, index) => (
                <div
                  key={index}
                  className="p-3 border border-yellow-200 dark:border-yellow-700 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-500">
                          {new Date().toLocaleTimeString('he-IL')}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                          item.confidence >= 0.7 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {Math.round(item.confidence * 100)}%
                        </span>
                        <Sparkles className="h-3 w-3 text-yellow-500" />
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                        {item.translatedText}
                      </p>
                      {item.pronunciation && (
                        <p className="text-xs text-gray-500 italic">
                          הגייה: {item.pronunciation}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSourceText('')
                          setTranslatedText(item.translatedText)
                          setTranslationResult(item)
                        }}
                        className="p-1 h-6 w-6"
                        title="השתמש בתרגום זה"
                      >
                        <RefreshCw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSpeak(item.translatedText, targetLanguage)}
                        className="p-1 h-6 w-6"
                        title="השמע"
                      >
                        <Volume2 className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopy(item.translatedText)}
                        className="p-1 h-6 w-6"
                        title="העתק"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFavorite(item)}
                        className="p-1 h-6 w-6 text-yellow-500"
                        title="הסר ממועדפים"
                      >
                        <Sparkles className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
