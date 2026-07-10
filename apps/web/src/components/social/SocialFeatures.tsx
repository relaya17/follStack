'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  Users, 
  MessageCircle, 
  Trophy, 
  Crown, 
  Flame, 
  Star,
  Heart,
  Share2,
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Gift,
  Award,
  Target,
  TrendingUp,
  Globe,
  Lock,
  Unlock,
  Plus,
  Search,
  Filter,
  Bell,
  Settings
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { apiFetchWithRetry } from '@/lib/api'

interface User {
  id: string
  name: string
  avatar: string
  level: number
  xp: number
  streak: number
  isOnline: boolean
  lastSeen?: Date
  achievements: number
  rank: string
}

interface StudyGroup {
  id: string
  name: string
  description: string
  members: User[]
  maxMembers: number
  isPublic: boolean
  tags: string[]
  createdBy: string
  createdAt: Date
  activity: {
    posts: number
    discussions: number
    lastActivity: Date
  }
}

interface Challenge {
  id: string
  title: string
  description: string
  type: 'coding' | 'quiz' | 'project' | 'streak'
  difficulty: 'easy' | 'medium' | 'hard'
  reward: {
    xp: number
    gems: number
    badge?: string
  }
  participants: number
  endDate: string | Date
  isActive: boolean
  leaderboard: Array<{
    user: User
    score: number
    rank: number
  }>
}

interface Post {
  id: string
  author: User
  content: string
  images?: string[]
  likes: number
  commentsCount: number
  shares: number
  createdAt: string | Date
  tags: string[]
  isLiked: boolean
  comments?: Array<{
    id: string
    author: User
    content: string
    createdAt: string | Date
    likes: number
  }>
}

interface SocialFeaturesProps {
  userId?: string
  onJoinGroup?: (groupId: string) => void
  onCreateGroup?: (groupData: Partial<StudyGroup>) => void
  onJoinChallenge?: (challengeId: string) => void
}

