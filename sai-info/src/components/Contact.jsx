import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiMapPin, FiPhone, FiMail, FiSend, FiCheck } from 'react-icons/fi'

const contactInfo = [
  {
    icon: FiMapPin,
    title: 'Regd. Office',
    lines: [
      '#9, 1st Main, Ground Floor, Vijay Rangamma Layout,',
      'Basavanagudi, Bangalore-560004',
    ],
    color: 'from-blue-600 to-blue-400',
  },
  {
    icon: FiPhone,
    title: 'Phone',
    lines: ['+91 99459 81999'],
    color: 'from-indigo-600 to-indigo-400',
  },
  {
    icon: FiMail,
    title: 'Email',
    lines: ['ssmb@sais.in'],
    color: 'from-violet-600 to-violet-400',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
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
          {/* Contact Info */}
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
                  <info.icon className="text-white" size={22} />
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
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
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
                <div>
                  <label className="block text-slate-300 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-slate-300 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-slate-300 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-slate-300 mb-2">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Enter your message"
                    required
                    className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white outline-none resize-none"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-xl py-4 text-white font-semibold flex items-center justify-center gap-2"
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