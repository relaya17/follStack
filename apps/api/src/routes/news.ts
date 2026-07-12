import { Router } from 'express'
import { getNews, getNewsArchive, getNewsSources, refreshNews } from '@/controllers/newsController'

const router = Router()

router.get('/', getNews)
router.get('/sources', getNewsSources)
router.get('/archive', getNewsArchive)
router.post('/refresh', refreshNews)

export default router
