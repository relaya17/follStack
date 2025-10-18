import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function usePasswordToggle(initialValue = false) {
  const [showPassword, setShowPassword] = useState(initialValue)
  
  const togglePassword = () => setShowPassword(!showPassword)
  
  const PasswordIcon = showPassword ? EyeOff : Eye
  
  const getInputType = () => showPassword ? 'text' : 'password'
  
  const getIconButton = (className = 'text-gray-400 hover:text-gray-600') => (
    <button
      type="button"
      onClick={togglePassword}
      className={`${className} p-0.5`}
      title={showPassword ? 'Hide password' : 'Show password'}
    >
      <PasswordIcon className="h-2.5 w-2.5" />
    </button>
  )
  
  return {
    showPassword,
    togglePassword,
    PasswordIcon,
    getInputType,
    getIconButton
  }
}