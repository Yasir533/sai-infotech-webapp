import React, { useEffect, useState, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { getApiBase } from "../utils/apiBase"

const PLACEHOLDER = "https://placehold.co/800x600/e2e8f0/94a3b8?text=No+Image"

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
      <div className="h-44 bg-slate-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-full" />
      </div>
    </div>
  )
}

function ImageCarousel({ images, alt, API_BASE, height = "h-44" }) {
  const [current, setCurrent] = useState(0)
  const [imgErrors, setImgErrors] = useState({})
  const total = images?.length ?? 0

  if (total === 0) {
    return (
      <div className={`${height} bg-slate-100 flex items-center justify-center`}>
        <img src={PLACEHOLDER} alt={alt} className="h-full w-full object-cover" />
      </div>
    )
  }

  const resolve = (src) => {
    if (!src) return PLACEHOLDER
    if (src.startsWith("/uploads/")) return `${API_BASE}${src}`
    return src
  }

  const prev = (e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + total) % total) }
  const next = (e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % total) }

  return (
    <div className={`relative ${height} bg-slate-100 overflow-hidden group`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={imgErrors[current] ? PLACEHOLDER : resolve(images[current])}
          alt={`${alt} ${current + 1}`}
          onError={() => setImgErrors((e) => ({ ...e, [current]: true }))}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </AnimatePresence>

      {total > 1 && (
        <>
          <button onClick={prev} aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-white/85 text-slate-700 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={next} aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-7 w-7 rounded-full bg-white/85 text-slate-700 shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </>
      )}

      {total > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className={`rounded-full transition-all duration-200 ${i === current ? "w-4 h-1.5 bg-white shadow" : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"}`} />
          ))}
        </div>
      )}

      {total > 1 && (
        <div className="absolute top-2 right-2 z-10 bg-black/50 text-white text-[10px] font-semibold rounded-full px-2 py-0.5 backdrop-blur-sm">
          {current + 1} / {total}
        </div>
      )}
    </div>
  )
}

