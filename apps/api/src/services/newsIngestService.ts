import fs from 'fs'
import path from 'path'
import { logger } from '@/utils/logger'

export type NewsSource =
  | 'devto'
  | 'hackernews'
  | 'reddit'
  | 'lobsters'
  | 'github'
  | 'rss'

export interface NewsItem {
  id: string
  title: string
  url: string
  source: NewsSource
  sourceLabel: string
  author: string | null
  publishedAt: string
  tags: string[]
  points: number | null
  commentsCount: number | null
  imageUrl: string | null
  summary?: string | null
}

export interface NewsFeedFile {
  updatedAt: string
  itemCount: number
  sources: string[]
  sourceErrors: string[]
  items: NewsItem[]
}

const DATA_DIR = path.join(process.cwd(), 'data')
const FEED_FILE = path.join(DATA_DIR, 'news-feed.json')
const ARCHIVE_FILE = path.join(DATA_DIR, 'news-archive.jsonl')
const MAX_FEED_ITEMS = 200
const MAX_ARCHIVE_LINES_KEEP = 5000

const RSS_FEEDS: Array<{ id: string; label: string; url: string; tags: string[] }> = [
  {
    id: 'smashing',
    label: 'Smashing Magazine',
    url: 'https://www.smashingmagazine.com/feed/',
    tags: ['web', 'frontend', 'ux'],
  },
  {
    id: 'css-tricks',
    label: 'CSS-Tricks',
    url: 'https://css-tricks.com/feed/',
    tags: ['css', 'frontend'],
  },
  {
    id: 'github-blog',
    label: 'GitHub Blog',
    url: 'https://github.blog/feed/',
    tags: ['github', 'devops'],
  },
  {
    id: 'vercel-blog',
    label: 'Vercel Blog',
    url: 'https://vercel.com/atom',
    tags: ['vercel', 'nextjs'],
  },
  {
    id: 'nodejs-blog',
    label: 'Node.js Blog',
    url: 'https://nodejs.org/en/feed/blog.xml',
    tags: ['nodejs', 'backend'],
  },
  {
    id: 'techcrunch',
    label: 'TechCrunch',
    url: 'https://techcrunch.com/feed/',
    tags: ['startups', 'tech'],
  },
]

let memoryCache: NewsFeedFile | null = null
let ingestTimer: NodeJS.Timeout | null = null
let ingestRunning = false

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
}

function stripHtml(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function firstTag(xml: string, tag: string): string | null {
  const cdata = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i')
  const plain = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const m = xml.match(cdata) || xml.match(plain)
  return m?.[1] ? stripHtml(m[1]) : null
}

function parseRss(xml: string, feedId: string, label: string, tags: string[]): NewsItem[] {
  const chunks = xml.match(/<item[\s>][\s\S]*?<\/item>|<entry[\s>][\s\S]*?<\/entry>/gi) || []
  return chunks.slice(0, 25).flatMap((chunk, index) => {
    const title = firstTag(chunk, 'title')
    const link =
      firstTag(chunk, 'link') ||
      chunk.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] ||
      null
    if (!title || !link) return []
    const published =
      firstTag(chunk, 'pubDate') ||
      firstTag(chunk, 'published') ||
      firstTag(chunk, 'updated') ||
      new Date().toISOString()
    const author = firstTag(chunk, 'dc:creator') || firstTag(chunk, 'author') || firstTag(chunk, 'name')
    const summary = firstTag(chunk, 'description') || firstTag(chunk, 'summary') || firstTag(chunk, 'content')
    const publishedAt = !Number.isNaN(Date.parse(published))
      ? new Date(published).toISOString()
      : new Date().toISOString()

    return [
      {
        id: `rss-${feedId}-${Buffer.from(link).toString('base64url').slice(0, 24)}-${index}`,
        title,
        url: link,
        source: 'rss' as const,
        sourceLabel: label,
        author,
        publishedAt,
        tags,
        points: null,
        commentsCount: null,
        imageUrl: null,
        summary: summary ? summary.slice(0, 280) : null,
      },
    ]
  })
}

async function fetchDevTo(): Promise<NewsItem[]> {
  const res = await fetch('https://dev.to/api/articles?per_page=25&top=7')
  if (!res.ok) throw new Error(`dev.to ${res.status}`)
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
    description?: string
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
    summary: a.description ?? null,
  }))
}

async function fetchHackerNews(): Promise<NewsItem[]> {
  const topRes = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  if (!topRes.ok) throw new Error(`Hacker News ${topRes.status}`)
  const ids = ((await topRes.json()) as number[]).slice(0, 25)
  const items = await Promise.allSettled(
    ids.map(async (id): Promise<NewsItem | null> => {
      const itemRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      if (!itemRes.ok) throw new Error(`HN item ${id}`)
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
      if (!item?.title || item.type !== 'story') return null
      return {
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
        summary: null,
      }
    }),
  )
  return items
    .filter((r): r is PromiseFulfilledResult<NewsItem | null> => r.status === 'fulfilled')
    .map((r) => r.value)
    .filter((v): v is NewsItem => v !== null)
}

