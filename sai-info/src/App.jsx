import React, { useState, useEffect } from 'react'
import Loader from './components/Loader'
import VideoBackground from './components/VideoBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Clients from './components/Clients'
import Ratings from './components/Ratings'
import Certificate from './components/Certificate'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import ScrollToTop from './components/ScrollToTop'
import AIChat from './components/AIChat'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <div className="gradient-bg min-h-screen">
      <VideoBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Clients />
        <Ratings />
        <Certificate />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <ScrollToTop />
      <AIChat />
    </div>
  )
}

export default App
