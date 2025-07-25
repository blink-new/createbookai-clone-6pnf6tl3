import { Edit3, Palette, Download, ArrowRight } from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: Edit3,
    title: "Describe Your Story",
    description: "Tell us about your character, setting, and the adventure you want to create. Be as creative as you like!"
  },
  {
    step: 2,
    icon: Palette,
    title: "Choose Your Style",
    description: "Select from various art styles and customize your book's look. Our AI will bring your vision to life."
  },
  {
    step: 3,
    icon: Download,
    title: "Download & Enjoy",
    description: "Get your personalized book as a high-quality PDF. Print it, share it, or read it digitally!"
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Creating your personalized children's book is simple and fun. 
            Follow these three easy steps to bring your story to life.
          </p>
        </div>

        <div className="relative">
          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  {/* Step Number */}
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last step and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-6 text-primary-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Demo Section */}
        <div className="mt-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  See It In Action
                </h3>
                <p className="text-gray-600 text-lg mb-6">
                  Watch how our AI transforms a simple idea into a beautiful, illustrated children's book. 
                  The process is magical and the results are amazing.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    Unique storylines every time
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    Professional-quality illustrations
                  </li>
                  <li className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                    Age-appropriate content
                  </li>
                </ul>
                <button 
                  onClick={() => {
                    const element = document.getElementById('generator')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Try It Now
                </button>
              </div>
              
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-orange-100 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Watch Demo Video</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}