async function fetchReddit(subreddit: string, label: string): Promise<NewsItem[]> {
  const res = await fetch(`https://www.reddit.com/r/${subreddit}/top.json?limit=20&t=day`, {
    headers: { 'User-Agent': 'follstack-news-ingest/1.0' },
  })
  if (!res.ok) throw new Error(`Reddit r/${subreddit} ${res.status}`)
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
          selftext?: string
        }
      }>
    }
  }
  return json.data.children.map(({ data: p }) => ({
    id: `reddit-${subreddit}-${p.id}`,
    title: p.title,
    url: p.url?.startsWith('http') ? p.url : `https://reddit.com${p.permalink}`,
    source: 'reddit' as const,
    sourceLabel: label,
    author: p.author ?? null,
    publishedAt: new Date(p.created_utc * 1000).toISOString(),
    tags: [subreddit],
    points: p.ups ?? null,
    commentsCount: p.num_comments ?? null,
    imageUrl: p.thumbnail?.startsWith('http') ? p.thumbnail : null,
    summary: p.selftext ? p.selftext.slice(0, 280) : null,
  }))
}

async function fetchLobsters(): Promise<NewsItem[]> {
  const res = await fetch('https://lobste.rs/hottest.json', {
    headers: { 'User-Agent': 'follstack-news-ingest/1.0', Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`Lobsters ${res.status}`)
  const data = (await res.json()) as Array<{
    short_id: string
    title: string
    url: string
    created_at: string
    score: number
    comment_count: number
    tags: string[]
    submitter_user?: string
    description_plain?: string
  }>
  return data.slice(0, 25).map((p) => ({
    id: `lobsters-${p.short_id}`,
    title: p.title,
    url: p.url || `https://lobste.rs/s/${p.short_id}`,
    source: 'lobsters' as const,
    sourceLabel: 'Lobsters',
    author: p.submitter_user ?? null,
    publishedAt: p.created_at,
    tags: p.tags ?? [],
    points: p.score ?? null,
    commentsCount: p.comment_count ?? null,
    imageUrl: null,
    summary: p.description_plain ? p.description_plain.slice(0, 280) : null,
  }))
}

async function fetchGitHubTrending(): Promise<NewsItem[]> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  const q = encodeURIComponent(`created:>${since}`)
  const res = await fetch(
    `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=15`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'follstack-news-ingest',
      },
    },
  )
  if (!res.ok) throw new Error(`GitHub search ${res.status}`)
  const json = (await res.json()) as {
    items: Array<{
      id: number
      full_name: string
      html_url: string
      description: string | null
      stargazers_count: number
      language: string | null
      created_at: string
      owner?: { login?: string }
    }>
  }
  return (json.items || []).map((r) => ({
    id: `github-${r.id}`,
    title: `${r.full_name}${r.language ? ` (${r.language})` : ''}`,
    url: r.html_url,
    source: 'github' as const,
    sourceLabel: 'GitHub Trending',
    author: r.owner?.login ?? null,
    publishedAt: r.created_at,
    tags: r.language ? [r.language.toLowerCase(), 'opensource'] : ['opensource'],
    points: r.stargazers_count,
    commentsCount: null,
    imageUrl: null,
    summary: r.description,
  }))
}

async function fetchRssFeed(feed: (typeof RSS_FEEDS)[number]): Promise<NewsItem[]> {
  const res = await fetch(feed.url, {
    headers: { 'User-Agent': 'follstack-news-ingest/1.0', Accept: 'application/rss+xml, application/xml, text/xml' },
  })
  if (!res.ok) throw new Error(`${feed.label} RSS ${res.status}`)
  const xml = await res.text()
  return parseRss(xml, feed.id, feed.label, feed.tags)
}

function mergeItems(existing: NewsItem[], incoming: NewsItem[]): NewsItem[] {
  const byUrl = new Map<string, NewsItem>()
  for (const item of [...incoming, ...existing]) {
    if (!byUrl.has(item.url)) byUrl.set(item.url, item)
  }
  return Array.from(byUrl.values())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_FEED_ITEMS)
}

function readFeedFromDisk(): NewsFeedFile | null {
  try {
    if (!fs.existsSync(FEED_FILE)) return null
    return JSON.parse(fs.readFileSync(FEED_FILE, 'utf8')) as NewsFeedFile
  } catch {
    return null
  }
}

function writeFeedToDisk(feed: NewsFeedFile) {
  ensureDataDir()
  fs.writeFileSync(FEED_FILE, JSON.stringify(feed, null, 2), 'utf8')
}

