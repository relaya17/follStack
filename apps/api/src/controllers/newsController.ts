import { Request, Response, NextFunction } from 'express'

/**
 * News aggregation — pulls REAL articles/posts from public, free, no-key-required
 * APIs (dev.to, Hacker News, Reddit r/programming). No mock/fabricated data:
 * if a source fails or is unreachable, it is simply skipped rather than
 * backfilled with placeholder content.
 */

export interface NewsItem {
  id: string
  title: string
  url: string
  source: 'devto' | 'hackernews' | 'reddit'
  sourceLabel: string
  author: string | null
  publishedAt: string
  tags: string[]
  points: number | null
  commentsCount: number | null
  imageUrl: string | null
}

const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes
let cache: { items: NewsItem[]; fetchedAt: number } | null = null

async function fetchDevTo(): Promise<NewsItem[]> {
  const res = await fetch('https://dev.to/api/articles?per_page=20&top=7')
  if (!res.ok) throw new Error(`dev.to responded ${res.status}`)
  const data = (await res.json()) as Array<{
    id: number
    title: string
    url: string
    published_at: string
    tag_list: string[]
    user?: { name?: string }
    cover_image?: string | null
    public_reactions_count?: number
    comments_count?: number
  }>

  return data.map((a) => ({
    id: `devto-${a.id}`,
    title: a.title,
    url: a.url,
    source: 'devto',
    sourceLabel: 'dev.to',
    author: a.user?.name ?? null,
    publishedAt: a.published_at,
    tags: a.tag_list ?? [],
    points: a.public_reactions_count ?? null,
    commentsCount: a.comments_count ?? null,
    imageUrl: a.cover_image ?? null,
  }))
}

async function fetchHackerNews(): Promise<NewsItem[]> {
  const topRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  if (!topRes.ok) throw new Error(`Hacker News responded ${topRes.status}`)
  const ids = ((await topRes.json()) as number[]).slice(0, 20)

  const items = await Promise.allSettled(
    ids.map(async (id) => {
      const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      if (!itemRes.ok) throw new Error(`HN item ${id} responded ${itemRes.status}`)
      const item = (await itemRes.json()) as {
        id: number
        title?: string
        url?: string
        by?: string
        time?: number
        score?: number
        descendants?: number
        type?: string
      }
      if (!item || item.type !== 'story' || !item.title) return null
      const result: NewsItem = {
        id: `hn-${item.id}`,
        title: item.title,
        url: item.url ?? `https://news.ycombinator.com/item?id=${item.id}`,
        source: 'hackernews',
        sourceLabel: 'Hacker News',
        author: item.by ?? null,
        publishedAt: item.time ? new Date(item.time * 1000).toISOString() : new Date().toISOString(),
        tags: [],
        points: item.score ?? null,
        commentsCount: item.descendants ?? null,
        imageUrl: null,
      }
      return result
    }),
  )

  return items
    .filter((r): r is PromiseFulfilledResult<NewsItem | null> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((v): v is NewsItem => v !== null)
}

async function fetchReddit(): Promise<NewsItem[]> {
  const res = await fetch('https://www.reddit.com/r/programming/top.json?limit=20&t=day', {
    headers: { 'User-Agent': 'follstack-news-aggregator/1.0' },
  })
  if (!res.ok) throw new Error(`Reddit responded ${res.status}`)
  const json = (await res.json()) as {
    data: {
      children: Array<{
        data: {
          id: string
          title: string
          url: string
          permalink: string
          author: string
          created_utc: number
          ups: number
          num_comments: number
          thumbnail?: string
        }
      }>
    }
  }

  return json.data.children.map(({ data: p }) => ({
    id: `reddit-${p.id}`,
    title: p.title,
    url: p.url?.startsWith('http') ? p.url : `https://reddit.com${p.permalink}`,
    source: 'reddit',
    sourceLabel: 'r/programming',
    author: p.author ?? null,
    publishedAt: new Date(p.created_utc * 1000).toISOString(),
    tags: [],
    points: p.ups ?? null,
    commentsCount: p.num_comments ?? null,
    imageUrl: p.thumbnail && p.thumbnail.startsWith('http') ? p.thumbnail : null,
  }))
}

async function getAggregatedNews(): Promise<{ items: NewsItem[]; sourceErrors: string[] }> {
  const results = await Promise.allSettled([fetchDevTo(), fetchHackerNews(), fetchReddit()])
  const sourceNames = ['devto', 'hackernews', 'reddit']
  const items: NewsItem[] = []
  const sourceErrors: string[] = []

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      items.push(...result.value)
    } else {
      sourceErrors.push(`${sourceNames[i]}: ${result.reason?.message ?? 'unknown error'}`)
    }
  })

  // De-dupe by URL, sort newest first
  const seen = new Set<string>()
  const deduped = items.filter((item) => {
    if (seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })
  deduped.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  return { items: deduped, sourceErrors }
}

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get aggregated real programming news from dev.to, Hacker News and r/programming
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *           enum: [devto, hackernews, reddit]
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *     responses:
 *       200:
 *         description: News items retrieved successfully
 */
export const getNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const now = Date.now()
    let sourceErrors: string[] = []

    if (!cache || now - cache.fetchedAt > CACHE_TTL_MS) {
      const fresh = await getAggregatedNews()
      sourceErrors = fresh.sourceErrors
      cache = { items: fresh.items, fetchedAt: now }
    }

    const { source, limit } = req.query
    let items = cache.items
    if (typeof source === 'string' && ['devto', 'hackernews', 'reddit'].includes(source)) {
      items = items.filter((i) => i.source === source)
    }
    const max = Math.min(Number(limit) || 30, 60)
    items = items.slice(0, max)

    res.status(200).json({
      success: true,
      count: items.length,
      cachedAt: new Date(cache.fetchedAt).toISOString(),
      sourceErrors: sourceErrors.length > 0 ? sourceErrors : undefined,
      data: items,
    })
  } catch (error) {
    next(error)
  }
}
