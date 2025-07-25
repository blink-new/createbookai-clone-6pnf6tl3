import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ArrowRight, Sparkles, Download, Share2, BookOpen, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { blink } from '../lib/blink'

interface GeneratedBook {
  id: string
  title: string
  story: string
  coverImageUrl: string
  pages: number
  childName: string
  theme: string
  artStyle: string
}

interface BookGeneratorProps {
  onBack?: () => void
}

export function RealBookGenerator({ onBack }: BookGeneratorProps) {
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    childName: '',
    age: '',
    theme: '',
    artStyle: '',
    customPrompt: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [generatedBook, setGeneratedBook] = useState<GeneratedBook | null>(null)
  const [userCredits, setUserCredits] = useState(3) // Default free credits

  const themes = [
    { id: 'adventure', name: 'Adventure', description: 'Exciting journeys and exploration' },
    { id: 'fantasy', name: 'Fantasy', description: 'Magic, dragons, and mythical creatures' },
    { id: 'space', name: 'Space', description: 'Astronauts, planets, and cosmic adventures' },
    { id: 'animals', name: 'Animals', description: 'Friendly creatures and nature stories' },
    { id: 'friendship', name: 'Friendship', description: 'Stories about making friends' },
    { id: 'learning', name: 'Learning', description: 'Educational and discovery themes' }
  ]

  const artStyles = [
    { id: 'watercolor', name: 'Watercolor', description: 'Soft, dreamy illustrations' },
    { id: 'cartoon', name: 'Cartoon', description: 'Fun, colorful cartoon style' },
    { id: 'realistic', name: 'Realistic', description: 'Detailed, lifelike artwork' },
    { id: 'vintage', name: 'Vintage', description: 'Classic storybook style' }
  ]

  // Check user credits on component mount
  useEffect(() => {
    const checkUserCredits = async () => {
      try {
        const credits = await blink.db.userCredits.list({
          where: { userId: user?.id },
          limit: 1
        })
        
        if (credits.length > 0) {
          setUserCredits(Number(credits[0].creditsRemaining))
        } else {
          // Create initial credits record for new user
          await blink.db.userCredits.create({
            id: `credits_${user?.id}`,
            userId: user?.id,
            creditsRemaining: 3,
            totalBooksCreated: 0,
            planType: 'free'
          })
          setUserCredits(3)
        }
      } catch (error) {
        console.error('Error checking credits:', error)
      }
    }

    if (user) {
      checkUserCredits()
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGenerate = async () => {
    if (!user) {
      alert('Please sign in to generate books!')
      return
    }

    if (userCredits <= 0) {
      alert('You have no credits remaining. Please upgrade your plan to continue creating books!')
      return
    }

    setIsGenerating(true)

    try {
      // Generate story using AI
      const storyPrompt = `Create a personalized children's story for ${formData.childName}, age ${formData.age}. 
      Theme: ${formData.theme}
      Art style: ${formData.artStyle}
      ${formData.customPrompt ? `Additional elements: ${formData.customPrompt}` : ''}
      
      Make it engaging, age-appropriate, and about 500-800 words. Include the child's name throughout the story.
      Format it as a complete story with a clear beginning, middle, and end.`

      const { text: story } = await blink.ai.generateText({
        prompt: storyPrompt,
        model: 'gpt-4o-mini',
        maxTokens: 1000
      })

      // Generate book cover image
      const coverPrompt = `Children's book cover illustration in ${formData.artStyle} style. 
      Title: "${formData.childName}'s ${formData.theme} Adventure". 
      Theme: ${formData.theme}. 
      Colorful, engaging, suitable for children aged ${formData.age}. 
      High quality, professional book cover design.`

      const { data: coverImages } = await blink.ai.generateImage({
        prompt: coverPrompt,
        size: '1024x1024',
        quality: 'high',
        n: 1
      })

      const bookId = `book_${Date.now()}_${user.id}`
      const bookTitle = `${formData.childName}'s ${formData.theme} Adventure`

      // Save book to database
      await blink.db.books.create({
        id: bookId,
        userId: user.id,
        title: bookTitle,
        childName: formData.childName,
        childAge: parseInt(formData.age.split('-')[0]),
        theme: formData.theme,
        artStyle: formData.artStyle,
        storyContent: story,
        coverImageUrl: coverImages[0].url,
        status: 'completed'
      })

      // Update user credits
      const currentCredits = await blink.db.userCredits.list({ where: { userId: user.id } })
      if (currentCredits.length > 0) {
        await blink.db.userCredits.update(`credits_${user.id}`, {
          creditsRemaining: userCredits - 1,
          totalBooksCreated: Number(currentCredits[0].totalBooksCreated) + 1
        })
      }

      setUserCredits(prev => prev - 1)
      setGeneratedBook({
        id: bookId,
        title: bookTitle,
        story,
        coverImageUrl: coverImages[0].url,
        pages: 12,
        childName: formData.childName,
        theme: formData.theme,
        artStyle: formData.artStyle
      })
      setStep(4)

    } catch (error) {
      console.error('Error generating book:', error)
      alert('Failed to generate book. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!generatedBook || isDownloading) return
    
    setIsDownloading(true)
    
    try {
      // Create a comprehensive book content
      const bookContent = `
${generatedBook.title}

A personalized story created for ${generatedBook.childName}

Story:
${generatedBook.story}

---
Book Details:
- Theme: ${generatedBook.theme}
- Art Style: ${generatedBook.artStyle}
- Pages: ${generatedBook.pages}
- Created: ${new Date().toLocaleDateString()}

Created with CreateBookAI Clone
      `
      
      const blob = new Blob([bookContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `${generatedBook.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      URL.revokeObjectURL(url)
      
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShareBook = async () => {
    if (!generatedBook || isSharing) return
    
    setIsSharing(true)
    
    const shareData = {
      title: generatedBook.title,
      text: `Check out this AI-generated children's book: "${generatedBook.title}" - A personalized story created for ${generatedBook.childName}!`,
      url: window.location.href
    }
    
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        const shareText = `${shareData.text}\n\nCreate your own at: ${shareData.url}`
        await navigator.clipboard.writeText(shareText)
        alert('Book details copied to clipboard! Share it with your friends.')
      }
    } catch (error) {
      console.error('Sharing failed:', error)
      const shareText = `${shareData.text}\n\nCreate your own at: ${shareData.url}`
      prompt('Copy this text to share your book:', shareText)
    } finally {
      setIsSharing(false)
    }
  }

  const resetGenerator = () => {
    setStep(1)
    setFormData({
      childName: '',
      age: '',
      theme: '',
      artStyle: '',
      customPrompt: ''
    })
    setGeneratedBook(null)
  }

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <section id="generator" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <User className="h-16 w-16 text-primary-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sign In to Create Your Book
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Create personalized AI-generated children's books with our magical book creator
            </p>
            <Button 
              onClick={() => blink.auth.login()}
              size="lg"
              className="px-8"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Sign In to Start Creating
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="generator" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with user info and credits */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                ← Back to Home
              </Button>
            )}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {user.email}
              </div>
              <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                {userCredits} credits remaining
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create Your AI Book
          </h2>
          <p className="text-xl text-gray-600">
            Follow these simple steps to create a personalized children's book
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step > stepNum ? 'bg-primary-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tell us about your child</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Child's Name
                </label>
                <input
                  type="text"
                  value={formData.childName}
                  onChange={(e) => handleInputChange('childName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your child's name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                <select
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select age</option>
                  <option value="2-3">2-3 years</option>
                  <option value="4-5">4-5 years</option>
                  <option value="6-7">6-7 years</option>
                  <option value="8-9">8-9 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <Button 
                onClick={() => setStep(2)}
                disabled={!formData.childName || !formData.age}
                className="w-full"
                size="lg"
              >
                Next Step
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Step 2: Theme Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose a theme</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {themes.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => handleInputChange('theme', theme.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.theme === theme.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{theme.name}</h4>
                    <p className="text-sm text-gray-600">{theme.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={!formData.theme}
                  className="flex-1"
                >
                  Next Step
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Art Style & Custom Prompt */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose art style</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {artStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => handleInputChange('artStyle', style.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.artStyle === style.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">{style.name}</h4>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Story Elements (Optional)
                </label>
                <textarea
                  value={formData.customPrompt}
                  onChange={(e) => handleInputChange('customPrompt', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any special details, favorite animals, or story elements..."
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This will use 1 credit from your account. You have {userCredits} credits remaining.
                </p>
              </div>

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleGenerate}
                  disabled={!formData.artStyle || isGenerating || userCredits <= 0}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Generating with AI...
                    </>
                  ) : (
                    <>
                      Generate Book
                      <Sparkles className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Generated Book */}
          {step === 4 && generatedBook && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your AI book is ready! ✨</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={generatedBook.coverImageUrl}
                    alt="AI Generated Book Cover"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">{generatedBook.title}</h4>
                  <p className="text-gray-600">
                    A personalized {generatedBook.pages}-page story created just for {generatedBook.childName}
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg max-h-40 overflow-y-auto">
                    <h5 className="font-semibold text-gray-900 mb-2">Story Preview:</h5>
                    <p className="text-sm text-gray-700">
                      {generatedBook.story.substring(0, 300)}...
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      onClick={handleDownloadPDF} 
                      disabled={isDownloading}
                      className="w-full" 
                      size="lg"
                    >
                      <Download className={`mr-2 h-5 w-5 ${isDownloading ? 'animate-spin' : ''}`} />
                      {isDownloading ? 'Preparing Download...' : 'Download Story'}
                    </Button>
                    <Button 
                      onClick={handleShareBook} 
                      disabled={isSharing}
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                    >
                      <Share2 className={`mr-2 h-5 w-5 ${isSharing ? 'animate-pulse' : ''}`} />
                      {isSharing ? 'Sharing...' : 'Share Book'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-sm text-green-800">
                    <strong>Success!</strong> Your personalized book has been created and saved to your account.
                  </p>
                </div>
              </div>

              <Button variant="outline" onClick={resetGenerator} className="w-full">
                Create Another Book ({userCredits} credits remaining)
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}