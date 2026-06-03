import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiClock,
  FiSearch,
  FiRefreshCw,
} from "react-icons/fi";
import { getApiBase } from "../utils/apiBase";

export default function AdminDashboard() {

  const API_BASE = getApiBase();

  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  // Server-backed admin auth
  const [authenticated, setAuthenticated] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");


  const fetchEnquiries = async (showRefreshingState = false) => {
    try {

      if (showRefreshingState) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(`${API_BASE}/api/enquiries`, {
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
      });

      if (response.status === 401) {
        handleLogout();
        return;
      }

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

  useEffect(() => {
    if (!authenticated && !adminToken) {
      return;
    }

    fetchEnquiries();

    const intervalId = setInterval(() => {
      fetchEnquiries(true);
    }, 45000);

    return () => clearInterval(intervalId);
  }, [authenticated, adminToken]);

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
        setAuthError("");
      } else {
        const data = await res.json().catch(() => ({}));
        setAuthError(data.message || "Invalid password");
      }
    } catch (err) {
      console.log('Login error', err);
      setAuthError('Server error');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPasswordInput("");
    setAdminToken("");
    localStorage.removeItem("adminToken");
  };

  const deleteEnquiry = async (id) => {

    if (!window.confirm("Delete this enquiry?")) {
      return;
    }

    await fetch(
      `${API_BASE}/api/enquiries/${id}`,
      {
        method: "DELETE",
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
      }
    );

    fetchEnquiries(true);
  };

  const markCompleted = async (id) => {

    await fetch(
      `${API_BASE}/api/enquiries/${id}`,
      {
        method: "PUT",
        headers: adminToken ? { Authorization: `Bearer ${adminToken}` } : {},
      }
    );

    fetchEnquiries(true);
  };

  const normalizedSearch = search.trim().toLowerCase();

  const filteredEnquiries = enquiries.filter((item) => {
    const searchableText = [
      item.name,
      item.email,
      item.phone,
      item.message,
      item.status,
      Array.isArray(item.services) ? item.services.join(" ") : item.services,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearch === "" || searchableText.includes(normalizedSearch);

    if (statusFilter === "pending") return matchesSearch && item.status !== "Completed";
    if (statusFilter === "completed") return matchesSearch && item.status === "Completed";
    return matchesSearch;
  });

  const totalEnquiries = enquiries.length;

  const completedCount = enquiries.filter(
    (e) => e.status === "Completed"
  ).length;

  const pendingCount = enquiries.filter(
    (e) => e.status !== "Completed"
  ).length;

  const formatLastUpdated = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "--:--";

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
        <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
          <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/60 py-3 px-4 text-sm outline-none focus:border-cyan-500"
                placeholder="Enter admin password"
              />
            </div>

            {authError && <div className="text-sm text-rose-400">{authError}</div>}

            <div className="flex gap-3">
              <button className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold">
                Login
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 text-xs">
              <span className="text-slate-400">Reset via your registered email.</span>
              <Link to="/admin-reset" className="text-cyan-400 hover:text-cyan-300">
                Forgot password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl animate-pulse" />
      </div>

      {/* HEADER */}
      <div className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/75 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Admin workspace
            </p>

            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
              SAI INFOTECH
            </h1>

            <p className="text-sm text-slate-400">
              Admin Dashboard
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full lg:w-auto">

            {/* SEARCH */}
            <div className="relative w-full lg:w-96">

              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search enquiries..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 py-3 pl-12 pr-4 text-sm outline-none transition focus:border-cyan-500 focus:bg-slate-900"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-3 py-1 text-xs text-slate-300 transition hover:bg-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* DASHBOARD */}
      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-8">

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5">

          {[
            {
              label: "Total Enquiries",
              value: totalEnquiries,
              accent: "from-blue-500 to-cyan-400",
            },
            {
              label: "Pending",
              value: pendingCount,
              accent: "from-amber-500 to-yellow-400",
            },
            {
              label: "Completed",
              value: completedCount,
              accent: "from-emerald-500 to-green-400",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-xl backdrop-blur-sm"
            >
              <div className={`mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r ${stat.accent}`} />

              <h3 className="text-sm text-slate-400">
                {stat.label}
              </h3>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight">
                {stat.value}
              </h2>
            </motion.div>
          ))}

        </div>

        {/* STATUS TOGGLE */}
        <div className="flex gap-3 flex-wrap">
          {[
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setStatusFilter(option.value)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                statusFilter === option.value
                  ? "bg-blue-600 text-white shadow-lg"
                  : "border border-slate-700 bg-slate-900/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* ENQUIRIES */}
        <div className="grid gap-5 pb-10">

          {loading && enquiries.length === 0 && (
            <div className="grid gap-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="h-52 rounded-3xl border border-slate-800 bg-slate-900/70 animate-pulse"
                />
              ))}
            </div>
          )}

          {filteredEnquiries.length === 0 && (

            <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/60 py-20 text-center text-sm text-slate-500">
              No enquiries found
            </div>
          )}

          {filteredEnquiries.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -4 }}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl transition-all duration-300 hover:border-cyan-500/40"
            >

              {/* TOP */}
              <div className="flex flex-col gap-6 border-b border-slate-800 p-5 lg:flex-row lg:items-start lg:justify-between">

                <div className="space-y-4 flex-1">

                  {/* USER */}
                  <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-base font-semibold">
                      {item.name?.charAt(0)}
                    </div>

                    <div>

                      <h2 className="text-lg font-semibold">
                        {item.name}
                      </h2>

                      <div className="mt-1 flex flex-wrap gap-3 text-sm text-slate-400">

                        <div className="flex items-center gap-2">
                          <FiMail />
                          {item.email}
                        </div>

                        <div className="flex items-center gap-2">
                          <FiPhone />
                          {item.phone}
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* MESSAGE */}
                  <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-4">

                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                      Customer Message
                    </h3>

                    <p className="text-sm leading-6 text-slate-300">
                      {item.message}
                    </p>

                  </div>

                  {/* SERVICES */}
                  <div>

                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
                      Selected Services
                    </h3>

                    <div className="flex flex-wrap gap-2.5">

                      {(Array.isArray(item.services) ? item.services : []).map((service, index) => (

                        <span
                          key={index}
                          className="rounded-full border border-blue-500/30 bg-blue-600/20 px-3 py-1.5 text-xs text-blue-300"
                        >
                          {service}
                        </span>
                      ))}

                    </div>

                  </div>

                </div>

                {/* STATUS + ACTIONS */}
                <div className="flex flex-col gap-3 lg:w-64">

                  <div className={`rounded-2xl border p-4 ${
                    item.status === "Completed"
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-yellow-500/10 border-yellow-500/30"
                  }`}>

                    <p className="mb-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                      Status
                    </p>

                    <h3 className={`text-lg font-semibold ${
                      item.status === "Completed"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}>
                      {item.status}
                    </h3>

                  </div>

                  <button
                    onClick={() => markCompleted(item._id)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 py-3 text-sm font-medium transition-all hover:bg-green-700"
                  >
                    <FiCheckCircle size={18} />
                    Mark Completed
                  </button>

                  <button
                    onClick={() => deleteEnquiry(item._id)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 py-3 text-sm font-medium transition-all hover:bg-red-700"
                  >
                    <FiTrash2 size={18} />
                    Delete
                  </button>

                  <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-sm text-slate-400">

                    <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      <FiClock />
                      Created At
                    </div>

                    <p className="text-sm text-slate-300">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>

    </div>
  );
}