'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  BookOpen,
  Search,
  Layers,
  Gamepad2,
  Loader2,
  RotateCw,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Shuffle,
} from 'lucide-react'
import { Card } from '@follstack/ui'
import { apiJson } from '@/lib/api'

interface GlossaryTerm {
  id: string
  term: string
  fullForm: string
  definition: string
  category: string
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'הכל',
  'html-css': 'HTML & CSS',
  javascript: 'JavaScript',
  react: 'React',
  nodejs: 'Node.js',
  mongodb: 'MongoDB',
  typescript: 'TypeScript',
  automation: 'אוטומציה',
  git: 'Git',
  algorithms: 'אלגוריתמים',
  security: 'אבטחה',
  devtools: 'כלים ופריסה',
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

type Tab = 'reference' | 'flashcards' | 'memory'

export default function GlossaryPage() {
  const [terms, setTerms] = useState<GlossaryTerm[] | null>(null)
  const [error, setError] = useState(false)
  const [tab, setTab] = useState<Tab>('reference')
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    apiJson<{ success: boolean; data: GlossaryTerm[] }>('/api/glossary').then((res) => {
      if (res?.success) setTerms(res.data)
      else setError(true)
    })
  }, [])

  const categories = useMemo(() => {
    if (!terms) return ['all']
    return ['all', ...Array.from(new Set(terms.map((t) => t.category)))]
  }, [terms])

  const filtered = useMemo(() => {
    if (!terms) return []
    return terms.filter((t) => {
      const catOk = category === 'all' || t.category === category
      const q = search.trim().toLowerCase()
      const searchOk =
        !q || t.term.toLowerCase().includes(q) || t.fullForm.toLowerCase().includes(q) || t.definition.includes(q)
      return catOk && searchOk
    })
  }, [terms, category, search])

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="flex items-center justify-center mb-4">
          <BookOpen className="h-12 w-12 text-primary-600 ml-4" />
          <h1 className="page-title">מילון מונחים וקיצורים</h1>
        </div>
        <p className="page-subtitle">
          כל הקיצורים באנגלית שכדאי לזכור — עם הסבר, כרטיסיות היפוך, ומשחק זיכרון שעוזר למוח לקלוט.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 rtl:space-x-reverse px-6">
            {[
              { id: 'reference', label: 'רשימה והסברים', icon: BookOpen },
              { id: 'flashcards', label: 'כרטיסיות היפוך', icon: Layers },
              { id: 'memory', label: 'משחק זיכרון', icon: Gamepad2 },
            ].map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as Tab)}
                  className={`flex items-center space-x-2 rtl:space-x-reverse py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    tab === t.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {terms === null && !error && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>טוען מילון מונחים…</p>
            </div>
          )}

          {error && <p className="py-8 text-center text-gray-600 dark:text-gray-300">לא ניתן לטעון את המילון כרגע.</p>}

          {terms !== null && !error && tab === 'reference' && (
            <ReferenceView
              filtered={filtered}
              category={category}
              setCategory={setCategory}
              search={search}
              setSearch={setSearch}
              categories={categories}
            />
          )}

          {terms !== null && !error && tab === 'flashcards' && <FlashcardsView terms={terms} />}

          {terms !== null && !error && tab === 'memory' && <MemoryGameView terms={terms} />}
        </div>
      </div>
    </div>
  )
}

function ReferenceView({
  filtered,
  category,
  setCategory,
  search,
  setSearch,
  categories,
}: {
  filtered: GlossaryTerm[]
  category: string
  setCategory: (c: string) => void
  search: string
  setSearch: (s: string) => void
  categories: string[]
}) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="חיפוש מונח..."
            className="w-full rounded-lg border border-gray-300 py-2 pr-9 pl-3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_LABELS[c] ?? c}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="py-8 text-center text-gray-600 dark:text-gray-300">לא נמצאו מונחים תואמים.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((t) => (
            <Card key={t.id} className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-bold text-primary-700 dark:text-primary-400">{t.term}</h3>
                {CATEGORY_LABELS[t.category] && (
                  <span className="text-xs rounded-full bg-gray-100 px-2 py-1 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {CATEGORY_LABELS[t.category]}
                  </span>
                )}
              </div>
              <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-2" dir="ltr">
                {t.fullForm}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-200">{t.definition}</p>
              {CATEGORY_LABELS[t.category] && t.category !== 'general' && (
                <Link
                  href={`/learning/${t.category}`}
                  className="mt-2 inline-block text-xs font-semibold text-primary-600 hover:underline"
                >
                  למודול הקשור ←
                </Link>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function FlashcardsView({ terms }: { terms: GlossaryTerm[] }) {
  const [deck, setDeck] = useState<GlossaryTerm[]>(() => shuffle(terms))
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const current = deck[index]

  function next() {
    setFlipped(false)
    setIndex((i) => (i + 1) % deck.length)
  }
  function prev() {
    setFlipped(false)
    setIndex((i) => (i - 1 + deck.length) % deck.length)
  }
  function reshuffle() {
    setDeck(shuffle(terms))
    setIndex(0)
    setFlipped(false)
  }

  if (!current) return null

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        כרטיס {index + 1} מתוך {deck.length}
      </p>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="flex h-56 w-full max-w-md flex-col items-center justify-center rounded-2xl border-2 border-primary-200 bg-primary-50 p-6 text-center shadow-sm transition hover:shadow-md dark:border-primary-900 dark:bg-primary-950/40"
      >
        {!flipped ? (
          <span className="text-4xl font-extrabold text-primary-700 dark:text-primary-300" dir="ltr">
            {current.term}
          </span>
        ) : (
          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100" dir="ltr">
              {current.fullForm}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{current.definition}</p>
          </div>
        )}
        <span className="mt-4 flex items-center gap-1 text-xs text-gray-400">
          <RotateCw className="h-3 w-3" /> לחץ להיפוך
        </span>
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <ChevronRight className="h-4 w-4" /> קודם
        </button>
        <button
          onClick={reshuffle}
          className="flex items-center gap-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          <Shuffle className="h-4 w-4" /> ערבב
        </button>
        <button
          onClick={next}
          className="flex items-center gap-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          הבא <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

type MemoryCard = {
  key: string
  pairId: string
  label: string
  kind: 'term' | 'full'
}

const DECK_SIZES = [6, 8, 12]

function MemoryGameView({ terms }: { terms: GlossaryTerm[] }) {
  const [pairCount, setPairCount] = useState(8)
  const [cards, setCards] = useState<MemoryCard[]>([])
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([])
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set())
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)

  function newGame(size: number) {
    const selected = shuffle(terms).slice(0, Math.min(size, terms.length))
    const deck: MemoryCard[] = shuffle(
      selected.flatMap((t) => [
        { key: `${t.id}-term`, pairId: t.id, label: t.term, kind: 'term' as const },
        { key: `${t.id}-full`, pairId: t.id, label: t.fullForm, kind: 'full' as const },
      ]),
    )
    setCards(deck)
    setFlippedIndexes([])
    setMatchedIds(new Set())
    setMoves(0)
    setLocked(false)
  }

  useEffect(() => {
    if (terms.length > 0) newGame(pairCount)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [terms])

  function handleFlip(index: number) {
    if (locked) return
    const card = cards[index]
    if (matchedIds.has(card.pairId) || flippedIndexes.includes(index)) return
    if (flippedIndexes.length === 2) return

    const nextFlipped = [...flippedIndexes, index]
    setFlippedIndexes(nextFlipped)

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nextFlipped
      if (cards[a].pairId === cards[b].pairId) {
        setMatchedIds((prev) => new Set(prev).add(cards[a].pairId))
        setFlippedIndexes([])
      } else {
        setLocked(true)
        setTimeout(() => {
          setFlippedIndexes([])
          setLocked(false)
        }, 900)
      }
    }
  }

  const won = cards.length > 0 && matchedIds.size === cards.length / 2

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="text-sm text-gray-500 dark:text-gray-400">גודל משחק:</span>
        {DECK_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => {
              setPairCount(size)
              newGame(size)
            }}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              pairCount === size
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {size} זוגות
          </button>
        ))}
        <button
          onClick={() => newGame(pairCount)}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <Shuffle className="h-4 w-4" /> משחק חדש
        </button>
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">מהלכים: {moves}</span>
      </div>

      {won && (
        <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-green-800 dark:bg-green-950/40 dark:text-green-200">
          <Trophy className="h-5 w-5" />
          <span className="font-semibold">כל הכבוד! סיימת ב-{moves} מהלכים 🎉</span>
        </div>
      )}

      <div
        className="grid gap-3 w-full max-w-3xl"
        style={{ gridTemplateColumns: `repeat(${pairCount <= 6 ? 4 : pairCount <= 8 ? 4 : 6}, minmax(0, 1fr))` }}
      >
        {cards.map((card, i) => {
          const isMatched = matchedIds.has(card.pairId)
          const isFlipped = isMatched || flippedIndexes.includes(i)
          return (
            <button
              key={card.key}
              onClick={() => handleFlip(i)}
              disabled={isMatched}
              className={`flex h-24 items-center justify-center rounded-xl p-2 text-center text-xs font-semibold transition-all duration-200 ${
                isMatched
                  ? 'border-2 border-green-400 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-300'
                  : isFlipped
                    ? 'border-2 border-primary-400 bg-primary-50 text-primary-800 dark:bg-primary-950/40 dark:text-primary-200'
                    : 'border-2 border-slate-300 bg-slate-100 text-transparent hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800'
              }`}
              dir="ltr"
            >
              {isFlipped ? card.label : '?'}
            </button>
          )
        })}
      </div>
    </div>
  )
}
