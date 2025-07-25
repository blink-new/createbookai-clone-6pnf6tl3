import { useState } from 'react'
import { Button } from './ui/button'
import { Menu, X, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useApp } from '../hooks/useApp'
import { blink } from '../lib/blink'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth()
  const { setShowGenerator } = useApp()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const handleCreateBook = () => {
    setShowGenerator(true)
    setIsMenuOpen(false)
  }

  const handleSignIn = () => {
    if (user) {
      blink.auth.logout()
    } else {
      blink.auth.login()
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">CreateBookAI</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('features')} className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection('how-it-works')} className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                How it Works
              </button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                Gallery
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </button>
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    <span>{user.email}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignIn}
                    className="text-gray-900 hover:text-primary-600"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={handleSignIn}
                  className="text-gray-900 hover:text-primary-600"
                >
                  Sign In
                </Button>
              )}
              <Button onClick={handleCreateBook} className="bg-primary-500 hover:bg-primary-600 text-white">
                Create Book
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
            <button onClick={() => scrollToSection('home')} className="text-gray-900 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left">
              Home
            </button>
            <button onClick={() => scrollToSection('features')} className="text-gray-900 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left">
              Features
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-900 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left">
              How it Works
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-900 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left">
              Gallery
            </button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-900 hover:text-primary-600 block px-3 py-2 text-base font-medium w-full text-left">
              Pricing
            </button>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3 space-y-2 flex-col">
                {user ? (
                  <>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <User className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      onClick={handleSignIn}
                      className="w-full text-gray-900 hover:text-primary-600"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={handleSignIn}
                    className="w-full text-gray-900 hover:text-primary-600"
                  >
                    Sign In
                  </Button>
                )}
                <Button onClick={handleCreateBook} className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                  Create Book
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}