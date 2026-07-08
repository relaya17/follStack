'use client'

import { useState } from 'react'
import { Card } from '@follstack/ui'
import { Brain, Mic, MicOff, Send, MessageCircle, Sparkles, BookOpen, Code, Lightbulb } from 'lucide-react'


interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface AIFeature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  status: 'active' | 'coming-soon'
}

const aiFeatures: AIFeature[] = [
  {
    id: '1',
    title: 'Voice Mentor',
    description: 'שיחה קולית עם ה-AI Mentor שלך - שאל שאלות וקבל תשובות מידיות',
    icon: Mic,
    color: 'bg-blue-500',
    status: 'active'
  },
  {
    id: '2',
    title: 'Code Review',
    description: 'העלה קוד וקבל ביקורת מקצועית עם המלצות לשיפור',
    icon: Code,
    color: 'bg-green-500',
    status: 'active'
  },
  {
    id: '3',
    title: 'Learning Path',
    description: 'מסלול למידה מותאם אישית בהתאם לרמה ולמטרות שלך',
    icon: BookOpen,
    color: 'bg-purple-500',
    status: 'active'
  },
  {
    id: '4',
    title: 'Smart Suggestions',
    description: 'הצעות חכמות לפרויקטים, משאבים וכלים לפי ההתקדמות שלך',
    icon: Lightbulb,
    color: 'bg-yellow-500',
    status: 'coming-soon'
  }
]

export default function AIMentorPage() {
  const [isListening, setIsListening] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'שלום! אני ה-AI Mentor שלך. איך אני יכול לעזור לך היום?',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'זוהי תשובה לדוגמה מה-AI Mentor. בפועל, זה יהיה מחובר למערכת AI אמיתית שתספק תשובות מקצועיות ומעודכנות.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiMessage])
    }, 1000)
  }

  const handleVoiceToggle = () => {
    setIsListening(!isListening)
    // Here you would implement actual voice recognition
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-12 w-12 text-primary-600 ml-4" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              AI Mentor
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            המנטור האישי שלך לפיתוח - זמין 24/7 לענות על שאלות, לתת עצות ולהדריך אותך בדרך להצלחה.
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.id} className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {feature.description}
                </p>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  feature.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}>
                  {feature.status === 'active' ? 'פעיל' : 'בקרוב'}
                </span>
              </Card>
            )
          })}
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-96 flex flex-col">
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div className="mr-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">AI Mentor</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">מחובר</p>
                  </div>
                </div>
                <button
                  onClick={handleVoiceToggle}
                  className={`p-2 rounded-full transition-colors duration-200 ${
                    isListening 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="שאל את ה-AI Mentor שלך..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors duration-200"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                פעולות מהירות
              </h3>
              <div className="space-y-3">
                <button className="w-full text-right p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <div className="font-medium text-gray-900 dark:text-white">בדוק קוד שלי</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">העלה קבצי קוד לבדיקה</div>
                </button>
                <button className="w-full text-right p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <div className="font-medium text-gray-900 dark:text-white">מסלול למידה</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">קבל המלצות מותאמות</div>
                </button>
                <button className="w-full text-right p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  <div className="font-medium text-gray-900 dark:text-white">פתור בעיה</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">תיאור הבעיה וקבל פתרון</div>
                </button>
              </div>
            </Card>

            {/* Recent Conversations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                שיחות אחרונות
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">React Hooks</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">לפני 2 שעות</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">JavaScript ES6</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">אתמול</div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-medium text-gray-900 dark:text-white text-sm">CSS Grid</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">לפני 3 ימים</div>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Sparkles className="h-5 w-5 text-yellow-500 ml-2" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">טיפים</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <p>• שאל שאלות ספציפיות לקבלת תשובות מדויקות יותר</p>
                <p>• השתמש בכפתור הקול לשיחה טבעית יותר</p>
                <p>• העלה קבצי קוד לקבלת ביקורת מקצועית</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">מוכן להתחיל ללמוד?</h2>
          <p className="text-xl mb-6 opacity-90">
            ה-AI Mentor שלך זמין 24/7 לעזור לך בכל שלב בדרך להצלחה בפיתוח.
          </p>
          <button className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            התחל שיחה
          </button>
        </div>
      </div>
    </div>
  )
}
