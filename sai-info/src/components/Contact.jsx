import React, { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiSend, FiCheck, FiX } from 'react-icons/fi'

const contactInfo = [
  {
    icon: FiMapPin,
    title: 'Regd. Office',
    lines: ['#9, 1st Main, Ground Floor, Vijay Rangamma Layout,', 'Basavanagudi, Bangalore-560004'],
    color: 'from-blue-600 to-blue-400',
    mapLink: 'https://www.google.com/maps/place/SAI+INFOTECH/data=!4m7!3m6!1s0x3bae3f00a1d0b44b:0xd37c54bcf1741e8a!8m2!3d12.9361754!4d77.5770133!16s%2Fg%2F11ydzgj9nl!19sChIJS7TQoQA_rjsRih508bxUfNM?authuser=0&hl=en&rclk=1',
  },
  {
    icon: FiPhone,
    title: 'Phone',
    lines: ['+91 99459 81999', '+91 83103 38544', '+91 76769 52139'],
    color: 'from-indigo-600 to-indigo-400',
    href: 'tel:+919945981999',
  },
  {
    icon: FiMail,
    title: 'Email',
    lines: ['ssmb@sais.in'],
    color: 'from-violet-600 to-violet-400',
    href: 'mailto:ssmb@sais.in',
  },
]

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

