'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/components/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Send, 
  MessageCircle, 
  Languages, 
  User, 
  Bot,
  Globe,
  Volume2,
  VolumeX
} from 'lucide-react'

interface Message {
  id: string
  text: string
  translatedText: string
  fromLanguage: string
  toLanguage: string
  timestamp: Date
  isFromUser: boolean
  userName: string
}

interface TranslatorChatProps {
  targetLanguage?: string
  userName?: string
}

export function TranslatorChat({ 
  targetLanguage = 'en', 
  userName = 'You' 
}: TranslatorChatProps) {
  const { currentLanguage } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const detectLanguage = async (text: string): Promise<string> => {
    try {
      const response = await fetch('/api/detect-language', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      return data.detectedLanguage || currentLanguage
    } catch (error) {
      console.error('Language detection failed:', error)
      return currentLanguage
    }
  }

  const translateMessageText = async (text: string, fromLanguage: string, toLanguage: string): Promise<string> => {
    try {
      const response = await fetch('/api/translate-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, fromLanguage, toLanguage }),
      })

      const data = await response.json()
      return data.translatedText || text
    } catch (error) {
      console.error('Translation failed:', error)
      return text
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setIsLoading(true)
    setIsTranslating(true)

    try {
      // זיהוי שפה של ההודעה
      const detectedLanguage = await detectLanguage(newMessage)
      
      // תרגום ההודעה
      const translatedText = await translateMessageText(newMessage, detectedLanguage, targetLanguage)

      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        translatedText,
        fromLanguage: detectedLanguage,
        toLanguage: targetLanguage,
        timestamp: new Date(),
        isFromUser: true,
        userName
      }

      setMessages(prev => [...prev, message])
      setNewMessage('')

      // סימולציה של תגובה מהצד השני
      setTimeout(async () => {
        const responses = [
          { he: 'שלום! איך אתה?', en: 'Hello! How are you?', ar: 'مرحبا! كيف حالك؟' },
          { he: 'תודה רבה!', en: 'Thank you very much!', ar: 'شكرا جزيلا!' },
          { he: 'זה נהדר!', en: 'That\'s great!', ar: 'هذا رائع!' },
          { he: 'אני בסדר, תודה', en: 'I\'m fine, thank you', ar: 'أنا بخير، شكرا' }
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        const responseText = randomResponse[targetLanguage as keyof typeof randomResponse] || randomResponse.en
        
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: responseText,
          translatedText: await translateMessageText(responseText, targetLanguage, detectedLanguage),
          fromLanguage: targetLanguage,
          toLanguage: detectedLanguage,
          timestamp: new Date(),
          isFromUser: false,
          userName: 'Chat Partner'
        }

        setMessages(prev => [...prev, responseMessage])
        setIsTranslating(false)
      }, 2000)

    } catch (error) {
      console.error('Error sending message:', error)
      setIsTranslating(false)
    } finally {
      setIsLoading(false)
    }
  }

  const getLanguageFlag = (language: string) => {
    const flags: Record<string, string> = {
      'he': '🇮🇱',
      'en': '🇺🇸',
      'ar': '🇸🇦'
    }
    return flags[language] || '🌐'
  }

  const getLanguageName = (language: string) => {
    const names: Record<string, string> = {
      'he': 'עברית',
      'en': 'English',
      'ar': 'العربية'
    }
    return names[language] || language
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Translator Chat</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Globe className="h-3 w-3" />
                <span>Auto Translate</span>
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Start a conversation! Your messages will be automatically translated.</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.isFromUser ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    {message.isFromUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    <span className="text-sm font-medium">{message.userName}</span>
                    <Badge variant="outline" className="text-xs">
                      {getLanguageFlag(message.fromLanguage)} {getLanguageName(message.fromLanguage)}
                    </Badge>
                  </div>
                  
                  <div
                    className={`p-3 rounded-lg ${
                      message.isFromUser
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>

                  {message.translatedText !== message.text && (
                    <div className="mt-2 p-2 bg-gray-50 rounded border-l-4 border-blue-500">
                      <div className="flex items-center space-x-2 mb-1">
                        <Languages className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-gray-600">
                          Translated to {getLanguageFlag(message.toLanguage)} {getLanguageName(message.toLanguage)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{message.translatedText}</p>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}

            {isTranslating && (
              <div className="flex justify-start">
                <div className="max-w-[80%]">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="h-4 w-4" />
                    <span className="text-sm font-medium">Chat Partner</span>
                    <Badge variant="outline" className="text-xs">
                      {getLanguageFlag(targetLanguage)} {getLanguageName(targetLanguage)}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 text-gray-900">
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                      <span className="text-sm">Translating...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !newMessage.trim()}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your message will be automatically translated to {getLanguageFlag(targetLanguage)} {getLanguageName(targetLanguage)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
