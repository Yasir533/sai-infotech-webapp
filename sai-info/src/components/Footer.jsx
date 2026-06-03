import React, { useState, useEffect } from 'react'
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

const linkStyle = { color: '#334155', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }
const headingStyle = { color: '#0f172a', fontWeight: 700, marginBottom: '20px', letterSpacing: '0.05em' }

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(148,163,184,0.2)', overflow: 'hidden', background: 'linear-gradient(180deg, #f8fafc 0%, #eef3f8 100%)' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(47,111,191,0.025), transparent 45%)' }} />

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 32px' }}>

        {isMobile ? (
          /* ── MOBILE layout ── */
          <div style={{ marginBottom: '40px' }}>
            {/* Logo centered */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
              <a href="#home">
                <img src={logoImg} alt="SAI INFOTECH" style={{ height: '120px', width: 'auto', objectFit: 'contain' }} />
              </a>
            </div>
            {/* Quick Links + Services side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <h4 style={headingStyle}>Quick Links</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} style={{ ...linkStyle, fontSize: '13px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2f6fbf', flexShrink: 0 }} />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={headingStyle}>Services</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {serviceLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.href} style={{ ...linkStyle, fontSize: '13px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#2f6fbf', flexShrink: 0 }} />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Contact full width */}
            <div>
              <h4 style={headingStyle}>Contact Info</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <FiMapPin style={{ color: '#2f6fbf', flexShrink: 0, marginTop: '2px' }} size={15} />
                  <p style={{ color: '#334155', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>#9, 1st Main, Ground Floor, Vijay Rangamma Layout,<br />Basavanagudi, Bangalore-560004</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <FiPhone style={{ color: '#2f6fbf', flexShrink: 0, marginTop: '2px' }} size={15} />
                  <div>
                    {['+91 83 10 33 85 44', '+91 76 76 95 21 39'].map((num, i) => (
                      <a key={i} href={`tel:${num.replace(/\s/g,'')}`} style={{ ...linkStyle, fontSize: '13px', display: 'block', marginBottom: '4px' }}>{num}</a>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FiMail style={{ color: '#2f6fbf', flexShrink: 0 }} size={15} />
                  <a href="mailto:ssmb@sais.in" style={{ ...linkStyle, fontSize: '13px' }}>ssmb@sais.in</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaLinkedinIn style={{ color: '#2f6fbf', flexShrink: 0 }} size={15} />
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, fontSize: '13px' }}>linkedin.com</a>
                </div>
              </div>
            </div>

            {/* Our Location — Google Maps embed (mobile) */}
            <div>
              <h4 style={headingStyle}>Our Location</h4>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(47,111,191,0.18)', boxShadow: '0 4px 18px rgba(47,111,191,0.10)' }}>
                <iframe
                  title="SAI INFOTECH Location Mobile"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5938!2d77.5695!3d12.9435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15800f7b7d8d%3A0xa3e6c12fba7e9b56!2sVijaya%20Rangamma%20Layout%2C%20Basavanagudi%2C%20Bengaluru%2C%20Karnataka%20560004!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin"
                  width="100%"
                  height="180"
                  style={{ display: 'block', border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.google.com/?q=SAI+INFOTECH+Basavanagudi+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, color: '#2f6fbf', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
              >
                <FiMapPin size={13}/> Get Directions ↗
              </a>
            </div>
          </div>
        ) : (
          /* ── DESKTOP layout ── */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '56px' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <a href="#home">
                <img src={logoImg} alt="SAI INFOTECH" style={{ height: '180px', width: 'auto', objectFit: 'contain', maxWidth: '260px', filter: 'drop-shadow(0 8px 20px rgba(15,23,42,0.10))' }} />
              </a>
            </div>
            {/* Quick Links */}
            <div>
              <h4 style={headingStyle}>Quick Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {quickLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} style={linkStyle} onMouseEnter={e => e.currentTarget.style.color='#2f6fbf'} onMouseLeave={e => e.currentTarget.style.color='#334155'}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2f6fbf', flexShrink: 0 }} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Services */}
            <div>
              <h4 style={headingStyle}>Services</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {serviceLinks.map((link, i) => (
                  <li key={i}>
                    <a href={link.href} style={linkStyle} onMouseEnter={e => e.currentTarget.style.color='#2f6fbf'} onMouseLeave={e => e.currentTarget.style.color='#334155'}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2f6fbf', flexShrink: 0 }} />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 style={headingStyle}>Contact Info</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <FiMapPin style={{ color: '#2f6fbf', flexShrink: 0, marginTop: '2px' }} size={15} />
                  <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>#9, 1st Main, Ground Floor, Vijay Rangamma Layout,<br />Basavanagudi, Bangalore-560004</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <FiPhone style={{ color: '#2f6fbf', flexShrink: 0, marginTop: '2px' }} size={15} />
                  <div>
                    {['+91 83 10 33 85 44', '+91 76 76 95 21 39'].map((num, i) => (
                      <a key={i} href={`tel:${num.replace(/\s/g,'')}`} style={{ ...linkStyle, display: 'block', marginBottom: '4px' }} onMouseEnter={e => e.currentTarget.style.color='#2f6fbf'} onMouseLeave={e => e.currentTarget.style.color='#334155'}>{num}</a>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FiMail style={{ color: '#2f6fbf', flexShrink: 0 }} size={15} />
                  <a href="mailto:ssmb@sais.in" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color='#2f6fbf'} onMouseLeave={e => e.currentTarget.style.color='#334155'}>ssmb@sais.in</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FaLinkedinIn style={{ color: '#2f6fbf', flexShrink: 0 }} size={15} />
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle} onMouseEnter={e => e.currentTarget.style.color='#2f6fbf'} onMouseLeave={e => e.currentTarget.style.color='#334155'}>linkedin.com</a>
                </div>
              </div>
            </div>

            {/* Our Location — Google Maps embed */}
            <div>
              <h4 style={headingStyle}>Our Location</h4>
              <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(47,111,191,0.18)', boxShadow: '0 4px 18px rgba(47,111,191,0.10)' }}>
                <iframe
                  title="SAI INFOTECH Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5938!2d77.5695!3d12.9435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15800f7b7d8d%3A0xa3e6c12fba7e9b56!2sVijaya%20Rangamma%20Layout%2C%20Basavanagudi%2C%20Bengaluru%2C%20Karnataka%20560004!5e0!3m2!1sen!2sin!4v1717000000000!5m2!1sen!2sin"
                  width="100%"
                  height="200"
                  style={{ display: 'block', border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <a
                href="https://maps.google.com/?q=SAI+INFOTECH+Basavanagudi+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, color: '#2f6fbf', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color='#1a4a8a'}
                onMouseLeave={e => e.currentTarget.style.color='#2f6fbf'}
              >
                <FiMapPin size={13}/> Get Directions ↗
              </a>
            </div>
          </div>
        )}

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(148,163,184,0.35), transparent)', marginBottom: '32px' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>© {new Date().getFullYear()} SAI INFOTECH. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((label, i) => (
              <a key={i} href="#" style={{ color: '#475569', fontSize: '14px', textDecoration: 'none' }} onMouseEnter={e => e.currentTarget.style.color='#2f6fbf'} onMouseLeave={e => e.currentTarget.style.color='#475569'}>{label}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}