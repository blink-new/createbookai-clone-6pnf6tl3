import { Button } from './ui/button'
import { ArrowRight, Sparkles, Clock, Heart } from 'lucide-react'

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-orange-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Story Creation
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Create Magical
              <span className="text-primary-600 block">Children's Books</span>
              in Minutes
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Transform your ideas into beautifully illustrated, personalized children's books using the power of AI. 
              Perfect for parents, teachers, and anyone who loves storytelling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                onClick={() => {
                  const element = document.getElementById('generator')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg"
              >
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => {
                  const element = document.getElementById('gallery')
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="border-primary-300 text-primary-700 hover:bg-primary-50 px-8 py-4 text-lg"
              >
                View Examples
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-6 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start">
                <Clock className="w-5 h-5 text-primary-500 mr-2" />
                <span className="text-gray-600">Ready in 5 minutes</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <Heart className="w-5 h-5 text-orange-500 mr-2" />
                <span className="text-gray-600">10,000+ happy families</span>
              </div>
            </div>
          </div>

          {/* Right Content - Book Preview */}
          <div className="relative">
            <div className="relative mx-auto max-w-md lg:max-w-lg">
              {/* Main Book */}
              <div className="relative transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-lg shadow-2xl p-6 border border-gray-200">
                  <div className="aspect-[3/4] rounded-lg mb-4 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1669823115182-8e7731ff79ea?w=400&h=600&fit=crop" 
                      alt="Emma's Space Adventure"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">Emma's Space Adventure</h3>
                      <p className="text-sm text-white/90">A personalized story</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Created with AI</p>
                  </div>
                </div>
              </div>

              {/* Floating Books */}
              <div className="absolute -top-4 -left-4 transform -rotate-12 opacity-80">
                <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200 w-20 h-24">
                  <img 
                    src="https://images.unsplash.com/photo-1697962176820-b52c00e311f1?w=80&h=100&fit=crop" 
                    alt="Book"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 transform rotate-12 opacity-80">
                <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200 w-20 h-24">
                  <img 
                    src="https://images.unsplash.com/photo-1579539447503-ec82f0aab843?w=80&h=100&fit=crop" 
                    alt="Book"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 animate-bounce">
              <div className="w-8 h-8 bg-orange-400 rounded-full opacity-60"></div>
            </div>
            <div className="absolute bottom-20 left-10 animate-pulse">
              <div className="w-6 h-6 bg-primary-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}