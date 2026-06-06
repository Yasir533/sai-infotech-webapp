import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { getApiBase } from "../utils/apiBase"

const PLACEHOLDER = "https://placehold.co/600x400/e2e8f0/94a3b8?text=No+Image"

// ── Card skeleton shown while loading ─────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-64 bg-slate-200" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-5/6" />
        <div className="h-6 bg-slate-200 rounded-full w-24" />
        <div className="h-5 bg-slate-200 rounded w-20" />
        <div className="border-t pt-4 space-y-2">
          <div className="h-4 bg-slate-100 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  )
}

// ── Single product card ────────────────────────────────────────────────────────
function ProductCard({ product, index, API_BASE }) {
  const [imgSrc, setImgSrc] = useState(
    product.images?.[0] ? `${API_BASE}${product.images[0]}` : PLACEHOLDER
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(PLACEHOLDER)}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Stock badge overlay */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow ${
            product.inStock
              ? "bg-green-100 text-green-700 border border-green-200"
              : "bg-red-100 text-red-700 border border-red-200"
          }`}
        >
          {product.inStock ? "In Stock" : "Out Of Stock"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-slate-900 leading-snug">
          {product.name}
        </h3>

        <p className="text-slate-500 text-sm mb-4 flex-1 leading-relaxed">
          {product.description || "No description available."}
        </p>

        <p
          style={{ fontFamily: "Georgia, serif" }}
          className="text-2xl font-black text-[#345f9a] mb-4"
        >
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

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

// ── Main Products page ─────────────────────────────────────────────────────────
export default function Products() {
  const [products, setProducts] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [filter,   setFilter]   = useState("all") // "all" | "inStock" | "outOfStock"

  const API_BASE = getApiBase()

  useEffect(() => {
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
  }, [API_BASE])

  // Filter logic
  const filtered = products.filter((p) => {
    if (filter === "inStock")    return p.inStock === true
    if (filter === "outOfStock") return p.inStock === false
    return true
  })

  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            {/* Breadcrumb */}
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
              Browse our range of quality IT products. Contact us for pricing, availability, or bulk orders.
            </p>
          </motion.div>

          {/* ── Filter pills (only when products loaded) ── */}
          {!loading && !error && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center gap-3 mb-10 flex-wrap"
            >
              {[
                { key: "all",        label: "All Products" },
                { key: "inStock",    label: "In Stock" },
                { key: "outOfStock", label: "Out Of Stock" },
              ].map(({ key, label }) => (
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
                  {key === "all" && (
                    <span className="ml-2 bg-white/20 text-current rounded-full px-2 py-0.5 text-xs">
                      {products.length}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          )}

          {/* ── Loading skeletons ── */}
          {loading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* ── Error state ── */}
          {!loading && error && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Something went wrong</h2>
              <p className="text-slate-500 mb-6 text-sm">{error}</p>
              <button
                onClick={() => { setError(null); setLoading(true); }}
                className="px-6 py-2 bg-[#345f9a] text-white rounded-full font-bold hover:bg-[#2a4f87] transition-colors"
              >
                Retry
              </button>
            </div>
          )}

          {/* ── Empty state ── */}
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

          {/* ── Product grid ── */}
          {!loading && !error && filtered.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={i}
                  API_BASE={API_BASE}
                />
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  )
}