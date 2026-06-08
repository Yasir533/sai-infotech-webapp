import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoIcon from "../assets/logo.png";
import {
  FiTrash2,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiClock,
  FiSearch,
  FiRefreshCw,
  FiUpload,
  FiEye,
  FiEyeOff,
  FiPackage,
  FiX,
  FiImage,
  FiChevronLeft,
  FiChevronRight,
  FiLogOut,
} from "react-icons/fi";
import { getApiBase } from "../utils/apiBase";
import imageCompression from "browser-image-compression";

const MAX_IMAGES = 15;

export default function AdminDashboard() {
  const API_BASE = getApiBase();

  function resolveImg(src) {
    if (!src) return "";
    if (src.startsWith("/uploads/")) return `${API_BASE}${src}`;
    return src;
  }

  // ── Auth ────────────────────────────────────────────────────────────────────
  const [authenticated, setAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState(
    () => localStorage.getItem("adminToken") || ""
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  // ── Enquiries ───────────────────────────────────────────────────────────────
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // ── Products ────────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("enquiries");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]); // File[]
  const [imagePreviews, setImagePreviews] = useState([]); // string[] (object URLs)
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState("");
  // Gallery modal
  const [galleryProduct, setGalleryProduct] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const fileInputRef = useRef(null);

  // ── Fetch helpers ────────────────────────────────────────────────────────────
  const fetchEnquiries = async (showRefreshingState = false) => {
    try {
      if (showRefreshingState) setRefreshing(true);
      else setLoading(true);

      const response = await fetch(`${API_BASE}/api/enquiries`, {
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
      });

      if (response.status === 401) { handleLogout(); return; }

      const data = await response.json();
      setEnquiries(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const response = await fetch(`${API_BASE}/api/products`);
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    if (!authenticated && !adminToken) return;
    fetchEnquiries();
    fetchProducts();
    const intervalId = setInterval(() => fetchEnquiries(true), 45000);
    return () => clearInterval(intervalId);
  }, [authenticated, adminToken]);

  // ── Auth handlers ────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setAuthError("");
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.token) {
          localStorage.setItem("adminToken", data.token);
          setAdminToken(data.token);
        }
        setAuthenticated(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setAuthError(data.message || "Invalid password");
      }
    } catch (err) {
      setAuthError("Server error");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPasswordInput("");
    setAdminToken("");
    localStorage.removeItem("adminToken");
  };

  // ── Enquiry handlers ──────────────────────────────────────────────────────────
  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    await fetch(`${API_BASE}/api/enquiries/${id}`, {
      method: "DELETE",
      headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
    });
    fetchEnquiries(true);
  };

  const markCompleted = async (id) => {
    await fetch(`${API_BASE}/api/enquiries/${id}`, {
      method: "PUT",
      headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
    });
    fetchEnquiries(true);
  };

  // ── Product image selection ───────────────────────────────────────────────────
  const handleProductImagesChange = (e) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    setProductImages((cur) => {
      const merged = [...cur, ...selected].slice(0, MAX_IMAGES);
      // Build previews for merged list
      setImagePreviews((prevPreviews) => {
        // Revoke old URLs to avoid memory leaks
        prevPreviews.forEach((url) => URL.revokeObjectURL(url));
        return merged.map((f) => URL.createObjectURL(f));
      });
      return merged;
    });

    e.target.value = "";
  };

  const removeImage = (index) => {
    setProductImages((cur) => {
      const next = cur.filter((_, i) => i !== index);
      setImagePreviews((prevPreviews) => {
        URL.revokeObjectURL(prevPreviews[index]);
        return next.map((f) => URL.createObjectURL(f));
      });
      return next;
    });
  };

  // ── Product upload ────────────────────────────────────────────────────────────
  const uploadProduct = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      setUploadMessage("Please enter a product name.");
      setUploadSuccess(false);
      return;
    }
    if (!productDescription.trim()) {
      setUploadMessage("Please enter a product description.");
      setUploadSuccess(false);
      return;
    }
    if (productImages.length === 0) {
      setUploadMessage("Please select at least one image.");
      setUploadSuccess(false);
      return;
    }
    if (productImages.length > MAX_IMAGES) {
      setUploadMessage(`Maximum ${MAX_IMAGES} images allowed.`);
      setUploadSuccess(false);
      return;
    }

    try {
      setUploading(true);
      setUploadMessage("Compressing images…");

      const compressionOptions = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1400,
        useWebWorker: true,
      };

      const compressedImages = await Promise.all(
        productImages.map(async (image) => {
          try {
            return await imageCompression(image, compressionOptions);
          } catch {
            return image;
          }
        })
      );

      setUploadMessage("Uploading…");

      const formData = new FormData();
      formData.append("name", productName.trim());
      formData.append("description", productDescription.trim());
      // category and price left as defaults (empty string) since not required
      compressedImages.forEach((img) => formData.append("images", img));

      const res = await fetch(`${API_BASE}/api/products`, {
        method: "POST",
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadMessage("✓ Product uploaded successfully!");
        setUploadSuccess(true);
        setProductName("");
        setProductDescription("");
        setImagePreviews((prev) => {
          prev.forEach((url) => URL.revokeObjectURL(url));
          return [];
        });
        setProductImages([]);
        fetchProducts();
        setTimeout(() => { setUploadMessage(""); setUploadSuccess(false); }, 4000);
      } else {
        setUploadMessage("Error: " + (data.message || "Upload failed."));
        setUploadSuccess(false);
      }
    } catch (error) {
      setUploadMessage("Error uploading product.");
      setUploadSuccess(false);
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  // ── Product delete ────────────────────────────────────────────────────────────
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      setDeletingProductId(id);
      const response = await fetch(`${API_BASE}/api/products/${id}`, {
        method: "DELETE",
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
      });
      const raw = await response.text();
      let data = {};
      try { data = raw ? JSON.parse(raw) : {}; } catch { data = { message: raw }; }

      if (response.ok) {
        setUploadMessage("✓ Product deleted.");
        setUploadSuccess(true);
        fetchProducts();
        setTimeout(() => { setUploadMessage(""); setUploadSuccess(false); }, 3000);
      } else {
        setUploadMessage("Error: " + (data.message || `HTTP ${response.status}`));
        setUploadSuccess(false);
      }
    } catch (error) {
      setUploadMessage("Error deleting product.");
      setUploadSuccess(false);
    } finally {
      setDeletingProductId("");
    }
  };

  // ── Enquiry filters ──────────────────────────────────────────────────────────
  const normalizedSearch = search.trim().toLowerCase();
  const filteredEnquiries = enquiries.filter((item) => {
    const text = [item.name, item.email, item.phone, item.message, item.status,
      Array.isArray(item.services) ? item.services.join(" ") : item.services]
      .filter(Boolean).join(" ").toLowerCase();
    const matches = normalizedSearch === "" || text.includes(normalizedSearch);
    if (statusFilter === "pending") return matches && item.status !== "Completed";
    if (statusFilter === "completed") return matches && item.status === "Completed";
    return matches;
  });

  const totalEnquiries = enquiries.length;
  const completedCount = enquiries.filter((e) => e.status === "Completed").length;
  const pendingCount = enquiries.filter((e) => e.status !== "Completed").length;

  // ── Image requirement indicator ───────────────────────────────────────────────
  const imageCount = productImages.length;
  const imageFillPct = Math.min((imageCount / MAX_IMAGES) * 100, 100);
  const imageStatusColor = imageCount === 0 ? "bg-slate-200" : "bg-emerald-500";

  // ── LOGIN SCREEN ─────────────────────────────────────────────────────────────
  if (!authenticated) {
    return (
      <div className="gradient-bg min-h-screen flex items-center justify-center relative overflow-hidden px-4 text-slate-900">
        <div className="w-full max-w-sm rounded-[2rem] border border-slate-200/50 bg-white/85 backdrop-blur-xl p-8 shadow-[0_20px_50px_rgba(15,23,42,0.12)] z-10 flex flex-col items-center">
          <Link to="/" className="flex flex-col items-center gap-2 group mb-6">
            <img src={logoIcon} alt="SAI INFOTECH" className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="text-center leading-none">
              <div style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem" }} className="text-slate-900 font-black tracking-[0.16em]">
                SAI<span className="text-[#345f9a]"> INFOTECH</span>
              </div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem" }} className="text-slate-600 tracking-[0.25em] uppercase mt-1.5 font-bold">
                Technology Services
              </div>
            </div>
          </Link>

          <h2 className="text-xl font-semibold mb-4 text-slate-900 self-start">Admin Login</h2>

          <form onSubmit={handleLogin} className="space-y-4 w-full">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-sm text-slate-900 outline-none focus:border-cyan-500"
                  placeholder="Enter admin password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {authError && <div className="text-sm text-rose-500">{authError}</div>}

            <div className="flex gap-3">
              <button className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-3.5 text-sm font-semibold text-white transition hover:brightness-110">
                Login
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-slate-500">Reset via your registered email.</span>
              <Link to="/admin-reset" className="text-cyan-600 hover:text-cyan-500">Forgot password?</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen overflow-hidden gradient-bg text-slate-900">

      {/* HEADER */}
      <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
              <img src={logoIcon} alt="SAI INFOTECH" className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="leading-none">
                <div style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem" }} className="text-slate-900 sm:text-xl font-black tracking-[0.16em]">
                  SAI<span className="text-[#345f9a]"> INFOTECH</span>
                </div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "0.65rem" }} className="text-slate-600 tracking-[0.32em] uppercase mt-1 font-bold">
                  Technology Services
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-1.5 font-semibold">
                  Admin Dashboard
                </div>
              </div>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">
            {/* Search (visible in enquiries tab) */}
            {activeTab === "enquiries" && (
              <div className="relative w-full lg:w-96">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search enquiries…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-cyan-500"
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs text-slate-500 hover:bg-slate-100">
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-red-300 hover:text-red-500 flex-shrink-0"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { label: "Total Enquiries", value: totalEnquiries, accent: "from-blue-500 to-cyan-400" },
            { label: "Pending", value: pendingCount, accent: "from-amber-500 to-yellow-400" },
            { label: "Completed", value: completedCount, accent: "from-emerald-500 to-green-400" },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_14px_34px_rgba(15,23,42,0.06)]">
              <div className={`mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r ${stat.accent}`} />
              <h3 className="text-sm text-slate-500">{stat.label}</h3>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{stat.value}</h2>
            </motion.div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-3 flex-wrap border-b border-slate-200 pb-4">
          {[
            { id: "enquiries", label: "Enquiries" },
            { id: "products", label: "Products" },
          ].map(({ id, label }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`px-4 py-2 font-medium transition-all ${
                activeTab === id
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-slate-500 hover:text-slate-700"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════════════
            ENQUIRIES TAB
        ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "enquiries" && (
          <>
            <div className="flex gap-3 flex-wrap">
              {[{ label: "All", value: "all" }, { label: "Pending", value: "pending" }, { label: "Completed", value: "completed" }].map((option) => (
                <button key={option.value} onClick={() => setStatusFilter(option.value)}
                  className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                    statusFilter === option.value
                      ? "bg-blue-600 text-white shadow-lg"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}>
                  {option.label}
                </button>
              ))}
            </div>

            <div className="grid gap-5 pb-10">
              {loading && enquiries.length === 0 && (
                <div className="grid gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-52 rounded-3xl border border-slate-200 bg-slate-50 animate-pulse" />
                  ))}
                </div>
              )}

              {filteredEnquiries.length === 0 && !loading && (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center text-sm text-slate-500">
                  No enquiries found
                </div>
              )}

              {filteredEnquiries.map((item) => (
                <motion.div key={item._id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }} whileHover={{ y: -4 }}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-cyan-300">
                  <div className="flex flex-col gap-6 border-b border-slate-200 p-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-base font-semibold text-white">
                          {item.name?.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">{item.name}</h2>
                          <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-500">
                            <div className="flex items-center gap-2"><FiMail />{item.email}</div>
                            <div className="flex items-center gap-2"><FiPhone />{item.phone}</div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">Customer Message</h3>
                        <p className="text-sm leading-6 text-slate-700">{item.message}</p>
                      </div>
                      <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">Selected Services</h3>
                        <div className="flex flex-wrap gap-2.5">
                          {(Array.isArray(item.services) ? item.services : []).map((s, i) => (
                            <span key={i} className="rounded-full border border-blue-500/30 bg-blue-600/20 px-3 py-1.5 text-xs text-blue-600">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:w-64">
                      <div className={`rounded-2xl border p-4 ${item.status === "Completed" ? "bg-green-500/10 border-green-500/30" : "bg-yellow-500/10 border-yellow-500/30"}`}>
                        <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
                        <h3 className={`text-lg font-semibold ${item.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>{item.status}</h3>
                      </div>
                      <button onClick={() => markCompleted(item._id)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 text-sm font-medium text-white transition-all hover:bg-green-700">
                        <FiCheckCircle size={18} /> Mark Completed
                      </button>
                      <button onClick={() => deleteEnquiry(item._id)}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 text-sm font-medium text-white transition-all hover:bg-red-700">
                        <FiTrash2 size={18} /> Delete
                      </button>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                        <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                          <FiClock /> Created At
                        </div>
                        <p className="text-sm text-slate-700">{new Date(item.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════════════════
            PRODUCTS TAB
        ═══════════════════════════════════════════════════════════════════════ */}
        {activeTab === "products" && (
          <div className="grid lg:grid-cols-2 gap-10 pb-10">

            {/* ── LEFT: Upload Form ─────────────────────────────────────────── */}
            <div>
              <div className="rounded-3xl border border-slate-200 bg-white shadow-[0_14px_34px_rgba(15,23,42,0.06)] overflow-hidden">
                {/* Form header */}
                <div className="px-6 pt-6 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500">
                      <FiUpload className="text-white" size={18} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">Add New Product</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Fill in details and upload up to {MAX_IMAGES} photos</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={uploadProduct} className="p-6 space-y-5">

                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="e.g. Dell OptiPlex 7090"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      placeholder="Describe the product — specs, condition, key features…"
                      rows={4}
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white resize-none leading-relaxed"
                    />
                  </div>

                  {/* Image Upload */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-semibold text-slate-700">
                        Product Images <span className="text-red-500">*</span>
                      </label>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        imageCount === 0 ? "bg-slate-100 text-slate-500"
                        : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {imageCount} / {MAX_IMAGES}
                      </span>
                    </div>

                    {/* Requirement bar */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${imageStatusColor}`}
                          style={{ width: `${imageFillPct}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        Max {MAX_IMAGES}
                      </span>
                    </div>

                    {imageCount >= 1 && imageCount <= MAX_IMAGES && (
                      <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 mb-3">
                        <FiCheckCircle size={14} className="flex-shrink-0" />
                        {imageCount === MAX_IMAGES ? "Maximum reached." : `${imageCount} selected. You can add ${MAX_IMAGES - imageCount} more.`}
                      </div>
                    )}

                    {/* Drop zone / button */}
                    {imageCount < MAX_IMAGES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-8 flex flex-col items-center gap-2 text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500"
                      >
                        <FiImage size={28} />
                        <span className="text-sm font-medium">Click to add photos</span>
                        <span className="text-xs">JPG, PNG, WEBP · Up to {MAX_IMAGES - imageCount} more</span>
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleProductImagesChange}
                    />

                    {/* Previews grid */}
                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-3">
                        {imagePreviews.map((src, i) => (
                          <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                            <img src={src} alt="" className="h-full w-full object-cover" />
                            {/* Order badge */}
                            <div className="absolute top-1 left-1 bg-black/60 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                              {i + 1}
                            </div>
                            {/* Remove btn */}
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <FiX className="text-white" size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Status message */}
                  <AnimatePresence>
                    {uploadMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                          uploadSuccess
                            ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                            : "bg-rose-50 border border-rose-200 text-rose-600"
                        }`}
                      >
                        {uploadMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={uploading}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {uploading ? (
                      <>
                        <FiRefreshCw size={16} className="animate-spin" />
                        {uploadMessage || "Processing…"}
                      </>
                    ) : (
                      <>
                        <FiUpload size={16} />
                        Upload Product
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* ── RIGHT: Product List ────────────────────────────────────────── */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  All Products
                  <span className="ml-2 text-sm font-normal text-slate-500">({products.length})</span>
                </h2>
                <button
                  onClick={fetchProducts}
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition-colors"
                >
                  <FiRefreshCw size={13} className={productsLoading ? "animate-spin" : ""} />
                  Refresh
                </button>
              </div>

              {productsLoading && products.length === 0 && (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-28 rounded-3xl border border-slate-200 bg-slate-100 animate-pulse" />
                  ))}
                </div>
              )}

              {!productsLoading && products.length === 0 && (
                <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center">
                  <FiPackage className="mx-auto mb-3 text-slate-300" size={40} />
                  <p className="text-sm text-slate-500">No products yet. Add your first one!</p>
                </div>
              )}

              <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-1">
                {products.map((product, idx) => {
                  const firstImg = product.images?.[0]
                    ? resolveImg(product.images[0])
                    : null;
                  const imgCount = product.images?.length ?? 0;

                  return (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.04 }}
                      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300 transition-colors"
                    >
                      {/* Thumbnail (clickable for gallery) */}
                      <div
                        className="relative flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden bg-slate-100 cursor-pointer group"
                        onClick={() => { setGalleryProduct(product); setGalleryIndex(0); }}
                      >
                        {firstImg ? (
                          <img src={firstImg} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <FiImage className="text-slate-300" size={24} />
                          </div>
                        )}
                        {imgCount > 1 && (
                          <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] font-bold rounded-full px-1.5 py-0.5">
                            +{imgCount - 1}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug truncate">{product.name}</h3>
                        {product.description && (
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-slate-400">{imgCount} photo{imgCount !== 1 ? "s" : ""}</span>
                          <button
                            onClick={() => { setGalleryProduct(product); setGalleryIndex(0); }}
                            className="text-xs text-blue-500 hover:text-blue-700 transition-colors underline underline-offset-2"
                          >
                            View all
                          </button>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => deleteProduct(product._id)}
                        disabled={deletingProductId === product._id}
                        className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                      >
                        {deletingProductId === product._id
                          ? <FiRefreshCw size={14} className="animate-spin" />
                          : <FiTrash2 size={14} />}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── IMAGE GALLERY MODAL ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {galleryProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={() => setGalleryProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gallery header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900">{galleryProduct.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{galleryProduct.images?.length} images</p>
                </div>
                <button onClick={() => setGalleryProduct(null)}
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 text-slate-500 hover:bg-slate-100 transition">
                  <FiX size={18} />
                </button>
              </div>

              {/* Main image */}
              <div className="relative bg-slate-100" style={{ height: "360px" }}>
                {galleryProduct.images?.[galleryIndex] && (
                  <img
                    src={resolveImg(galleryProduct.images[galleryIndex])}
                    alt={`${galleryProduct.name} ${galleryIndex + 1}`}
                    className="h-full w-full object-contain"
                  />
                )}
                {/* Prev */}
                {galleryIndex > 0 && (
                  <button
                    onClick={() => setGalleryIndex((i) => i - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white shadow transition"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                )}
                {/* Next */}
                {galleryIndex < (galleryProduct.images?.length ?? 0) - 1 && (
                  <button
                    onClick={() => setGalleryIndex((i) => i + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-white shadow transition"
                  >
                    <FiChevronRight size={20} />
                  </button>
                )}
                {/* Counter */}
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold rounded-full px-2.5 py-1">
                  {galleryIndex + 1} / {galleryProduct.images?.length}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 p-4 overflow-x-auto">
                {galleryProduct.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`flex-shrink-0 h-14 w-14 rounded-xl overflow-hidden border-2 transition ${
                      i === galleryIndex ? "border-blue-500" : "border-transparent"
                    }`}
                  >
                    <img src={resolveImg(img)} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
