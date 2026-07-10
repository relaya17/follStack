import { Router, Request, Response } from 'express'

const router = Router()

const demoUser = {
  id: 'u1',
  name: 'נועה כהן',
  avatar: '',
  level: 12,
  xp: 2450,
  streak: 5,
  isOnline: true,
  achievements: 8,
  rank: 'Gold',
}

router.get('/feed', (_req: Request, res: Response) => {
  res.json({
    posts: [
      {
        id: 'p1',
        author: demoUser,
        content: 'סיימתי היום מודול React Hooks — ממליצה לתרגל useEffect עם cleanup!',
        likes: 18,
        commentsCount: 4,
        shares: 2,
        isLiked: false,
        tags: ['react', 'hooks'],
        createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      },
      {
        id: 'p2',
        author: { ...demoUser, id: 'u2', name: 'יואב לוי', level: 10, rank: 'Silver' },
        content: 'מי רוצה להצטרף לקבוצת תרגול Node.js בערב?',
        likes: 11,
        commentsCount: 7,
        shares: 1,
        isLiked: true,
        tags: ['nodejs'],
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ],
    groups: [
      {
        id: 'g1',
        name: 'React Intermediate',
        description: 'תרגול שבועי של קומפוננטות ו-Hooks',
        members: [
          demoUser,
          { ...demoUser, id: 'u2', name: 'יואב לוי' },
        ],
        maxMembers: 50,
        isPublic: true,
        tags: ['React', 'Hooks'],
        createdBy: 'u1',
        createdAt: new Date().toISOString(),
        activity: {
          posts: 24,
          discussions: 12,
          lastActivity: new Date().toISOString(),
        },
      },
      {
        id: 'g2',
        name: 'Full-Stack Builders',
        description: 'בניית פרויקטים מקצה לקצה',
        members: [demoUser],
        maxMembers: 40,
        isPublic: true,
        tags: ['Projects', 'Full-Stack'],
        createdBy: 'u1',
        createdAt: new Date().toISOString(),
        activity: {
          posts: 18,
          discussions: 9,
          lastActivity: new Date().toISOString(),
        },
      },
    ],
    challenges: [
      {
        id: 'c1',
        title: '7 ימי JavaScript',
        description: 'אתגר יומי קצר ב-JS למשך שבוע',
        type: 'streak',
        difficulty: 'medium',
        reward: { xp: 500, gems: 20, badge: 'Streak' },
        participants: 240,
        endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString(),
        isActive: true,
        leaderboard: [
          { user: { ...demoUser, id: 'u3', name: 'דניאל' }, score: 920, rank: 1 },
          { user: demoUser, score: 810, rank: 2 },
        ],
      },
    ],
    leaderboard: [
      { ...demoUser, id: 'u3', name: 'דניאל', xp: 5200, rank: 'Diamond', level: 20 },
      demoUser,
      { ...demoUser, id: 'u2', name: 'יואב לוי', xp: 2100, rank: 'Silver', level: 10 },
    ],
    friends: [
      { ...demoUser, id: 'u2', name: 'יואב לוי', isOnline: true },
      { ...demoUser, id: 'u4', name: 'מאיה', isOnline: false },
    ],
  })
})

router.post('/posts', (req: Request, res: Response) => {
  const content = String(req.body?.content || '').trim()
  res.status(201).json({
    id: `p-${Date.now()}`,
    author: demoUser,
    content: content || 'פוסט חדש',
    likes: 0,
    commentsCount: 0,
    shares: 0,
    isLiked: false,
    tags: [],
    createdAt: new Date().toISOString(),
  })
})

router.post('/posts/:postId/like', (req: Request, res: Response) => {
  res.json({ isLiked: true, likes: 1, postId: req.params.postId })
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
    description: req.body?.description || '',
    members: [demoUser],
    maxMembers: 30,
    isPublic: true,
    tags: Array.isArray(req.body?.tags) ? req.body.tags : ['General'],
    createdBy: req.body?.createdBy || 'demo-user',
    createdAt: new Date().toISOString(),
    activity: { posts: 0, discussions: 0, lastActivity: new Date().toISOString() },
  })
})

export default router
