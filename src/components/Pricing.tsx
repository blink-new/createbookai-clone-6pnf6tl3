import { Button } from './ui/button'
import { Check, Star } from 'lucide-react'

const plans = [
  {
    name: "Single Book",
    price: "$9.99",
    description: "Perfect for trying out our service",
    features: [
      "1 personalized book",
      "High-quality PDF download",
      "Multiple art styles",
      "Character customization",
      "Commercial rights included"
    ],
    popular: false,
    cta: "Create One Book"
  },
  {
    name: "Book Bundle",
    price: "$24.99",
    originalPrice: "$29.97",
    description: "Best value for families",
    features: [
      "3 personalized books",
      "High-quality PDF downloads",
      "All art styles available",
      "Full character customization",
      "Commercial rights included",
      "Priority support",
      "Revision requests"
    ],
    popular: true,
    cta: "Get Bundle"
  },
  {
    name: "Unlimited",
    price: "$49.99",
    description: "For educators and creators",
    features: [
      "Unlimited books per month",
      "High-quality PDF downloads",
      "All premium features",
      "Advanced customization",
      "Commercial rights included",
      "Priority support",
      "Bulk creation tools",
      "Educational discounts"
    ],
    popular: false,
    cta: "Go Unlimited"
  }
]

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that works best for you. All plans include full commercial rights 
            and high-quality downloads.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-primary-500 scale-105' 
                  : 'border-gray-200 hover:border-primary-300'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-400 line-through ml-2">{plan.originalPrice}</span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <p className="text-sm text-green-600 font-medium mt-1">Save $4.98</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  onClick={() => {
                    const element = document.getElementById('generator')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                  className={`w-full py-3 text-lg font-semibold ${
                    plan.popular
                      ? 'bg-primary-500 hover:bg-primary-600 text-white'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What's included in commercial rights?</h4>
              <p className="text-gray-600">You can print, sell, and distribute your books without any restrictions. Perfect for teachers, parents, or small businesses.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How long does it take to create a book?</h4>
              <p className="text-gray-600">Most books are ready in 5 minutes or less. Complex customizations might take a bit longer, but never more than 15 minutes.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I request revisions?</h4>
              <p className="text-gray-600">Bundle and Unlimited plans include revision requests. Single book purchases can request revisions for a small additional fee.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What file formats do I get?</h4>
              <p className="text-gray-600">All books come as high-resolution PDFs optimized for both digital viewing and professional printing.</p>
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Money Back Guarantee</h3>
            <p className="text-gray-600">
              Not satisfied with your book? We'll refund your money, no questions asked. 
              Your satisfaction is our priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}