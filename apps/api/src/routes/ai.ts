import { Router } from 'express'
import { askQuestion } from '@/controllers/aiController'
import { optionalAuth } from '@/middleware/auth'

const router = Router()

// The only real AI Mentor endpoint. Previously this file also exposed /learning-analysis,
// /adaptive-content, /chat/history, /code-review, /interview-questions and /recommendations —
// all of them returned hardcoded/static data regardless of input (their own code comments
// admitted as much: "For now, we'll return a mock response"), and none were called from the
// frontend. Removed rather than left as unused fabricated endpoints.
router.post('/ask', optionalAuth, askQuestion)

export default router
