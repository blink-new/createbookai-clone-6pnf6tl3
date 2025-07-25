import { useState } from 'react'
import { Button } from './ui/button'
import { Eye, Heart } from 'lucide-react'

const sampleBooks = [
  {
    id: 1,
    title: "Luna's Moon Adventure",
    description: "A brave little girl explores the mysteries of the moon",
    style: "Watercolor",
    age: "4-8 years",
    likes: 234,
    imageUrl: "https://images.unsplash.com/photo-1669823115182-8e7731ff79ea?w=400&h=600&fit=crop"
  },
  {
    id: 2,
    title: "Max and the Magic Forest",
    description: "A curious boy discovers magical creatures in an enchanted forest",
    style: "Digital Art",
    age: "5-9 years", 
    likes: 189,
    imageUrl: "https://images.unsplash.com/photo-1697962176820-b52c00e311f1?w=400&h=600&fit=crop"
  },
  {
    id: 3,
    title: "Zara's Space Journey",
    description: "An adventurous girl travels through space to save her planet",
    style: "Cartoon",
    age: "6-10 years",
    likes: 312,
    imageUrl: "https://images.unsplash.com/photo-1579539447503-ec82f0aab843?w=400&h=600&fit=crop"
  },
  {
    id: 4,
    title: "The Friendly Dragon",
    description: "A kind dragon helps a village overcome their fears",
    style: "Illustration",
    age: "3-7 years",
    likes: 267,
    imageUrl: "https://images.unsplash.com/photo-1689230053630-cb51e7b90fc1?w=400&h=600&fit=crop"
  },
  {
    id: 5,
    title: "Ocean Explorer Emma",
    description: "A young marine biologist discovers underwater wonders",
    style: "Realistic",
    age: "7-11 years",
    likes: 198,
    imageUrl: "https://images.unsplash.com/photo-1593695961839-b2684d6030cd?w=400&h=600&fit=crop"
  },
  {
    id: 6,
    title: "The Time Traveling Cat",
    description: "A magical cat takes children on adventures through history",
    style: "Vintage",
    age: "5-9 years",
    likes: 156,
    imageUrl: "https://images.unsplash.com/photo-1645113441347-d48786e0742b?w=400&h=600&fit=crop"
  }
]

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = ['All', 'Adventure', 'Fantasy', 'Educational', 'Animals']

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Gallery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get inspired by these amazing books created by our community. 
            Each one is unique and tells a special story.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-primary-500 hover:bg-primary-600 text-white" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sampleBooks.map((book) => (
            <div 
              key={book.id}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Book Cover */}
              <div className="aspect-[3/4] relative overflow-hidden">
                <img 
                  src={book.imageUrl} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <div className="inline-flex items-center px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-gray-700 mb-2">
                    {book.style}
                  </div>
                </div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-3">
                    <Button 
                      size="sm" 
                      onClick={() => alert(`Previewing "${book.title}" - In a real app, this would open a detailed view of the book.`)}
                      className="bg-white text-gray-900 hover:bg-gray-100"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => alert(`Liked "${book.title}"! In a real app, this would save to your favorites.`)}
                      className="border-white text-white hover:bg-white hover:text-gray-900"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      Like
                    </Button>
                  </div>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-4">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                  <span>Age: {book.age}</span>
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1 text-red-400" />
                    <span>{book.likes}</span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{book.title}</h4>
                <p className="text-sm text-gray-600">{book.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => alert('Loading more books... In a real app, this would fetch additional books from the database.')}
            className="border-primary-300 text-primary-700 hover:bg-primary-50"
          >
            Load More Books
          </Button>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Create Your Own Masterpiece
            </h3>
            <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
              Join our creative community and bring your unique story to life. 
              Every book is special, just like the child who inspired it.
            </p>
            <Button 
              size="lg" 
              onClick={() => {
                const element = document.getElementById('generator')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4"
            >
              Start Creating
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}