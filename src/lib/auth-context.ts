import { createContext } from 'react'

interface User {
  id: string
  email: string
  displayName?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAuthenticated: false
})

export type { User, AuthContextType }