// ── Compact card (default view) ───────────────────────────────────────────────
function ProductCard({ product, index, API_BASE, onOpenLightbox, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.12)' }}
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer border border-slate-100 flex flex-col"
    >
      {/* Image */}
      <div onClick={(e) => { e.stopPropagation(); onOpenLightbox(product, 0) }}>
        <ImageCarousel images={product.images ?? []} alt={product.name} API_BASE={API_BASE} height="h-44" />
      </div>

      {/* Compact footer */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-slate-900 truncate">{product.name}</h3>
          {product.description && (
            <p className="text-xs text-slate-400 truncate mt-0.5">{product.description}</p>
          )}
        </div>
        <div className="flex-shrink-0 flex items-center gap-1.5 text-[#345f9a]">
          <span className="text-xs font-semibold">Details</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

// ── Detail modal (shown on click) ─────────────────────────────────────────────
function ProductModal({ product, API_BASE, onClose, onOpenLightbox }) {
  if (!product) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg max-h-[90vh] flex flex-col"
      >
        {/* Modal image */}
        <div className="relative flex-shrink-0 cursor-pointer" onClick={() => onOpenLightbox(product, 0)}>
          <ImageCarousel images={product.images ?? []} alt={product.name} API_BASE={API_BASE} height="h-56" />
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="absolute top-3 left-3 z-20 h-8 w-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Modal content */}
        <div className="p-5 overflow-y-auto flex flex-col gap-4">
          <h2 className="text-xl font-bold text-slate-900">{product.name}</h2>

          {product.description && (
            <p className="text-slate-500 text-sm leading-relaxed">{product.description}</p>
          )}

          {/* Thumbnail strip */}
          {(product.images?.length ?? 0) > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.slice(0, 8).map((img, i) => {
                const src = img?.startsWith("/uploads/") ? `${API_BASE}${img}` : img
                return (
                  <button key={i} onClick={() => onOpenLightbox(product, i)}
                    className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden border-2 border-transparent hover:border-[#345f9a] transition-colors">
                    <img src={src || PLACEHOLDER} alt="" className="h-full w-full object-cover" />
                  </button>
                )
              })}
              {product.images.length > 8 && (
                <button onClick={() => onOpenLightbox(product, 8)}
                  className="flex-shrink-0 h-12 w-12 rounded-lg bg-slate-100 border-2 border-transparent hover:border-[#345f9a] flex items-center justify-center text-xs font-bold text-slate-500">
                  +{product.images.length - 8}
                </button>
              )}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-3 pt-1">
            <a
              href="/#contact"
              style={{
                flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                background: '#e53e3e', color: '#fff', padding: '11px 14px', borderRadius: '10px',
                fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(229,62,62,0.35)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#c53030'}
              onMouseLeave={e => e.currentTarget.style.background = '#e53e3e'}
            >
              Get a Quote
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href={`https://wa.me/919986914248?text=Hi%20SAI%20INFOTECH%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}.`}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                background: '#25D366', color: '#fff', padding: '11px 14px', borderRadius: '10px',
                fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(37,211,102,0.35)', transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#1ebe5a'}
              onMouseLeave={e => e.currentTarget.style.background = '#25D366'}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Lightbox ───────────────────────────────────────────────────────────────────
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
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3 className="font-bold text-white text-lg">{product.name}</h3>
          <p className="text-white/50 text-xs mt-0.5">{current + 1} of {total} photos</p>
        </div>
        <button onClick={onClose}
          className="h-10 w-10 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:bg-white/10 transition">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center relative px-12 min-h-0" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img key={current} src={resolve(images[current])} alt={`${product.name} ${current + 1}`}
            initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }} className="max-h-full max-w-full object-contain rounded-xl"
            onError={(e) => { e.target.src = PLACEHOLDER }} />
        </AnimatePresence>
        {total > 1 && (
          <>
            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 16L7 10L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </>
        )}
      </div>

      <div className="flex-shrink-0 flex gap-2 px-5 py-4 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`flex-shrink-0 h-14 w-14 rounded-xl overflow-hidden border-2 transition ${i === current ? "border-white" : "border-white/20 hover:border-white/50"}`}>
            <img src={resolve(img)} alt="" className="h-full w-full object-cover" onError={(e) => { e.target.src = PLACEHOLDER }} />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [lightboxProduct, setLightboxProduct] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const navigate = useNavigate()
  const API_BASE = getApiBase()

  const loadProducts = () => {
    setError(null)
    setLoading(true)
    fetch(`${API_BASE}/api/products`)
      .then((res) => { if (!res.ok) throw new Error(`Server error: ${res.status}`); return res.json() })
      .then((data) => { setProducts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch((err) => { setError(err.message || "Failed to load products."); setLoading(false) })
  }

  useEffect(() => { loadProducts() }, [API_BASE])

  const filtered = products.filter((p) => {
    if (filter === "inStock") return p.inStock === true
    if (filter === "outOfStock") return p.inStock === false
    return true
  })

  const openLightbox = (product, idx) => { setLightboxProduct(product); setLightboxIndex(idx) }
  const closeLightbox = () => setLightboxProduct(null)

  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <button onClick={() => navigate("/")}
                style={{
                  background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '10px', color: '#fff', padding: '8px 20px',
                  cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.18)', transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#334155'}
                onMouseLeave={e => e.currentTarget.style.background = '#1e293b'}
              >
                ← Back to Home
              </button>
            </div>
            <h1 style={{ fontFamily: "Georgia, serif" }} className="text-4xl sm:text-5xl font-black text-slate-900 mb-4 tracking-tight">
              Our <span className="text-[#345f9a]">Products</span>
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Browse our range of quality IT products. Click any card to view full details, images and enquiry options.
            </p>
          </motion.div>

          {/* Filter pills */}
          {!loading && !error && products.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="flex justify-center gap-3 mb-10 flex-wrap">
              {[
                { key: "all", label: "All Products", count: products.length },
                { key: "inStock", label: "In Stock", count: products.filter((p) => p.inStock).length },
                { key: "outOfStock", label: "Out Of Stock", count: products.filter((p) => !p.inStock).length },
              ].map(({ key, label, count }) => (
                <button key={key} onClick={() => setFilter(key)}
                  className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                    filter === key ? "bg-[#345f9a] text-white border-[#345f9a] shadow" : "bg-white text-slate-600 border-slate-200 hover:border-[#345f9a] hover:text-[#345f9a]"
                  }`}>
                  {label}<span className="ml-2 text-xs opacity-70">({count})</span>
                </button>
              ))}
            </motion.div>
          )}

          {loading && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
              <p className="text-slate-500 mb-6 text-sm">{error}</p>
              <button onClick={loadProducts} className="px-6 py-2 bg-[#345f9a] text-white rounded-full font-bold hover:bg-[#2a4f87] transition-colors">Retry</button>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">📦</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {products.length === 0 ? "No products yet" : "No products match this filter"}
              </h2>
              <p className="text-slate-500 text-sm mb-6">
                {products.length === 0 ? "Check back soon — new products will appear here." : "Try a different filter above."}
              </p>
              {products.length > 0 && (
                <button onClick={() => setFilter("all")} className="px-6 py-2 bg-[#345f9a] text-white rounded-full font-bold hover:bg-[#2a4f87] transition-colors">Show All</button>
              )}
            </div>
          )}

          {/* ── Compact grid ── */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={i}
                  API_BASE={API_BASE}
                  onOpenLightbox={openLightbox}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* ── Detail modal ── */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            API_BASE={API_BASE}
            onClose={() => setSelectedProduct(null)}
            onOpenLightbox={(p, i) => { setSelectedProduct(null); setTimeout(() => openLightbox(p, i), 150) }}
          />
        )}
      </AnimatePresence>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxProduct && (
          <Lightbox product={lightboxProduct} startIndex={lightboxIndex} onClose={closeLightbox} API_BASE={API_BASE} />
        )}
      </AnimatePresence>
    </div>
  )
}