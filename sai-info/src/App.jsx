import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Clients from './components/Clients'
import Ratings from './components/Ratings'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import ScrollToTop from './components/ScrollToTop'
import AIChat from './components/AIChat'
import AdminDashboard from "./pages/AdminDashboard"
import AdminReset from "./pages/AdminReset"
import ITProductsSales from "./pages/ITProductsSales"
import RepairRecovery from "./pages/RepairRecovery"
import ITSolutionsPage from "./pages/ITSolutionsPage"
import PrivacyPolicy from './components/Privacypolicy'
import ReturnPolicy from './components/Returnpolicy'
import ShippingPolicy from './components/Shippingpolicy'
import RefundPolicy from './components/Refundpolicy'
import WarrantyPolicy from './components/Warrantypolicy'
import TermsAndConditions from './components/Termsandconditions'
import EWasteManagement from './pages/EWasteManagement'   // ← fixed: was ./components/EWasteManagement
import Products from './components/Products'

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location])

  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <section id="clients" className="section-pad relative overflow-hidden">
          <div id="testimonials" />
          <div className="absolute inset-0 grid-pattern opacity-15" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <Clients />
              <Ratings />
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
      <ScrollToTop />
      <AIChat />
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    document.documentElement.style.colorScheme = 'light'
    const meta = document.querySelector('meta[name="color-scheme"]')
    if (meta) { meta.content = 'light' }
    else { const m = document.createElement('meta'); m.name = 'color-scheme'; m.content = 'light'; document.head.appendChild(m) }
    localStorage.setItem('theme', 'light')
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loader />

  return (
    <BrowserRouter>
      {/* Background image — fixed behind all pages */}
      <div className="video-bg" />
      <div className="video-overlay" />
      <div className="video-stars" />

      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* ↓ NEW: Products page route */}
        <Route path="/products" element={<Products />} />

        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/warranty-policy" element={<WarrantyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-reset" element={<AdminReset />} />
        <Route path="/services/it-products-sales" element={<ITProductsSales />} />
        <Route path="/services/e-waste-management" element={<EWasteManagement />} />
        <Route path="/services/repair-recovery" element={<RepairRecovery />} />
        <Route path="/services/it-solutions" element={<ITSolutionsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App// redeploy
