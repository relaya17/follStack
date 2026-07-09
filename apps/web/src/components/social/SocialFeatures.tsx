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
import { apiUrl } from '@/lib/api'

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
  endDate: Date
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
  createdAt: Date
  tags: string[]
  isLiked: boolean
  comments?: Array<{
    id: string
    author: User
    content: string
    createdAt: Date
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
  
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [isJoiningChallenge, setIsJoiningChallenge] = useState<string | null>(null)
  const [newPost, setNewPost] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Load social data
  const loadSocialData = useCallback(async () => {
    try {
      const response = await fetch(apiUrl('/api/social/feed'), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (!response.ok) return
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) return
      const data = await response.json()
      setPosts(data.posts || [])
      setGroups(data.groups || [])
      setChallenges(data.challenges || [])
      setLeaderboard(data.leaderboard || [])
      setFriends(data.friends || [])
    } catch (error) {
      console.error('Error loading social data:', error)
    }
  }, [])

  // Create new post
  const createPost = useCallback(async () => {
    if (!newPost.trim()) return

    try {
      const response = await fetch(apiUrl('/api/social/posts'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          content: newPost,
          userId
        })
      })

      if (!response.ok) return
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
      const response = await fetch(apiUrl(`/api/social/posts/${postId}/like`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

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
      const response = await fetch(apiUrl(`/api/social/groups/${groupId}/join`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
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
      const response = await fetch(apiUrl(`/api/social/challenges/${challengeId}/join`), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
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
      const response = await fetch(apiUrl('/api/social/groups'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...groupData,
          createdBy: userId
        })
      })

      if (response.ok) {
        loadSocialData() // Refresh data
        onCreateGroup?.(groupData)
        setIsCreatingGroup(false)
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
    group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const filteredChallenges = challenges.filter(challenge =>
    challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    challenge.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            קהילת למידה
          </h2>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {[
            { id: 'feed', label: 'פיד', icon: MessageCircle },
            { id: 'groups', label: 'קבוצות', icon: Users },
            { id: 'challenges', label: 'אתגרים', icon: Trophy },
            { id: 'leaderboard', label: 'לוח מובילים', icon: Crown }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'feed' | 'groups' | 'leaderboard' | 'challenges')}
              className={`flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-600 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="חיפוש קבוצות, אתגרים או משתמשים..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
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
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="שתף את החוויה שלך מהלמידה..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Camera className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Gift className="h-5 w-5" />
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
              {posts.map(post => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {post.author.name}
                        </h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          רמה {post.author.level}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {post.author.rank}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-900 dark:text-white mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center space-x-2 rtl:space-x-reverse transition-colors ${
                          post.isLiked ? 'text-red-600' : 'text-gray-400 hover:text-red-600'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400 hover:text-blue-600 transition-colors">
                        <MessageCircle className="h-5 w-5" />
                        <span>{post.commentsCount}</span>
                      </button>
                      <button className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400 hover:text-green-600 transition-colors">
                        <Share2 className="h-5 w-5" />
                        <span>{post.shares}</span>
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
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                קבוצות לימוד
              </h3>
              <button
                onClick={() => setIsCreatingGroup(true)}
                className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>צור קבוצה</span>
              </button>
            </div>

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
                    {group.tags.map(tag => (
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
                        {group.members.length}/{group.maxMembers}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <MessageCircle className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {group.activity.posts}
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
                      {challenge.endDate.toLocaleDateString()}
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
