import React from 'react'
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
  return (
    <footer
      style={{
        position: 'relative',
        borderTop: '1px solid rgba(148,163,184,0.2)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #ffffff 0%, #f3f7fc 100%)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at top, rgba(11,116,209,0.04), transparent 45%)' }} />

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 32px' }}>

        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '56px' }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <a href="#home">
              <img
                src={logoImg}
                alt="SAI INFOTECH"
                style={{
                  height: '80px',
                  width: 'auto',
                  objectFit: 'contain',
                  maxWidth: '260px',
                  filter: 'drop-shadow(0 8px 24px rgba(15,23,42,0.12))'
                }}
              />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={headingStyle}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = '#0b74d1'}
                    onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0b74d1', flexShrink: 0 }} />
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
                  <a href={link.href} style={linkStyle}
                    onMouseEnter={e => e.currentTarget.style.color = '#0b74d1'}
                    onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                  >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#0b74d1', flexShrink: 0 }} />
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
                <FiMapPin style={{ color: '#0b74d1', flexShrink: 0, marginTop: '2px' }} size={15} />
                <p style={{ color: '#334155', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  #9, 1st Main, Ground Floor, Vijay Rangamma Layout,<br />
                  Basavanagudi, Bangalore-560004
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <FiPhone style={{ color: '#0b74d1', flexShrink: 0, marginTop: '2px' }} size={15} />
                <div>
                  {['+91 83 10 33 85 44', '+91 76 76 95 21 39'].map((num, i) => (
                    <a key={i} href={`tel:${num.replace(/\s/g,'')}`} style={{ ...linkStyle, display: 'block', marginBottom: '4px' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#0b74d1'}
                      onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                    >{num}</a>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FiMail style={{ color: '#0b74d1', flexShrink: 0 }} size={15} />
                <a href="mailto:ssmb@sais.in" style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#0b74d1'}
                  onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                >ssmb@sais.in</a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaLinkedinIn style={{ color: '#0b74d1', flexShrink: 0 }} size={15} />
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle}
                  onMouseEnter={e => e.currentTarget.style.color = '#0b74d1'}
                  onMouseLeave={e => e.currentTarget.style.color = '#334155'}
                >linkedin.com</a>
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(148,163,184,0.35), transparent)', marginBottom: '32px' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <p style={{ color: '#475569', fontSize: '14px', margin: 0 }}>
            © {new Date().getFullYear()} SAI INFOTECH. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((label, i) => (
              <a key={i} href="#" style={{ color: '#475569', fontSize: '14px', textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0b74d1'}
                onMouseLeave={e => e.currentTarget.style.color = '#475569'}
              >{label}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}