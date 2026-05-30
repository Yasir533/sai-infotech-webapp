import React, { useEffect, useMemo, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getApiBase } from "../utils/apiBase";

export default function ITProducts() {
  const API_BASE = getApiBase();

  // Resolve relative /uploads/ paths to full URL for the current device
  function resolveImg(src) {
    if (!src) return "/services-orbital.png";
    if (src.startsWith("/uploads/")) return `${API_BASE}${src}`;
    return src;
  }

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const [selected, setSelected] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${getApiBase()}/api/products`);

        if (!res.ok) {
          throw new Error("No API or empty response");
        }

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
    const set = new Set(
      products.map((p) => p.category).filter(Boolean)
    );

    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return products
      .filter((p) =>
        category === "all" ? true : p.category === category
      )
      .filter((p) =>
        q === ""
          ? true
          : (p.name + " " + (p.description || ""))
              .toLowerCase()
              .includes(q)
      );
  }, [products, query, category]);

  const visible = filtered.slice(0, visibleCount);

  function handleImgError(e) {
    e.currentTarget.src = "/services-orbital.png";
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <h1 className="text-3xl font-bold">
            IT Products
          </h1>

          <div className="flex items-center gap-3 w-full md:w-auto">

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="
                w-full
                md:w-72
                rounded-2xl
                border
                border-slate-700
                bg-slate-800/60
                py-2
                px-4
                text-sm
                outline-none
              "
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="
                rounded-2xl
                border
                border-slate-700
                bg-slate-800/60
                py-2
                px-3
                text-sm
              "
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All" : c}
                </option>
              ))}
            </select>

          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div
            className="
              mb-4
              rounded-md
              border
              border-rose-500/20
              bg-rose-900/30
              p-3
              text-sm
              text-rose-200
            "
          >
            Could not load products from API ({error}).
          </div>
        )}

        {/* LOADING */}
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 rounded-lg bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (

          <div
            className="
              rounded-lg
              border
              border-dashed
              border-slate-700
              p-12
              text-center
              text-slate-400
            "
          >
            No products match your search.
          </div>

        ) : (
          <>
            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

              {visible.map((p) => (

                <div
                  key={p._id}
                  className="
                    rounded-2xl
                    border
                    border-slate-800
                    overflow-hidden
                    bg-slate-900
                  "
                >
                  {/* PRODUCT IMAGE */}
                  <div className="h-44 w-full bg-slate-700">
                    <img
                      src={resolveImg(p.image)}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      onError={handleImgError}
                      style={{
                        transform: "translate3d(0,0,0)",
                        WebkitBackfaceVisibility: "hidden",
                        backfaceVisibility: "hidden",
                      }}
                      className="
                        object-cover
                        w-full
                        h-full
                        will-change-transform
                      "
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex items-start justify-between gap-3">

                    <div>
                      <h3 className="font-semibold">
                        {p.name}
                      </h3>

                      {p.category && (
                        <div className="mt-1 text-xs text-slate-400">
                          {p.category}
                        </div>
                      )}

                      {p.price && (
                        <div className="mt-2 text-lg font-bold text-sky-400">
                          ₹{parseInt(p.price).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setSelected(p);
                        setSelectedImageIndex(0);
                      }}
                      className="
                        rounded-xl
                        bg-gradient-to-r
                        from-sky-500
                        to-blue-600
                        px-3
                        py-2
                        text-sm
                        font-semibold
                      "
                    >
                      View
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE */}
            {visibleCount < filtered.length && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() =>
                    setVisibleCount((v) => v + 6)
                  }
                  className="
                    rounded-2xl
                    bg-slate-800/60
                    border
                    border-slate-700
                    px-6
                    py-3
                  "
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}

        {/* MODAL */}
        {selected && (
          <div
            className="
              fixed
              inset-0
              z-50
              bg-black/90
              flex
              items-start
              md:items-center
              justify-center
              p-2
              md:p-4
              overflow-y-auto
            "
          >
            <div
              className="
                w-full
                max-w-7xl
                my-2
                md:my-0
                md:h-[88vh]
                bg-[#071426]
                rounded-3xl
                border
                border-slate-700
                md:overflow-hidden
                flex
                flex-col
                md:flex-row
              "
            >
              {(() => {
                const images = Array.isArray(selected.images)
                  ? selected.images
                  : selected.image
                  ? [selected.image]
                  : [];

                const currentImage = resolveImg(
                  images[selectedImageIndex] || selected.image
                );

                const hasMultiple = images.length > 1;

                return (
                  <>
                    {/* LEFT SIDE */}
                    <div
                      className="
                        w-full
                        md:w-[55%]
                        bg-black
                        flex
                        flex-col
                        border-b
                        md:border-b-0
                        md:border-r
                        border-slate-800
                      "
                    >
                      {/* MAIN IMAGE */}
                      <div
                        className="
                          relative
                          h-[260px]
                          md:flex-1
                          bg-black
                          flex
                          items-center
                          justify-center
                          overflow-hidden
                        "
                      >
                        <img
                          src={currentImage}
                          alt={selected.name}
                          onError={handleImgError}
                          loading="eager"
                          decoding="async"
                          draggable="false"
                          style={{
                            transform: "translate3d(0,0,0)",
                            WebkitBackfaceVisibility: "hidden",
                            backfaceVisibility: "hidden",
                            WebkitPerspective: 1000,
                          }}
                          className="
                            w-full
                            h-full
                            object-cover
                            md:object-contain
                            select-none
                            pointer-events-none
                            will-change-transform
                          "
                        />

                        {/* COUNTER */}
                        {hasMultiple && (
                          <div
                            className="
                              absolute
                              bottom-4
                              left-4
                              bg-black/70
                              text-white
                              px-3
                              py-1
                              rounded-lg
                              text-sm
                            "
                          >
                            {selectedImageIndex + 1} / {images.length}
                          </div>
                        )}

                        {/* PREVIOUS */}
                        {hasMultiple && (
                          <button
                            onClick={() =>
                              setSelectedImageIndex((prev) =>
                                prev === 0
                                  ? images.length - 1
                                  : prev - 1
                              )
                            }
                            className="
                              absolute
                              left-3
                              top-1/2
                              -translate-y-1/2
                              bg-black/70
                              p-3
                              rounded-full
                            "
                          >
                            <FiChevronLeft size={24} />
                          </button>
                        )}

                        {/* NEXT */}
                        {hasMultiple && (
                          <button
                            onClick={() =>
                              setSelectedImageIndex((prev) =>
                                prev === images.length - 1
                                  ? 0
                                  : prev + 1
                              )
                            }
                            className="
                              absolute
                              right-3
                              top-1/2
                              -translate-y-1/2
                              bg-black/70
                              p-3
                              rounded-full
                            "
                          >
                            <FiChevronRight size={24} />
                          </button>
                        )}

                        {/* CLOSE */}
                        <button
                          onClick={() => {
                            setSelected(null);
                            setSelectedImageIndex(0);
                          }}
                          className="
                            absolute
                            top-4
                            right-4
                            bg-black/70
                            px-4
                            py-2
                            rounded-xl
                            text-sm
                          "
                        >
                          Close
                        </button>
                      </div>

                      {/* THUMBNAILS */}
                      {hasMultiple && (
                        <div
                          className="
                            p-4
                            border-t
                            border-slate-800
                            bg-[#08111f]
                          "
                        >
                          <div className="flex gap-3 overflow-x-auto">

                            {images.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() =>
                                  setSelectedImageIndex(idx)
                                }
                                className={`
                                  flex-shrink-0
                                  w-20
                                  h-20
                                  rounded-xl
                                  overflow-hidden
                                  border-2
                                  ${
                                    selectedImageIndex === idx
                                      ? "border-sky-500"
                                      : "border-slate-700"
                                  }
                                `}
                              >
                                <img
                                  src={resolveImg(img)}
                                  alt={`${selected.name}-${idx}`}
                                  className="
                                    w-full
                                    h-full
                                    object-cover
                                    will-change-transform
                                  "
                                  onError={handleImgError}
                                  loading="eager"
                                  decoding="async"
                                  draggable="false"
                                  style={{
                                    transform: "translate3d(0,0,0)",
                                    WebkitBackfaceVisibility: "hidden",
                                    backfaceVisibility: "hidden",
                                  }}
                                />
                              </button>
                            ))}

                          </div>
                        </div>
                      )}
                    </div>

                    {/* RIGHT SIDE */}
                    <div
                      className="
                        w-full
                        md:w-[45%]
                        flex
                        flex-col
                        bg-[#08111f]
                      "
                    >
                      {/* CONTENT */}
                      <div className="flex-1 overflow-y-auto p-5 md:p-8">

                        <div className="mb-4">
                          <h2
                            className="
                              text-3xl
                              md:text-4xl
                              font-black
                              text-white
                              leading-tight
                            "
                          >
                            {selected.name}
                          </h2>

                          {selected.category && (
                            <div
                              className="
                                mt-2
                                inline-flex
                                rounded-full
                                border
                                border-slate-700
                                bg-slate-800/60
                                px-4
                                py-1
                                text-sm
                                text-slate-300
                              "
                            >
                              {selected.category}
                            </div>
                          )}
                        </div>

                        {/* PRICE */}
                        {selected.price && (
                          <div
                            className="
                              mb-6
                              text-4xl
                              md:text-5xl
                              font-black
                              text-sky-400
                            "
                          >
                            ₹
                            {parseInt(
                              selected.price
                            ).toLocaleString()}
                          </div>
                        )}

                        {/* DESCRIPTION */}
                        <div
                          className="
                            space-y-4
                            text-slate-300
                            leading-relaxed
                            text-[15px]
                            md:text-base
                          "
                        >
                          <p>
                            {selected.description ||
                              "No description available for this product."}
                          </p>
                        </div>

                        {/* HIGHLIGHTS */}
                        <div className="mt-8">

                          <div
                            className="
                              rounded-2xl
                              border
                              border-slate-800
                              bg-slate-900/40
                              p-4
                            "
                          >
                            <h4 className="text-white font-semibold mb-2">
                              Product Highlights
                            </h4>

                            <ul className="space-y-2 text-sm text-slate-300">
                              <li>✓ Quality Checked Product</li>
                              <li>✓ Best Performance</li>
                              <li>✓ Affordable Pricing</li>
                              <li>✓ Company Verified Product</li>
                            </ul>
                          </div>

                        </div>
                      </div>

                      {/* BUTTONS */}
                      <div
                        className="
                          border-t
                          border-slate-800
                          p-5
                          bg-[#091523]
                          flex
                          flex-col
                          sm:flex-row
                          gap-3
                        "
                      >
                        <a
                          href={`https://api.whatsapp.com/send?phone=918310338544&text=Hi, I'm interested in ${encodeURIComponent(
                            selected.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex-1
                            rounded-2xl
                            bg-gradient-to-r
                            from-emerald-500
                            to-green-600
                            px-5
                            py-3
                            text-center
                            font-semibold
                          "
                        >
                          Enquire on WhatsApp
                        </a>

                        <button
                          onClick={() => {
                            setSelected(null);
                            setSelectedImageIndex(0);
                          }}
                          className="
                            rounded-2xl
                            border
                            border-slate-700
                            px-5
                            py-3
                          "
                        >
                          Close
                        </button>
                      </div>

                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}