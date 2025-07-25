import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { BookGenerator } from './components/BookGenerator'
import { Gallery } from './components/Gallery'
import { Pricing } from './components/Pricing'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <BookGenerator />
        <Gallery />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

export default App