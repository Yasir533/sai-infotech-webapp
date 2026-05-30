import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
  FiCheck,
} from 'react-icons/fi'
import { getApiBase } from '../utils/apiBase'

const SERVICE_OPTIONS = [
  'IT Solution (Sales/Rentals)',
  'AMS (Annual Maintenance Services)',
  'Laptop and Notebook Repair Solutions',
  'Desktop & Laptop Motherboard Specialists',
  'Data Recovery & Back-up Specialists',
  "PC's / Servers / Networking",
  'CCTV Installation & Maintenance',
  'Audio Visual Solutions',
  'Wind Power Control Systems',
]

const contactInfo = [
  {
    icon: FiMapPin,
    title: 'Regd. & Corp. Office',
    lines: [
      '#9, 1st Main, Ground Floor, Vijay Rangamma Layout',
      'Basavanagudi, Bangalore-560004',
    ],
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: FiPhone,
    title: 'Phone',
    lines: ['+91 83 10 33 85 44','+91 76 76 95 21 39'],
    color: 'from-emerald-600 to-emerald-400',
  },
  {
    icon: FiMail,
    title: 'Email',
    lines: ['ssmb@sais.in','acts@sais.in'],
    color: 'from-violet-600 to-violet-400',
  },
]

const iconImageByTitle = {
  'Regd. & Corp. Office': '/icons/icons8-location-pin-24.png',
  Phone: '/icons/icons8-online-support-50.png',
  Email: '/icons/icons8-mail-24.png',
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  // Use FiMail (from react-icons) for email icon — avoid optional FontAwesome import

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    services: [],
  })

  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const toggleService = (service) => {
    if (form.services.includes(service)) {
      setForm({
        ...form,
        services: form.services.filter((s) => s !== service),
      })
    } else {
      setForm({
        ...form,
        services: [...form.services, service],
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      // Determine API base dynamically so mobile devices can reach the backend.
      // Prefer Vite env `VITE_API_BASE`, otherwise fall back to laptop host on port 5000.
      const API_BASE = getApiBase()

      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)

        setForm({
          name: '',
          email: '',
          phone: '',
          message: '',
          services: [],
        })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log(error)
      alert('Network Error')
    }

    setLoading(false)
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(11,116,209,0.04),transparent_45%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#0b74d1] text-sm font-semibold uppercase tracking-[0.28em]">
            Get In Touch
          </span>

          <h2 className="text-5xl font-black text-slate-900 mt-4">
            Contact <span className="text-[#0b74d1]">Us</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="bg-[#fbfcfe] border border-slate-200 rounded-2xl p-6 flex gap-4 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center`}
                >
                  {iconImageByTitle[info.title] ? (
                    <>
                      <img
                        src={iconImageByTitle[info.title]}
                        alt={info.title}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          const next = e.currentTarget.nextSibling
                          if (next) next.style.display = 'block'
                        }}
                      />
                      <info.icon className="text-white" size={22} style={{ display: 'none' }} />
                    </>
                  ) : (
                    <info.icon className="text-white" size={22} />
                  )}
                </div>

                <div>
                  <h3 className="text-slate-900 text-lg font-bold mb-2">
                    {info.title}
                  </h3>

                  {info.lines.map((line, index) => {
                    if (info.title === 'Phone') {
                      const tel = String(line).replace(/[^0-9+]/g, '');
                      return (
                        <p key={index} className="text-slate-600 text-sm">
                          <a href={`tel:${tel}`} className="hover:underline">
                            {line}
                          </a>
                        </p>
                      );
                    }

                    if (info.title === 'Email') {
                      return (
                        <p key={index} className="text-slate-600 text-sm">
                          <a href={`mailto:${line}`} className="hover:underline">
                            {line}
                          </a>
                        </p>
                      );
                    }

                    return (
                      <p key={index} className="text-slate-600 text-sm">
                        {line}
                      </p>
                    );
                  })}
                  {info.title === 'Regd. & Corp. Office' && (
                    <div className="mt-3">
                      <a
                        href="https://maps.app.goo.gl/nr6kvoQtCdyEo42k7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-[#0b74d1] border border-[#0b74d1] px-3 py-2 text-sm text-white hover:bg-[#095fbd]"
                      >
                        View Map
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-[#fbfcfe] border border-slate-200 rounded-3xl p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-[0_10px_24px_rgba(16,185,129,0.2)]">
                  <FiCheck className="text-white" size={36} />
                </div>

                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Message Sent Successfully
                </h3>

                <p className="text-slate-600">
                  Our team will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full bg-[#f7f9fc] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b74d1]"
                />

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-[#f7f9fc] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b74d1]"
                />

                {/* Phone */}
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full bg-[#f7f9fc] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0b74d1]"
                />

                {/* Services (multi-select dropdown) */}
                <div ref={servicesRef} className="relative">
                  <h3 className="text-slate-900 font-semibold mb-3">Select Services</h3>

                  <button
                    type="button"
                    onClick={() => setServicesOpen((s) => !s)}
                    className="w-full text-left rounded-2xl border border-slate-200 bg-[#f7f9fc] px-4 py-3 text-sm flex items-center justify-between text-slate-700"
                  >
                    <div className="flex flex-wrap gap-2">
                      {form.services.length === 0 ? (
                        <span className="text-slate-400">Choose services...</span>
                      ) : (
                        form.services.map((s, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-[#0b74d1]/10 text-xs text-[#0b74d1]"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>

                    <svg
                      className={`w-4 h-4 ml-3 text-slate-500 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {servicesOpen && (
                    <div className="absolute z-30 mt-2 w-full rounded-xl border border-slate-200 bg-[#fbfcfe] p-3 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
                      <div className="max-h-56 overflow-auto">
                        {SERVICE_OPTIONS.map((service, index) => {
                          const checked = form.services.includes(service)
                          return (
                            <label key={index} className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleService(service)}
                                className="h-4 w-4 text-[#0b74d1]"
                              />
                              <span className="text-sm text-slate-700">{service}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Your Message"
                  required
                  className="w-full bg-[#f7f9fc] border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 resize-none focus:outline-none focus:border-[#0b74d1]"
                />

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0b74d1] hover:bg-[#095fbd] rounded-xl py-4 text-white font-semibold flex items-center justify-center gap-2 shadow-[0_12px_28px_rgba(11,116,209,0.22)]"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <FiSend />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}