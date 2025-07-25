import { createContext } from 'react'

interface AppContextType {
  showGenerator: boolean
  setShowGenerator: (show: boolean) => void
}

export const AppContext = createContext<AppContextType>({
  showGenerator: false,
  setShowGenerator: () => {}
})

export type { AppContextType }