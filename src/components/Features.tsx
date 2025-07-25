import { Clock, Palette, Download, Users, Sparkles, Shield } from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: "5-Minute Creation",
    description: "From idea to finished book in just 5 minutes. Our AI works fast so you don't have to wait."
  },
  {
    icon: Sparkles,
    title: "100% AI Generated",
    description: "Every story and illustration is uniquely created by advanced AI technology."
  },
  {
    icon: Palette,
    title: "Multiple Art Styles",
    description: "Choose from various illustration styles to match your story's mood and theme."
  },
  {
    icon: Users,
    title: "Fully Customizable",
    description: "Personalize characters, names, ages, and themes to create truly unique stories."
  },
  {
    icon: Download,
    title: "Instant Download",
    description: "Get your book as a high-quality PDF ready for printing or digital sharing."
  },
  {
    icon: Shield,
    title: "Full Ownership",
    description: "You own the complete rights to your book. Print, share, or sell as you wish."
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CreateBookAI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've made creating beautiful children's books as easy as describing your idea. 
            Here's what makes us special.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Create Your First Book?
            </h3>
            <p className="text-primary-100 text-lg mb-6 max-w-2xl mx-auto">
              Join thousands of parents and educators who are already creating magical stories with AI.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('generator')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Creating Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}