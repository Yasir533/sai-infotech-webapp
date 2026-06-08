import React, { useEffect, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { getApiBase } from "../utils/apiBase"

const PLACEHOLDER = "https://placehold.co/800x600/e2e8f0/94a3b8?text=No+Image"

// ── Skeleton card ──────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-72 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-5/6" />
        <div className="border-t pt-4 space-y-2">
          <div className="h-4 bg-slate-100 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  )
}

// ── Image carousel inside product card ────────────────────────────────────────
function ImageCarousel({ images, alt, API_BASE }) {
  const [current, setCurrent] = useState(0)
  const [imgErrors, setImgErrors] = useState({})

  const total = images?.length ?? 0
  if (total === 0) {
    return (
      <div className="h-72 bg-slate-100 flex items-center justify-center">
        <img src={PLACEHOLDER} alt={alt} className="h-full w-full object-cover" />
      </div>
    )
  }

  const resolve = (src) => {
    if (!src) return PLACEHOLDER
    if (src.startsWith("/uploads/")) return `${API_BASE}${src}`
    return src
  }

  const prev = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c - 1 + total) % total)
  }
  const next = (e) => {
    e.stopPropagation()
    setCurrent((c) => (c + 1) % total)
  }

  return (
    <div className="relative h-72 bg-slate-100 overflow-hidden group">
      {/* Main image with fade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={imgErrors[current] ? PLACEHOLDER : resolve(images[current])}
          alt={`${alt} ${current + 1}`}
          onError={() => setImgErrors((e) => ({ ...e, [current]: true }))}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </AnimatePresence>

      {/* Prev / Next — only show when > 1 image */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/85 text-slate-700 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-white/85 text-slate-700 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              aria-label={`Go to image ${i + 1}`}
              className={`rounded-full transition-all duration-200 ${
                i === current
                  ? "w-5 h-2 bg-white shadow"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Image counter badge */}
      {total > 1 && (
        <div className="absolute top-3 right-3 z-10 bg-black/50 text-white text-[10px] font-semibold rounded-full px-2 py-0.5 backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      )}
    </div>
  )
}

// ── Product card ───────────────────────────────────────────────────────────────
function ProductCard({ product, index, API_BASE, onOpenLightbox }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Carousel */}
      <div className="cursor-pointer" onClick={() => onOpenLightbox(product, 0)}>
        <ImageCarousel images={product.images ?? []} alt={product.name} API_BASE={API_BASE} />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-slate-900 leading-snug">{product.name}</h3>

        {product.description && (
          <p className="text-slate-500 text-sm mb-4 flex-1 leading-relaxed line-clamp-3">
            {product.description}
          </p>
        )}

        {/* Thumbnail strip — tap to open lightbox */}
        {(product.images?.length ?? 0) > 1 && (
          <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
            {product.images.slice(0, 6).map((img, i) => {
              const src = img?.startsWith("/uploads/") ? `${API_BASE}${img}` : img
              return (
                <button
                  key={i}
                  onClick={() => onOpenLightbox(product, i)}
                  className="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#345f9a] transition-colors"
                >
                  <img src={src || PLACEHOLDER} alt="" className="h-full w-full object-cover" />
                </button>
              )
            })}
            {product.images.length > 6 && (
              <button
                onClick={() => onOpenLightbox(product, 6)}
                className="flex-shrink-0 h-10 w-10 rounded-lg bg-slate-100 border-2 border-transparent hover:border-[#345f9a] flex items-center justify-center text-xs font-bold text-slate-500 transition-colors"
              >
                +{product.images.length - 6}
              </button>
            )}
          </div>
        )}

        <div className="border-t pt-4 text-sm text-slate-500">
          For more information contact:
          <br />
          <a
            href="tel:8310338544"
            className="font-bold text-slate-800 hover:text-[#345f9a] transition-colors"
          >
            83 10 33 85 44
          </a>
        </div>
      </div>
    </motion.div>
  )
}

// ── Lightbox / full-screen image viewer ───────────────────────────────────────
function Lightbox({ product, startIndex, onClose, API_BASE }) {
  const [current, setCurrent] = useState(startIndex)
  const images = product?.images ?? []
  const total = images.length

  const resolve = (src) => {
    if (!src) return PLACEHOLDER
    if (src.startsWith("/uploads/")) return `${API_BASE}${src}`
    return src
  }

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total])
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [prev, next, onClose])

  if (!product) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="font-bold text-white text-lg">{product.name}</h3>
          <p className="text-white/50 text-xs mt-0.5">{current + 1} of {total} photos</p>
        </div>
        <button
          onClick={onClose}
          className="h-10 w-10 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:bg-white/10 transition"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative px-12 min-h-0" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={resolve(images[current])}
            alt={`${product.name} ${current + 1}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="max-h-full max-w-full object-contain rounded-xl"
            onError={(e) => { e.target.src = PLACEHOLDER }}
          />
        </AnimatePresence>

        {total > 1 && (
          <>
            <button onClick={prev} aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M13 16L7 10L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button onClick={next} aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <div className="flex-shrink-0 flex gap-2 px-5 py-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`flex-shrink-0 h-14 w-14 rounded-xl overflow-hidden border-2 transition ${
              i === current ? "border-white" : "border-white/20 hover:border-white/50"
            }`}
          >
            <img src={resolve(img)} alt="" className="h-full w-full object-cover"
              onError={(e) => { e.target.src = PLACEHOLDER }} />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ── Main Products page ─────────────────────────────────────────────────────────
export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")

  // Lightbox state
  const [lightboxProduct, setLightboxProduct] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const API_BASE = getApiBase()

  const loadProducts = () => {
    setError(null)
    setLoading(true)
    fetch(`${API_BASE}/api/products`)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setProducts(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(err.message || "Failed to load products.")
        setLoading(false)
      })
  }

  useEffect(() => { loadProducts() }, [API_BASE])

  const filtered = products.filter((p) => {
    if (filter === "inStock") return p.inStock === true
    if (filter === "outOfStock") return p.inStock === false
    return true
  })

  const openLightbox = (product, idx) => {
    setLightboxProduct(product)
    setLightboxIndex(idx)
  }
  const closeLightbox = () => setLightboxProduct(null)

  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
              <Link to="/" className="hover:text-[#345f9a] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-slate-800 font-semibold">Products</span>
            </div>

            <h1
              style={{ fontFamily: "Georgia, serif" }}
              className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight"
            >
              Our <span className="text-[#345f9a]">Products</span>
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Browse our range of quality IT products. Hover over cards to flip through all photos, or click any image to open the full gallery. Contact us for pricing or bulk orders.
            </p>
          </motion.div>

          {/* Filter pills */}
          {!loading && !error && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-3 mb-10 flex-wrap"
            >
              {[
                { key: "all", label: "All Products", count: products.length },
                { key: "inStock", label: "In Stock", count: products.filter((p) => p.inStock).length },
                { key: "outOfStock", label: "Out Of Stock", count: products.filter((p) => !p.inStock).length },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                    filter === key
                      ? "bg-[#345f9a] text-white border-[#345f9a] shadow"
                      : "bg-white text-slate-600 border-slate-200 hover:border-[#345f9a] hover:text-[#345f9a]"
                  }`}
                >
                  {label}
                  <span className="ml-2 text-xs opacity-70">({count})</span>
                </button>
              ))}
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
              <p className="text-slate-500 mb-6 text-sm">{error}</p>
              <button
                onClick={loadProducts}
                className="px-6 py-2 bg-[#345f9a] text-white rounded-full font-bold hover:bg-[#2a4f87] transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {products.length === 0 ? "No products yet" : "No products match this filter"}
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                {products.length === 0
                  ? "Check back soon — new products will appear here."
                  : "Try a different filter above."}
              </p>
              {products.length > 0 && (
                <button
                  onClick={() => setFilter("all")}
                  className="px-6 py-2 bg-[#345f9a] text-white rounded-full font-bold hover:bg-[#2a4f87] transition-colors"
                >
                  Show All
                </button>
              )}
            </div>
          )}

          {/* Grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={i}
                  API_BASE={API_BASE}
                  onOpenLightbox={openLightbox}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Full-screen lightbox */}
      <AnimatePresence>
        {lightboxProduct && (
          <Lightbox
            product={lightboxProduct}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
            API_BASE={API_BASE}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
