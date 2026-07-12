import { Request, Response, NextFunction } from 'express'
import {
  getArchiveTail,
  getCachedNewsFeed,
  getFeedFilePaths,
  ingestNews,
  type NewsSource,
} from '@/services/newsIngestService'

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Aggregated tech/programming news from public APIs + RSS (file-backed cache)
 *     tags: [News]
 */
export const getNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let feed = getCachedNewsFeed()
    if (!feed) {
      feed = await ingestNews({ persist: true })
    }

    const { source, limit, q } = req.query
    let items = feed.items

    if (typeof source === 'string') {
      items = items.filter((i) => i.source === source || i.sourceLabel === source)
    }

    if (typeof q === 'string' && q.trim()) {
      const needle = q.trim().toLowerCase()
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(needle) ||
          i.tags.some((t) => t.toLowerCase().includes(needle)) ||
          (i.summary || '').toLowerCase().includes(needle),
      )
    }

    const max = Math.min(Number(limit) || 40, 100)
    items = items.slice(0, max)

    res.status(200).json({
      success: true,
      count: items.length,
      updatedAt: feed.updatedAt,
      sources: feed.sources,
      sourceErrors: feed.sourceErrors.length > 0 ? feed.sourceErrors : undefined,
      files: getFeedFilePaths(),
      data: items,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/news/refresh:
 *   post:
 *     summary: Force a fresh ingest from all sources and rewrite news-feed.json
 *     tags: [News]
 */
export const refreshNews = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const feed = await ingestNews({ persist: true })
    res.status(200).json({
      success: true,
      message: 'News feed refreshed',
      updatedAt: feed.updatedAt,
      itemCount: feed.itemCount,
      sources: feed.sources,
      sourceErrors: feed.sourceErrors.length > 0 ? feed.sourceErrors : undefined,
      files: getFeedFilePaths(),
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/news/archive:
 *   get:
 *     summary: Recent entries from the append-only news-archive.jsonl file
 *     tags: [News]
 */
export const getNewsArchive = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const limit = Math.min(Number(req.query.limit) || 100, 500)
    const data = getArchiveTail(limit)
    res.status(200).json({
      success: true,
      count: data.length,
      files: getFeedFilePaths(),
      data,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @swagger
 * /api/news/sources:
 *   get:
 *     summary: List known source kinds used by the ingest pipeline
 *     tags: [News]
 */
export const getNewsSources = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const feed = getCachedNewsFeed()
    const kinds: NewsSource[] = ['devto', 'hackernews', 'reddit', 'lobsters', 'github', 'rss']
    res.status(200).json({
      success: true,
      kinds,
      activeLabels: feed?.sources ?? [],
      updatedAt: feed?.updatedAt ?? null,
      note:
        'איסוף ממקורות ציבוריים בלבד (API/RSS). לא סורקים את כל האינטרנט — זה לא חוקי/לא יציב. אפשר להוסיף RSS נוספים ב-newsIngestService.',
    })
  } catch (error) {
    next(error)
  }
}
