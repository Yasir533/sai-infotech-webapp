import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiSend,
  FiCheck,
} from 'react-icons/fi'

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
    title: 'Regd. Office',
    lines: [
      '#9, 1st Main, Ground Floor, Vijay Rangamma Layout',
      'Basavanagudi, Bangalore-560004',
    ],
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: FiPhone,
    title: 'Phone',
    lines: ['+91 99459 81999'],
    color: 'from-emerald-600 to-emerald-400',
  },
  {
    icon: FiMail,
    title: 'Email',
    lines: ['ssmb@sais.in'],
    color: 'from-violet-600 to-violet-400',
  },
]

const iconImageByTitle = {
  'Regd. Office': '/icons/icons8-location-pin-24.png',
  Phone: '/icons/icons8-call-48.png',
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
      const response = await fetch(
        'http://localhost:5000/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      )

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
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Get In Touch
          </span>

          <h2 className="text-5xl font-black text-white mt-4">
            Contact <span className="text-blue-400">Us</span>
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
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex gap-4"
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
                  <h3 className="text-white text-lg font-bold mb-2">
                    {info.title}
                  </h3>

                  {info.lines.map((line, index) => (
                    <p key={index} className="text-slate-300 text-sm">
                      {line}
                    </p>
                  ))}
                  {info.title === 'Regd. Office' && (
                    <div className="mt-3">
                      <a
                        href="https://maps.app.goo.gl/nr6kvoQtCdyEo42k7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 hover:bg-slate-700"
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
            className="bg-slate-900 border border-slate-700 rounded-3xl p-8"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
                  <FiCheck className="text-white" size={36} />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  Message Sent Successfully
                </h3>

                <p className="text-slate-300">
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
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white"
                />

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white"
                />

                {/* Phone */}
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white"
                />

                {/* Services (multi-select dropdown) */}
                <div ref={servicesRef} className="relative">
                  <h3 className="text-white font-semibold mb-3">Select Services</h3>

                  <button
                    type="button"
                    onClick={() => setServicesOpen((s) => !s)}
                    className="w-full text-left rounded-2xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm flex items-center justify-between"
                  >
                    <div className="flex flex-wrap gap-2">
                      {form.services.length === 0 ? (
                        <span className="text-slate-400">Choose services...</span>
                      ) : (
                        form.services.map((s, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full bg-slate-700 text-xs text-white"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>

                    <svg
                      className={`w-4 h-4 ml-3 text-slate-300 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path d="M5 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {servicesOpen && (
                    <div className="absolute z-30 mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-lg">
                      <div className="max-h-56 overflow-auto">
                        {SERVICE_OPTIONS.map((service, index) => {
                          const checked = form.services.includes(service)
                          return (
                            <label key={index} className="flex items-center gap-3 p-2 rounded hover:bg-slate-800 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleService(service)}
                                className="h-4 w-4 text-blue-600"
                              />
                              <span className="text-sm text-slate-200">{service}</span>
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
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white resize-none"
                />

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-4 text-white font-semibold flex items-center justify-center gap-2"
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