function appendArchive(items: NewsItem[], fetchedAt: string) {
  ensureDataDir()
  const lines = items.map((item) =>
    JSON.stringify({ ingestedAt: fetchedAt, ...item }),
  )
  fs.appendFileSync(ARCHIVE_FILE, `${lines.join('\n')}\n`, 'utf8')

  // Keep archive from growing forever on disk
  try {
    const raw = fs.readFileSync(ARCHIVE_FILE, 'utf8').trimEnd()
    if (!raw) return
    const all = raw.split('\n')
    if (all.length > MAX_ARCHIVE_LINES_KEEP) {
      const trimmed = all.slice(-MAX_ARCHIVE_LINES_KEEP).join('\n') + '\n'
      fs.writeFileSync(ARCHIVE_FILE, trimmed, 'utf8')
    }
  } catch {
    // ignore trim errors
  }
}

export async function ingestNews(options?: { persist?: boolean }): Promise<NewsFeedFile> {
  const persist = options?.persist !== false
  const jobs: Array<{ name: string; run: () => Promise<NewsItem[]> }> = [
    { name: 'devto', run: fetchDevTo },
    { name: 'hackernews', run: fetchHackerNews },
    { name: 'reddit-programming', run: () => fetchReddit('programming', 'r/programming') },
    { name: 'reddit-webdev', run: () => fetchReddit('webdev', 'r/webdev') },
    { name: 'reddit-javascript', run: () => fetchReddit('javascript', 'r/javascript') },
    { name: 'lobsters', run: fetchLobsters },
    { name: 'github', run: fetchGitHubTrending },
    ...RSS_FEEDS.map((feed) => ({
      name: `rss:${feed.id}`,
      run: () => fetchRssFeed(feed),
    })),
  ]

  const results = await Promise.allSettled(jobs.map((j) => j.run()))
  const incoming: NewsItem[] = []
  const sourceErrors: string[] = []

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      incoming.push(...result.value)
    } else {
      sourceErrors.push(`${jobs[i].name}: ${result.reason?.message ?? 'unknown error'}`)
    }
  })

  const previous = memoryCache?.items ?? readFeedFromDisk()?.items ?? []
  const merged = mergeItems(previous, incoming)
  const updatedAt = new Date().toISOString()
  const feed: NewsFeedFile = {
    updatedAt,
    itemCount: merged.length,
    sources: [...new Set(merged.map((i) => i.sourceLabel))],
    sourceErrors,
    items: merged,
  }

  memoryCache = feed

  if (persist) {
    try {
      writeFeedToDisk(feed)
      // Archive only newly seen URLs from this run
      const prevUrls = new Set(previous.map((p) => p.url))
      const fresh = incoming.filter((i) => !prevUrls.has(i.url))
      if (fresh.length > 0) appendArchive(fresh, updatedAt)
      logger.info(`News ingest: ${merged.length} items in feed (${fresh.length} new), ${sourceErrors.length} source error(s)`)
    } catch (err) {
      logger.warn(`News ingest: could not write files (${(err as Error).message}) — keeping in-memory cache`)
    }
  }

  return feed
}

export function getCachedNewsFeed(): NewsFeedFile | null {
  if (memoryCache) return memoryCache
  const disk = readFeedFromDisk()
  if (disk) {
    memoryCache = disk
    return disk
  }
  return null
}

export function getArchiveTail(limit = 100): unknown[] {
  try {
    if (!fs.existsSync(ARCHIVE_FILE)) return []
    const lines = fs.readFileSync(ARCHIVE_FILE, 'utf8').trimEnd().split('\n').filter(Boolean)
    return lines
      .slice(-Math.min(Math.max(limit, 1), 500))
      .reverse()
      .map((line) => {
        try {
          return JSON.parse(line)
        } catch {
          return null
        }
      })
      .filter(Boolean)
  } catch {
    return []
  }
}

export function getFeedFilePaths() {
  return { feedFile: FEED_FILE, archiveFile: ARCHIVE_FILE, dataDir: DATA_DIR }
}

export function startNewsIngestScheduler() {
  if (process.env.NEWS_INGEST_ENABLED === 'false') {
    logger.info('News ingest scheduler disabled (NEWS_INGEST_ENABLED=false)')
    return
  }

  const intervalMs = Math.max(
    Number(process.env.NEWS_INGEST_INTERVAL_MS) || 30 * 60 * 1000,
    5 * 60 * 1000,
  )

  const tick = async () => {
    if (ingestRunning) return
    ingestRunning = true
    try {
      await ingestNews({ persist: true })
    } catch (err) {
      logger.error('News ingest tick failed', err)
    } finally {
      ingestRunning = false
    }
  }

  // Initial pull shortly after boot (don't block listen)
  setTimeout(() => {
    void tick()
  }, 8_000)

  ingestTimer = setInterval(() => {
    void tick()
  }, intervalMs)

  logger.info(`News ingest scheduler started (every ${Math.round(intervalMs / 60000)} min) → ${FEED_FILE}`)
}

export function stopNewsIngestScheduler() {
  if (ingestTimer) {
    clearInterval(ingestTimer)
    ingestTimer = null
  }
}
