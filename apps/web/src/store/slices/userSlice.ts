import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  website?: string
  github?: string
  linkedin?: string
  skills: string[]
  experience: 'beginner' | 'intermediate' | 'advanced'
  learningGoals: string[]
  preferredLanguages: string[]
  timezone: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface LearningProgress {
  moduleId: string
  moduleName: string
  completedLessons: number
  totalLessons: number
  progress: number
  lastAccessed: string
  completedAt?: string
}

interface UserStats {
  totalLearningTime: number
  completedModules: number
  completedProjects: number
  streak: number
  level: number
  xp: number
  badges: string[]
}

export interface UserState {
  profile: UserProfile | null
  progress: LearningProgress[]
  stats: UserStats | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  profile: null,
  progress: [],
  stats: null,
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בטעינת פרופיל')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בטעינת פרופיל')
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData: Partial<UserProfile>, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בעדכון פרופיל')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בעדכון פרופיל')
    }
  }
)

export const fetchLearningProgress = createAsyncThunk(
  'user/fetchProgress',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/progress', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בטעינת התקדמות')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בטעינת התקדמות')
    }
  }
)

export const updateLessonProgress = createAsyncThunk(
  'user/updateLessonProgress',
  async ({ moduleId, lessonId, completed }: { moduleId: string; lessonId: string; completed: boolean }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/progress/lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ moduleId, lessonId, completed }),
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בעדכון התקדמות')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בעדכון התקדמות')
    }
  }
)

export const fetchUserStats = createAsyncThunk(
  'user/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/user/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בטעינת סטטיסטיקות')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בטעינת סטטיסטיקות')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateProgress: (state, action: PayloadAction<{ moduleId: string; progress: number }>) => {
      const { moduleId, progress } = action.payload
      const existingProgress = state.progress.find(p => p.moduleId === moduleId)
      if (existingProgress) {
        existingProgress.progress = progress
        existingProgress.lastAccessed = new Date().toISOString()
      }
    },
    addBadge: (state, action: PayloadAction<string>) => {
      if (state.stats && !state.stats.badges.includes(action.payload)) {
        state.stats.badges.push(action.payload)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
        state.error = null
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Update Profile
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload }
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Fetch Progress
      .addCase(fetchLearningProgress.fulfilled, (state, action) => {
        state.progress = action.payload
        state.error = null
      })
      .addCase(fetchLearningProgress.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Update Lesson Progress
      .addCase(updateLessonProgress.fulfilled, (state, action) => {
        const { moduleId, progress } = action.payload
        const existingProgress = state.progress.find(p => p.moduleId === moduleId)
        if (existingProgress) {
          existingProgress.progress = progress
          existingProgress.lastAccessed = new Date().toISOString()
        }
        state.error = null
      })
      .addCase(updateLessonProgress.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Fetch Stats
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.stats = action.payload
        state.error = null
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const { clearError, updateProgress, addBadge } = userSlice.actions
export default userSlice.reducer
