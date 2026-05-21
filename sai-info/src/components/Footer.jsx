import React from 'react'
import { motion } from 'framer-motion'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaLinkedinIn } from 'react-icons/fa'
import logoImg from '../assets/logo.png'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'IT Solutions', href: '#it-solutions' },
  { label: 'Our Clients', href: '#clients' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

const serviceLinks = [
  { label: 'Laptop Repair', href: '#services' },
  { label: 'Motherboard Service', href: '#services' },
  { label: 'Data Recovery', href: '#services' },
  { label: 'Networking', href: '#services' },
  { label: 'Virus Removal', href: '#it-solutions' },
  { label: 'Remote Support', href: '#it-solutions' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-14 items-start">

          {/* Logo */}
          <div className="lg:col-span-1 flex items-start justify-center lg:justify-start">
            <a href="#home">
              <img
                src={logoImg}
                alt="SAI INFOTECH"
                className="h-20 w-auto object-contain"
                style={{
                  maxWidth: '260px',
                  filter: 'drop-shadow(0 0 12px rgba(6,182,212,0.45))'
                }}
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">
              Quick Links
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-600 group-hover:w-3 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">
              Services
            </h4>

            <ul className="space-y-3">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-slate-500 hover:text-blue-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-cyan-600 group-hover:w-3 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">
              Contact Info
            </h4>

            <div className="space-y-4">

              {/* Address */}
              <div className="flex items-start gap-3">
                <FiMapPin
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                  size={15}
                />

                <p className="text-slate-500 text-sm leading-relaxed">
                  #9, 1st Main, Ground Floor, Vijay Rangamma Layout,
                  <br />
                  Basavanagudi, Bangalore-560004
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <FiPhone
                  className="text-blue-400 flex-shrink-0"
                  size={15}
                />

                <div>
                  <a
                    href="tel:+919945981999"
                    className="text-slate-500 hover:text-blue-400 transition-colors text-sm block"
                  >
                    +91 99459 81999
                  </a>

                  <a
                    href="tel:+918310338544"
                    className="text-slate-500 hover:text-blue-400 transition-colors text-sm block"
                  >
                    +91 83103 38544
                  </a>

                  <a
                    href="tel:+917676952139"
                    className="text-slate-500 hover:text-blue-400 transition-colors text-sm block"
                  >
                    +91 76769 52139 (Office)
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <FiMail
                  className="text-blue-400 flex-shrink-0"
                  size={15}
                />

                <a
                  href="mailto:mahaling.saiservices@gmail.com"
                  className="text-slate-500 hover:text-blue-400 transition-colors text-sm break-all"
                >
                  mahaling.saiservices@gmail.com
                </a>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center gap-3">
                <FaLinkedinIn
                  className="text-blue-400 flex-shrink-0"
                  size={15}
                />

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-400 transition-colors text-sm"
                >
                  linkedin.com
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
          <p>
            © {new Date().getFullYear()} SAI INFOTECH. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>

            <a href="#" className="hover:text-slate-400 transition-colors">
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}