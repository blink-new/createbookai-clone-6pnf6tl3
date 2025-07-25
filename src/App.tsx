import React, { useState } from 'react'
import { AuthProvider } from './components/AuthProvider'
import { AppContext } from './lib/app-context'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { RealBookGenerator } from './components/RealBookGenerator'
import { Gallery } from './components/Gallery'
import { Pricing } from './components/Pricing'
import { Footer } from './components/Footer'
import { useAuth } from './hooks/useAuth'

function AppContent() {
  const [showGenerator, setShowGenerator] = useState(false)
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your magical book creator...</p>
        </div>
      </div>
    )
  }

  return (
    <AppContext.Provider value={{ showGenerator, setShowGenerator }}>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          {showGenerator ? (
            <RealBookGenerator onBack={() => setShowGenerator(false)} />
          ) : (
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <Gallery />
              <Pricing />
            </>
          )}
        </main>
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App