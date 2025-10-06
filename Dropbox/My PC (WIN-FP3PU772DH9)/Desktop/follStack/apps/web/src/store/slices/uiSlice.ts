// @ts-ignore
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Notification {
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    duration?: number
    action?: {
        label: string
        onClick: () => void
    }
}

interface Modal {
    id: string
    type: 'confirm' | 'info' | 'form'
    title: string
    content: string
    actions?: {
        primary?: {
            label: string
            onClick: () => void
        }
        secondary?: {
            label: string
            onClick: () => void
        }
    }
}

interface UIState {
    theme: 'light' | 'dark' | 'system'
    sidebarOpen: boolean
    notifications: Notification[]
    modals: Modal[]
    loading: {
        global: boolean
        auth: boolean
        learning: boolean
        user: boolean
    }
    searchOpen: boolean
    codeEditorOpen: boolean
    aiMentorOpen: boolean
    chatOpen: boolean
    accessibility: {
        highContrast: boolean
        reducedMotion: boolean
        fontSize: 'small' | 'medium' | 'large'
        screenReader: boolean
    }
}

const initialState: UIState = {
    theme: 'system',
    sidebarOpen: false,
    notifications: [],
    modals: [],
    loading: {
        global: false,
        auth: false,
        learning: false,
        user: false,
    },
    searchOpen: false,
    codeEditorOpen: false,
    aiMentorOpen: false,
    chatOpen: false,
    accessibility: {
        highContrast: false,
        reducedMotion: false,
        fontSize: 'medium',
        screenReader: false,
    },
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setTheme: (state: UIState, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            state.theme = action.payload
        },
        toggleSidebar: (state: UIState) => {
            state.sidebarOpen = !state.sidebarOpen
        },
        setSidebarOpen: (state: UIState, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload
        },
        addNotification: (state: UIState, action: PayloadAction<Omit<Notification, 'id'>>) => {
            const notification: Notification = {
                ...action.payload,
                id: Date.now().toString(),
            }
            state.notifications.push(notification)
        },
        removeNotification: (state: UIState, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter((n: Notification) => n.id !== action.payload)
        },
        clearNotifications: (state: UIState) => {
            state.notifications = []
        },
        addModal: (state: UIState, action: PayloadAction<Omit<Modal, 'id'>>) => {
            const modal: Modal = {
                ...action.payload,
                id: Date.now().toString(),
            }
            state.modals.push(modal)
        },
        removeModal: (state: UIState, action: PayloadAction<string>) => {
            state.modals = state.modals.filter((m: Modal) => m.id !== action.payload)
        },
        clearModals: (state: UIState) => {
            state.modals = []
        },
        setLoading: (state: UIState, action: PayloadAction<{ key: keyof UIState['loading']; value: boolean }>) => {
            state.loading[action.payload.key] = action.payload.value
        },
        setSearchOpen: (state: UIState, action: PayloadAction<boolean>) => {
            state.searchOpen = action.payload
        },
        setCodeEditorOpen: (state: UIState, action: PayloadAction<boolean>) => {
            state.codeEditorOpen = action.payload
        },
        setAiMentorOpen: (state: UIState, action: PayloadAction<boolean>) => {
            state.aiMentorOpen = action.payload
        },
        setChatOpen: (state: UIState, action: PayloadAction<boolean>) => {
            state.chatOpen = action.payload
        },
        updateAccessibility: (state: UIState, action: PayloadAction<Partial<UIState['accessibility']>>) => {
            state.accessibility = { ...state.accessibility, ...action.payload }
        },
        resetUI: (state: UIState) => {
            return { ...initialState, theme: state.theme, accessibility: state.accessibility }
        },
    },
})

export const {
    setTheme,
    toggleSidebar,
    setSidebarOpen,
    addNotification,
    removeNotification,
    clearNotifications,
    addModal,
    removeModal,
    clearModals,
    setLoading,
    setSearchOpen,
    setCodeEditorOpen,
    setAiMentorOpen,
    setChatOpen,
    updateAccessibility,
    resetUI,
} = uiSlice.actions

export default uiSlice.reducer