export function SocialFeatures({
  userId = 'demo-user',
  onJoinGroup,
  onCreateGroup,
  onJoinChallenge,
}: SocialFeaturesProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'groups' | 'challenges' | 'leaderboard'>('feed')
  const [groups, setGroups] = useState<StudyGroup[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [leaderboard, setLeaderboard] = useState<User[]>([])
  const [friends, setFriends] = useState<User[]>([])
  
  const [isJoiningChallenge, setIsJoiningChallenge] = useState<string | null>(null)
  const [newPost, setNewPost] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [createGroupNotice, setCreateGroupNotice] = useState(false)

  // Load social data
  const loadSocialData = useCallback(async () => {
    try {
      const response = await apiFetchWithRetry('/api/social/feed')
      
      if (!response || !response.ok) return
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) return
      const data = await response.json()

      const normalizeUser = (u: Partial<User> & { name?: string; id?: string } | undefined): User => ({
        id: u?.id || 'unknown',
        name: u?.name || 'משתמש',
        avatar: u?.avatar || '',
        level: u?.level ?? 1,
        xp: u?.xp ?? 0,
        streak: u?.streak ?? 0,
        isOnline: u?.isOnline ?? false,
        achievements: u?.achievements ?? 0,
        rank: u?.rank || 'Bronze',
      })

      const normalizePost = (p: Record<string, unknown>): Post => {
        const authorRaw = (p.author || p.user) as Partial<User> | undefined
        return {
          id: String(p.id || crypto.randomUUID()),
          author: normalizeUser(authorRaw),
          content: String(p.content || ''),
          likes: Number(p.likes || 0),
          commentsCount: Number(p.commentsCount ?? p.comments ?? 0),
          shares: Number(p.shares || 0),
          createdAt: (p.createdAt as string | Date) || new Date().toISOString(),
          tags: Array.isArray(p.tags) ? (p.tags as string[]) : [],
          isLiked: Boolean(p.isLiked),
        }
      }

      setPosts(Array.isArray(data.posts) ? data.posts.map(normalizePost) : [])
      setGroups(data.groups || [])
      setChallenges(data.challenges || [])
      setLeaderboard(
        Array.isArray(data.leaderboard)
          ? data.leaderboard.map((u: Partial<User>) => normalizeUser(u))
          : [],
      )
      setFriends(
        Array.isArray(data.friends)
          ? data.friends.map((u: Partial<User>) => normalizeUser(u))
          : [],
      )
    } catch (error) {
      console.error('Error loading social data:', error)
    }
  }, [])

  // Create new post
  const createPost = useCallback(async () => {
    if (!newPost.trim()) return

    try {
      const response = await apiFetchWithRetry('/api/social/posts', {
        method: 'POST',
        body: JSON.stringify({
          content: newPost,
          userId
        })
      })

      if (!response || !response.ok) return
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) return
      const post = await response.json()
      setPosts(prev => [post, ...prev])
      setNewPost('')
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }, [newPost, userId])

  // Like/Unlike post
  const toggleLike = useCallback(async (postId: string) => {
    try {
      const response = await apiFetchWithRetry(`/api/social/posts/${postId}/like`, {
        method: 'POST',
      })

      if (!response || !response.ok) return
      const { isLiked, likes } = await response.json()
      
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, isLiked, likes }
          : post
      ))
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }, [])

  // Join study group
  const joinGroup = useCallback(async (groupId: string) => {
    try {
      const response = await apiFetchWithRetry(`/api/social/groups/${groupId}/join`, {
        method: 'POST',
      })

      if (response?.ok) {
        loadSocialData() // Refresh data
        onJoinGroup?.(groupId)
      }
    } catch (error) {
      console.error('Error joining group:', error)
    }
  }, [loadSocialData, onJoinGroup])

  // Join challenge
  const joinChallenge = useCallback(async (challengeId: string) => {
    setIsJoiningChallenge(challengeId)
    
    try {
      const response = await apiFetchWithRetry(`/api/social/challenges/${challengeId}/join`, {
        method: 'POST',
      })

      if (response?.ok) {
        loadSocialData() // Refresh data
        onJoinChallenge?.(challengeId)
      }
    } catch (error) {
      console.error('Error joining challenge:', error)
    } finally {
      setIsJoiningChallenge(null)
    }
  }, [loadSocialData, onJoinChallenge])

  // Create study group
  const createGroup = useCallback(async (groupData: Partial<StudyGroup>) => {
    try {
      const response = await apiFetchWithRetry('/api/social/groups', {
        method: 'POST',
        body: JSON.stringify({
          ...groupData,
          createdBy: userId
        })
      })

      if (response?.ok) {
        loadSocialData() // Refresh data
        onCreateGroup?.(groupData)
        setCreateGroupNotice(false)
      }
    } catch (error) {
      console.error('Error creating group:', error)
    }
  }, [userId, loadSocialData, onCreateGroup])

  useEffect(() => {
    loadSocialData()
  }, [loadSocialData])

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (group.tags ?? []).some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-white p-4 shadow-lg sm:p-6 dark:bg-gray-800">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-white">
            קהילת למידה
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-primary-500 dark:bg-blue-900/40 dark:text-blue-200"
              aria-label="התראות"
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-primary-500 dark:bg-gray-700 dark:text-gray-200"
              aria-label="הגדרות"
            >
              <Settings className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className="flex gap-1 overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-700"
          role="tablist"
          aria-label="אזורי קהילה"
        >
          {[
            { id: 'feed' as const, label: 'פיד', icon: MessageCircle },
            { id: 'groups' as const, label: 'קבוצות', icon: Users },
            { id: 'challenges' as const, label: 'אתגרים', icon: Trophy },
            { id: 'leaderboard' as const, label: 'לוח מובילים', icon: Crown },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2 transition-colors sm:px-4 ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-600'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
              aria-label={tab.label}
            >
              <tab.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden text-sm font-medium sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
        <div className="relative">
          <Search className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <label htmlFor="social-search" className="sr-only">
            חיפוש קבוצות, אתגרים או משתמשים
          </label>
          <input
            id="social-search"
            type="search"
            placeholder="חיפוש קבוצות, אתגרים או משתמשים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 py-2 pr-10 pl-4 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'feed' && (
          <motion.div
            key="feed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Create Post */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {userId.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <label htmlFor="new-post" className="sr-only">
                    כתיבת פוסט חדש
                  </label>
                  <textarea
                    id="new-post"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="שתף את החוויה שלך מהלמידה..."
                    className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    rows={3}
                  />
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="p-2 text-gray-400 transition-colors hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-primary-500"
                        aria-label="הוסף תמונה"
                      >
                        <Camera className="h-5 w-5" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="p-2 text-gray-400 transition-colors hover:text-green-600 focus-visible:ring-2 focus-visible:ring-primary-500"
                        aria-label="הוסף מתנה"
                      >
                        <Gift className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      onClick={createPost}
                      disabled={!newPost.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      פרסם
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {posts.length === 0 ? (
                <p className="rounded-xl bg-white p-6 text-center text-gray-600 shadow-lg dark:bg-gray-800 dark:text-gray-300" role="status">
                  אין פוסטים עדיין — היה הראשון לשתף!
                </p>
              ) : null}
              {posts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {(post.author?.name || '?').charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {post.author?.name || 'משתמש'}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          רמה {post.author?.level ?? 1}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {post.author?.rank || 'Bronze'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.createdAt).toLocaleDateString('he-IL')}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-900 dark:text-white mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                      <button
                        type="button"
                        onClick={() => toggleLike(post.id)}
                        aria-pressed={post.isLiked}
                        aria-label={post.isLiked ? `הסר לייק, ${post.likes} לייקים` : `לייק, ${post.likes} לייקים`}
                        className={`flex items-center gap-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 ${
                          post.isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} aria-hidden="true" />
                        <span aria-hidden="true">{post.likes}</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-blue-600 focus-visible:ring-2 focus-visible:ring-primary-500"
                        aria-label={`${post.commentsCount} תגובות`}
                      >
                        <MessageCircle className="h-5 w-5" aria-hidden="true" />
                        <span aria-hidden="true">{post.commentsCount}</span>
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-green-600 focus-visible:ring-2 focus-visible:ring-primary-500"
                        aria-label={`${post.shares} שיתופים`}
                      >
                        <Share2 className="h-5 w-5" aria-hidden="true" />
                        <span aria-hidden="true">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'groups' && (
          <motion.div
            key="groups"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                קבוצות לימוד
              </h3>
              <button
                type="button"
                onClick={() => {
                  setCreateGroupNotice(true)
                  window.setTimeout(() => setCreateGroupNotice(false), 4000)
                }}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>צור קבוצה</span>
              </button>
            </div>
            {createGroupNotice ? (
              <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-950/40 dark:text-blue-200" role="status" aria-live="polite">
                יצירת קבוצה מותאמת אישית תגיע בגרסה הבאה — בינתיים הצטרף לקבוצה קיימת.
              </p>
            ) : null}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroups.map(group => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {group.name}
                    </h4>
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {group.isPublic ? (
                        <Globe className="h-4 w-4 text-green-600" />
                      ) : (
                        <Lock className="h-4 w-4 text-gray-600" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {group.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(group.tags ?? []).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Array.isArray(group.members) ? group.members.length : 0}/{group.maxMembers ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {group.activity?.posts ?? 0}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => joinGroup(group.id)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    הצטרף לקבוצה
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'challenges' && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              אתגרי למידה
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredChallenges.map(challenge => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {challenge.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {challenge.difficulty === 'easy' ? 'קל' :
                       challenge.difficulty === 'medium' ? 'בינוני' : 'קשה'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {challenge.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">
                        +{challenge.reward.xp}
                      </div>
                      <div className="text-xs text-gray-500">XP</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">
                        {challenge.reward.gems}
                      </div>
                      <div className="text-xs text-gray-500">אבנים</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {challenge.participants} משתתפים
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(challenge.endDate).toLocaleDateString('he-IL')}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => joinChallenge(challenge.id)}
                    disabled={isJoiningChallenge === challenge.id}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isJoiningChallenge === challenge.id ? 'מצטרף...' : 'הצטרף לאתגר'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              לוח מובילים
            </h3>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' :
                      'bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        index === 2 ? 'bg-orange-600' :
                        'bg-blue-500'
                      }`}>
                        {index < 3 ? (
                          index === 0 ? <Crown className="h-5 w-5" /> :
                          index === 1 ? <Award className="h-5 w-5" /> :
                          <Trophy className="h-5 w-5" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          רמה {user.level} • {user.xp} XP
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.streak} ימים
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Trophy className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {user.achievements} הישגים
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
