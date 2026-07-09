import { Router, Request, Response } from 'express'

const router = Router()

const demoUser = {
  id: 'u1',
  name: 'נועה כהן',
  avatar: '',
  level: 12,
  xp: 2450,
}

router.get('/feed', (_req: Request, res: Response) => {
  res.json({
    posts: [
      {
        id: 'p1',
        user: demoUser,
        content: 'סיימתי היום מודול React Hooks — ממליצה לתרגל useEffect עם cleanup!',
        likes: 18,
        comments: 4,
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
      {
        id: 'p2',
        user: { ...demoUser, id: 'u2', name: 'יואב לוי' },
        content: 'מי רוצה להצטרף לקבוצת תרגול Node.js בערב?',
        likes: 11,
        comments: 7,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ],
    groups: [
      {
        id: 'g1',
        name: 'React Intermediate',
        members: 128,
        topic: 'React',
        description: 'תרגול שבועי של קומפוננטות ו-Hooks',
      },
      {
        id: 'g2',
        name: 'Full-Stack Builders',
        members: 86,
        topic: 'Projects',
        description: 'בניית פרויקטים מקצה לקצה',
      },
    ],
    challenges: [
      {
        id: 'c1',
        title: '7 ימי JavaScript',
        participants: 240,
        endsInDays: 4,
        reward: 'תג Streak',
      },
    ],
    leaderboard: [
      { id: 'u3', name: 'דניאל', xp: 5200, rank: 1 },
      { id: 'u1', name: 'נועה כהן', xp: 2450, rank: 2 },
      { id: 'u2', name: 'יואב לוי', xp: 2100, rank: 3 },
    ],
    friends: [
      { id: 'u2', name: 'יואב לוי', status: 'online' },
      { id: 'u4', name: 'מאיה', status: 'offline' },
    ],
  })
})

router.post('/posts', (req: Request, res: Response) => {
  const content = String(req.body?.content || '').trim()
  res.status(201).json({
    id: `p-${Date.now()}`,
    user: demoUser,
    content: content || 'פוסט חדש',
    likes: 0,
    comments: 0,
    createdAt: new Date().toISOString(),
  })
})

router.post('/posts/:postId/like', (req: Request, res: Response) => {
  res.json({ success: true, postId: req.params.postId, liked: true })
})

router.post('/groups/:groupId/join', (req: Request, res: Response) => {
  res.json({ success: true, groupId: req.params.groupId, joined: true })
})

router.post('/challenges/:challengeId/join', (req: Request, res: Response) => {
  res.json({ success: true, challengeId: req.params.challengeId, joined: true })
})

router.post('/groups', (req: Request, res: Response) => {
  res.status(201).json({
    id: `g-${Date.now()}`,
    name: req.body?.name || 'קבוצה חדשה',
    members: 1,
    topic: req.body?.topic || 'General',
    description: req.body?.description || '',
  })
})

export default router
