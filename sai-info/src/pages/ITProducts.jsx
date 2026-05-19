import React, { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ITProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selected, setSelected] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("No API or empty response");
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setProducts([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => (category === "all" ? true : p.category === category))
      .filter((p) => (q === "" ? true : (p.name + " " + (p.description || "")).toLowerCase().includes(q)));
  }, [products, query, category]);

  const visible = filtered.slice(0, visibleCount);

  function handleImgError(e) {
    e.currentTarget.src = "/services-orbital.png";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold">IT Products</h1>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full md:w-72 rounded-2xl border border-slate-700 bg-slate-800/60 py-2 px-4 text-sm outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-2xl border border-slate-700 bg-slate-800/60 py-2 px-3 text-sm"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All" : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md border border-rose-500/20 bg-rose-900/30 p-3 text-sm text-rose-200">
            Could not load products from API ({error}).
          </div>
        )}

        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-700 p-12 text-center text-slate-400">
            No products match your search.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {visible.map((p) => (
                <div key={p._id} className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900">
                  <div className="h-44 w-full bg-slate-700">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      onError={handleImgError}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="p-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      {p.category && <div className="mt-1 text-xs text-slate-400">{p.category}</div>}
                      {p.price && <div className="mt-2 text-lg font-bold text-sky-400">₹{parseInt(p.price).toLocaleString()}</div>}
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => setSelected(p)}
                        className="rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-3 py-2 text-sm font-semibold"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setVisibleCount((v) => v + 6)}
                  className="rounded-2xl bg-slate-800/60 border border-slate-700 px-6 py-3"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="max-w-3xl w-full max-h-[90vh] rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col">
              <div className="relative h-80 bg-black flex-shrink-0">
                {(() => {
                  const images = Array.isArray(selected.images) ? selected.images : (selected.image ? [selected.image] : []);
                  const currentImage = images[selectedImageIndex] || selected.image;
                  const hasMultiple = images.length > 1;

                  return (
                    <>
                      <img
                        src={currentImage}
                        alt={selected.name}
                        onError={handleImgError}
                        className="object-cover w-full h-full"
                      />

                      {/* Image counter */}
                      {hasMultiple && (
                        <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg px-3 py-1 text-sm text-slate-300">
                          {selectedImageIndex + 1} / {images.length}
                        </div>
                      )}

                      {/* Previous button */}
                      {hasMultiple && (
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 p-2 text-white transition"
                        >
                          <FiChevronLeft size={24} />
                        </button>
                      )}

                      {/* Next button */}
                      {hasMultiple && (
                        <button
                          onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 hover:bg-black/70 p-2 text-white transition"
                        >
                          <FiChevronRight size={24} />
                        </button>
                      )}

                      {/* Close button */}
                      <button
                        onClick={() => {
                          setSelected(null);
                          setSelectedImageIndex(0);
                        }}
                        className="absolute top-4 right-4 rounded-full bg-black/40 px-3 py-2"
                      >
                        Close
                      </button>
                    </>
                  );
                })()}
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <h2 className="text-2xl font-bold mb-2">{selected.name}</h2>
                {selected.category && <div className="mb-2 text-sm text-slate-400">{selected.category}</div>}
                {selected.price && <div className="mb-4 text-3xl font-bold text-sky-400">₹{parseInt(selected.price).toLocaleString()}</div>}
                <p className="text-slate-300 mb-4">{selected.description || "No description provided."}</p>

                {/* Thumbnail gallery */}
                {(() => {
                  const images = Array.isArray(selected.images) ? selected.images : (selected.image ? [selected.image] : []);
                  if (images.length > 1) {
                    return (
                      <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                        {images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedImageIndex(idx)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                              selectedImageIndex === idx ? "border-sky-500" : "border-slate-600"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${selected.name} ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={handleImgError}
                            />
                          </button>
                        ))}
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>

              <div className="border-t border-slate-700 bg-slate-800/50 p-6 flex gap-3 flex-shrink-0">
                <a
                  href={`https://api.whatsapp.com/send?phone=919945981999&text=Hi, I'm interested in ${encodeURIComponent(selected.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2 text-sm font-semibold"
                >
                  Enquire on WhatsApp
                </a>

                <button
                  onClick={() => {
                    setSelected(null);
                    setSelectedImageIndex(0);
                  }}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