function ServiceSelector({ selected, onChange, error }) {
  const toggle = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {SERVICE_OPTIONS.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`
                contact-chip inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium
                border transition-all duration-200 text-left
                ${isSelected ? 'contact-chip-selected' : 'contact-chip-default'}
              `}
            >
              <span className={`w-3.5 h-3.5 rounded flex-shrink-0 border flex items-center justify-center transition-all duration-200 contact-chip-box ${isSelected ? 'contact-chip-box-selected' : ''}`}>
                {isSelected && <FiCheck size={9} strokeWidth={3} className="text-white" />}
              </span>
              {option}
            </button>
          )
        })}
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      {selected.length > 0 && (
        <p className="contact-selected-count text-xs mt-2 font-medium">
          {selected.length} service{selected.length > 1 ? 's' : ''} selected
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', services: [] })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.phone.trim()) e.phone = 'Phone is required'
    else if (!/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Invalid phone number'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('message', form.message)
      formData.append('services', form.services.join(', '))

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!res.ok) {
        if (data && data.errors) setErrors(data.errors)
        else setErrors({ form: data.error || 'Failed to send message' })
        setLoading(false)
        return
      }
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', message: '', services: [] })
      setErrors({})
    } catch (err) {
      console.error(err)
      setErrors({ form: 'Network error. Please try again later.' })
    }
    setLoading(false)
  }

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  return (
    <>
      {/* ── Scoped styles for robust light/dark theming on form inputs ── */}
      <style>{`
        /* ── Input base (dark) ── */
        .contact-input {
          width: 100%;
          border-radius: 0.75rem;
          padding: 0.875rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s, color 0.2s;
          border-width: 1px;
          border-style: solid;

          /* Dark defaults */
          background-color: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          border-color: rgba(255, 255, 255, 0.12);
        }
        .contact-input::placeholder {
          color: #64748b;
        }
        .contact-input:focus {
          border-color: rgba(96, 165, 250, 0.7);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
          background-color: rgba(255, 255, 255, 0.07);
        }
        .contact-input.error {
          border-color: #f87171 !important;
        }

        /* Light mode overrides */
        html:not(.dark) .contact-input {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border-color: #cbd5e1 !important;
        }
        html:not(.dark) .contact-input::placeholder {
          color: #94a3b8 !important;
        }
        html:not(.dark) .contact-input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12) !important;
          background-color: #f8faff !important;
        }
        html:not(.dark) .contact-input.error {
          border-color: #ef4444 !important;
        }

        /* ── Label ── */
        .contact-label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: #94a3b8;
        }
        html:not(.dark) .contact-label {
          color: #334155;
        }

        /* ── Services selector box ── */
        .contact-services-box {
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.10);
          padding: 1rem;
          background: rgba(255, 255, 255, 0.03);
        }
        html:not(.dark) .contact-services-box {
          border-color: #e2e8f0;
          background: #f8faff;
        }

        .contact-services-title {
          font-size: 0.8125rem;
          font-weight: 600;
          color: #e2e8f0;
          margin-bottom: 0.25rem;
          display: block;
        }
        html:not(.dark) .contact-services-title {
          color: #1e293b;
        }
        .contact-services-hint {
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 0.75rem;
          display: block;
        }
        html:not(.dark) .contact-services-hint {
          color: #64748b;
        }

        /* ── Chip buttons ── */
        .contact-chip-default {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
          color: #94a3b8;
        }
        .contact-chip-default:hover {
          border-color: rgba(96, 165, 250, 0.4);
          color: #e2e8f0;
          background: rgba(255, 255, 255, 0.09);
        }
        html:not(.dark) .contact-chip-default {
          background: #ffffff;
          border-color: #cbd5e1;
          color: #475569;
        }
        html:not(.dark) .contact-chip-default:hover {
          border-color: #3b82f6;
          color: #1e293b;
          background: #f0f7ff;
        }

        .contact-chip-selected {
          background: rgba(59, 130, 246, 0.18);
          border-color: rgba(59, 130, 246, 0.6);
          color: #93c5fd;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.15);
        }
        html:not(.dark) .contact-chip-selected {
          background: rgba(37, 99, 235, 0.1);
          border-color: rgba(37, 99, 235, 0.5);
          color: #1d4ed8;
          box-shadow: 0 0 12px rgba(37, 99, 235, 0.1);
        }

        .contact-chip-box {
          border-color: rgba(255, 255, 255, 0.3);
        }
        html:not(.dark) .contact-chip-box {
          border-color: #94a3b8;
        }
        .contact-chip-box-selected {
          background: #3b82f6;
          border-color: #3b82f6;
        }
        html:not(.dark) .contact-chip-box-selected {
          background: #2563eb;
          border-color: #2563eb;
        }

        .contact-selected-count {
          color: #60a5fa;
        }
        html:not(.dark) .contact-selected-count {
          color: #2563eb;
        }
      `}</style>

      <section id="contact" className="section-pad relative">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
              Contact <span className="text-gradient">Us</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-14">
            {/* Left: info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-5"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Let's Talk Business</h3>
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass rounded-2xl p-5 border border-white/8 hover:border-blue-500/20 hover-card flex items-start gap-4"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}>
                    <info.icon className="text-white" size={18} />
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-sm font-semibold tracking-wide mb-1">{info.title}</h4>
                    {info.lines.map((line, j) =>
                      info.href ? (
                        <a key={j} href={info.href} className="text-slate-300 text-sm hover:text-white transition-colors block">{line}</a>
                      ) : (
                        <p key={j} className="text-slate-300 text-sm">{line}</p>
                      )
                    )}
                    {info.mapLink && (
                      <a href={info.mapLink} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm mt-2 inline-block hover:text-cyan-300 transition-colors">
                        View on Map →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Right: form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="glass rounded-3xl border border-white/8 p-8">
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mb-8" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <FiCheck className="text-white" size={36} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                    <p className="text-slate-400 mb-8">We'll get back to you within 24 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-primary px-6 py-3 rounded-xl text-white font-semibold"
                    >
                      <span>Send Another</span>
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {[
                      { field: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                      { field: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                      { field: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 XXXXX XXXXX' },
                    ].map(({ field, label, type, placeholder }) => (
                      <div key={field}>
                        <label className="contact-label">{label} *</label>
                        <input
                          type={type}
                          value={form[field]}
                          onChange={(e) => handleChange(field, e.target.value)}
                          placeholder={placeholder}
                          className={`contact-input${errors[field] ? ' error' : ''}`}
                        />
                        {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                      </div>
                    ))}

                    {/* Services multi-select */}
                    <div className="contact-services-box">
                      <label className="contact-services-title">
                        Products &amp; Services I am Interested In
                      </label>
                      <span className="contact-services-hint">Select one or more services below</span>
                      <ServiceSelector
                        selected={form.services}
                        onChange={(val) => handleChange('services', val)}
                        error={errors.services}
                      />
                    </div>

                    <div>
                      <label className="contact-label">Message *</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder="Describe your requirement..."
                        rows={4}
                        className={`contact-input resize-none${errors.message ? ' error' : ''}`}
                      />
                      {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                    </div>

                    {errors.form && <p className="text-red-400 text-sm text-center">{errors.form}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <div className="loader-ring w-5 h-5" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <FiSend size={16} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
