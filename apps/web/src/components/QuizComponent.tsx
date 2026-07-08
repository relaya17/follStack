'use client'

import { useState } from 'react'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizComponentProps {
  quizId: string
  onComplete: (score: number, totalQuestions: number) => void
  onClose: () => void
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'מהו התג הנכון ליצירת כותרת ראשית ב-HTML?',
    options: ['<h1>', '<header>', '<title>', '<head>'],
    correctAnswer: 0,
    explanation:
      '<h1> הוא התג הנכון ליצירת כותרת ראשית. <header> הוא תג לכותרת של דף, <title> לכותרת של הדף בדפדפן, ו-<head> למידע מטא.',
  },
  {
    id: '2',
    question: 'איזה תג משמש ליצירת קישור ב-HTML?',
    options: ['<link>', '<a>', '<href>', '<url>'],
    correctAnswer: 1,
    explanation:
      '<a> הוא התג הנכון ליצירת קישור. <link> משמש לקישור למשאבים חיצוניים כמו CSS, <href> הוא תכונה של תג <a>, ו-<url> אינו תג HTML.',
  },
  {
    id: '3',
    question: 'HTML הוא שפת תכנות',
    options: ['נכון', 'לא נכון'],
    correctAnswer: 1,
    explanation:
      'HTML אינו שפת תכנות אלא שפת סימון (Markup Language). הוא משמש לתיאור מבנה התוכן של דף אינטרנט.',
  },
]

export function QuizComponent({ quizId, onComplete, onClose }: QuizComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = sampleQuestions[currentIndex]
  const isLast = currentIndex === sampleQuestions.length - 1

  const handleNext = () => {
    if (selected === null) return
    const nextScore = selected === question.correctAnswer ? score + 1 : score

    if (isLast) {
      onComplete(nextScore, sampleQuestions.length)
      return
    }

    setScore(nextScore)
    setCurrentIndex((i) => i + 1)
    setSelected(null)
    setShowExplanation(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">חידון {quizId}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            סגור
          </button>
        </div>

        <p className="mb-2 text-sm text-slate-500">
          שאלה {currentIndex + 1} מתוך {sampleQuestions.length}
        </p>
        <h3 className="mb-4 text-xl font-medium">{question.question}</h3>

        <div className="mb-4 space-y-2">
          {question.options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setSelected(index)
                setShowExplanation(true)
              }}
              className={`block w-full rounded-lg border px-4 py-3 text-right transition ${
                selected === index
                  ? index === question.correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-red-500 bg-red-50 dark:bg-red-950'
                  : 'border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <p className="mb-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {question.explanation}
          </p>
        )}

        <button
          type="button"
          disabled={selected === null}
          onClick={handleNext}
          className="w-full rounded-lg bg-primary-600 py-3 font-medium text-white disabled:opacity-50"
        >
          {isLast ? 'סיים' : 'הבא'}
        </button>
      </div>
    </div>
  )
}
