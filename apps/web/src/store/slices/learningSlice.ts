import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface Lesson {
  id: string
  title: string
  description: string
  content: string
  type: 'video' | 'text' | 'interactive' | 'quiz'
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  order: number
  isCompleted: boolean
  resources: {
    videos?: string[]
    code?: string
    exercises?: string[]
    links?: { title: string; url: string }[]
  }
}

interface Module {
  id: string
  title: string
  description: string
  icon: string
  color: string
  duration: string
  lessons: Lesson[]
  totalLessons: number
  completedLessons: number
  progress: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prerequisites: string[]
  learningObjectives: string[]
  isEnrolled: boolean
  isCompleted: boolean
  lastAccessed?: string
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: Question[]
  timeLimit?: number
  passingScore: number
  attempts: number
  maxAttempts: number
  isCompleted: boolean
  score?: number
}

interface Question {
  id: string
  type: 'multiple-choice' | 'true-false' | 'code' | 'text'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface LearningState {
  modules: Module[]
  currentModule: Module | null
  currentLesson: Lesson | null
  quizzes: Quiz[]
  currentQuiz: Quiz | null
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedDifficulty: string
  selectedCategory: string
}

const initialState: LearningState = {
  modules: [],
  currentModule: null,
  currentLesson: null,
  quizzes: [],
  currentQuiz: null,
  isLoading: false,
  error: null,
  searchQuery: '',
  selectedDifficulty: 'all',
  selectedCategory: 'all',
}

// Async thunks
export const fetchModules = createAsyncThunk(
  'learning/fetchModules',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('/api/learning/modules', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בטעינת מודולים')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בטעינת מודולים')
    }
  }
)

export const fetchModule = createAsyncThunk(
  'learning/fetchModule',
  async (moduleId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/learning/modules/${moduleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בטעינת מודול')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בטעינת מודול')
    }
  }
)

export const fetchLesson = createAsyncThunk(
  'learning/fetchLesson',
  async ({ moduleId, lessonId }: { moduleId: string; lessonId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/learning/modules/${moduleId}/lessons/${lessonId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בטעינת שיעור')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בטעינת שיעור')
    }
  }
)

export const completeLesson = createAsyncThunk(
  'learning/completeLesson',
  async ({ moduleId, lessonId }: { moduleId: string; lessonId: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/learning/modules/${moduleId}/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בהשלמת שיעור')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בהשלמת שיעור')
    }
  }
)

export const fetchQuizzes = createAsyncThunk(
  'learning/fetchQuizzes',
  async (moduleId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/learning/modules/${moduleId}/quizzes`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בטעינת מבחנים')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בטעינת מבחנים')
    }
  }
)

export const submitQuiz = createAsyncThunk(
  'learning/submitQuiz',
  async ({ quizId, answers }: { quizId: string; answers: Record<string, string> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`/api/learning/quizzes/${quizId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ answers }),
      })

      if (!response.ok) {
        return rejectWithValue('שגיאה בשליחת מבחן')
      }

      return await response.json()
    } catch (error) {
      return rejectWithValue('שגיאה בשליחת מבחן')
    }
  }
)

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSelectedDifficulty: (state, action: PayloadAction<string>) => {
      state.selectedDifficulty = action.payload
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
    setCurrentModule: (state, action: PayloadAction<Module>) => {
      state.currentModule = action.payload
    },
    setCurrentLesson: (state, action: PayloadAction<Lesson>) => {
      state.currentLesson = action.payload
    },
    setCurrentQuiz: (state, action: PayloadAction<Quiz>) => {
      state.currentQuiz = action.payload
    },
    updateModuleProgress: (state, action: PayloadAction<{ moduleId: string; progress: number }>) => {
      const { moduleId, progress } = action.payload
      const module = state.modules.find(m => m.id === moduleId)
      if (module) {
        module.progress = progress
        module.lastAccessed = new Date().toISOString()
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Modules
      .addCase(fetchModules.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.isLoading = false
        state.modules = action.payload
        state.error = null
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      // Fetch Module
      .addCase(fetchModule.fulfilled, (state, action) => {
        state.currentModule = action.payload
        state.error = null
      })
      .addCase(fetchModule.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Fetch Lesson
      .addCase(fetchLesson.fulfilled, (state, action) => {
        state.currentLesson = action.payload
        state.error = null
      })
      .addCase(fetchLesson.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Complete Lesson
      .addCase(completeLesson.fulfilled, (state, action) => {
        const { moduleId, lessonId } = action.payload
        const module = state.modules.find(m => m.id === moduleId)
        if (module) {
          const lesson = module.lessons.find(l => l.id === lessonId)
          if (lesson) {
            lesson.isCompleted = true
          }
          module.completedLessons += 1
          module.progress = (module.completedLessons / module.totalLessons) * 100
        }
        state.error = null
      })
      .addCase(completeLesson.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Fetch Quizzes
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload
        state.error = null
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.error = action.payload as string
      })
      // Submit Quiz
      .addCase(submitQuiz.fulfilled, (state, action) => {
        const { quizId, score, isPassed } = action.payload
        const quiz = state.quizzes.find(q => q.id === quizId)
        if (quiz) {
          quiz.score = score
          quiz.isCompleted = isPassed
          quiz.attempts += 1
        }
        state.error = null
      })
      .addCase(submitQuiz.rejected, (state, action) => {
        state.error = action.payload as string
      })
  },
})

export const {
  clearError,
  setSearchQuery,
  setSelectedDifficulty,
  setSelectedCategory,
  setCurrentModule,
  setCurrentLesson,
  setCurrentQuiz,
  updateModuleProgress,
} = learningSlice.actions

export default learningSlice.reducer
