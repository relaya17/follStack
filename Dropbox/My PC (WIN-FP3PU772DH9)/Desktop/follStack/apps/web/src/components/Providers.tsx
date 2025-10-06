'use client'

// @ts-ignore
import { Provider } from 'react-redux'
// @ts-ignore
import { store } from '@/store'
// @ts-ignore
import { ThemeProvider } from './ThemeProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  )
}
