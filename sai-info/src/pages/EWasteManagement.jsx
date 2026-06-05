import React, { useState } from 'react'
import PolicyPage from '../components/PolicyPage'

const Section = ({ title, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ borderBottom: '1px solid #e8eef5' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 28px',
          background: open ? '#f0f6ff' : '#fff',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s',
          gap: '12px',
        }}
        onMouseOver={e => { if (!open) e.currentTarget.style.background = '#f8fafc' }}
        onMouseOut={e => { if (!open) e.currentTarget.style.background = '#fff' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '4px', height: '20px', borderRadius: '2px',
            background: open ? '#2f6fbf' : '#cbd5e1', flexShrink: 0, transition: 'background 0.2s',
          }} />
          <span style={{ fontSize: '0.97rem', fontWeight: 700, color: open ? '#1e3a5f' : '#334155' }}>
            {title}
          </span>
        </div>
        <span style={{
          fontSize: '1.1rem', color: '#2f6fbf', flexShrink: 0,
          transition: 'transform 0.25s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)', display: 'inline-block',
        }}>+</span>
      </button>
      <div style={{ maxHeight: open ? '600px' : '0', overflow: 'hidden', transition: 'max-height 0.35s ease' }}>
        <div style={{ padding: '4px 28px 24px 46px', color: '#475569', fontSize: '0.93rem', lineHeight: '1.85' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function EWasteManagement() {
  return (
    <PolicyPage title="E-Waste Management Solutions">

      <Section title="About E-Waste">
        <p>
          We Sai infotech partner with leading e-waste management companies specialising in
          IT asset Remarketing, Secure Data Destruction, Logistics and
          Sustainable Recycling Services across Karnataka.
        </p>
        <p>
          Established in 2010, We brings over 20 years of industry
          expertise in environmentally responsible recycling and IT asset
          lifecycle management.
        </p>
      </Section>

      <Section title="Services Offered">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>IT Asset Disposition Services (ITAD)</li>
          <li>IT Asset Remarketing Services (ITAR)</li>
          <li>Secure Data Destruction Services</li>
          <li>Asset Decommissioning & Installation</li>
          <li>Secure Logistics & Transportation</li>
          <li>E-Waste Collection & Recycling</li>
        </ul>
      </Section>

      <Section title="Why Choose GRKMS">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>KSPCB Authorized E-Waste Recycler</li>
          <li>ISO 14001:2015 Certified</li>
          <li>ISO 45001:2018 Certified</li>
          <li>ISO 9001 Certified</li>
          <li>R2 Certified Recycler</li>
          <li>Nationwide Collection and Recycling Support</li>
        </ul>
      </Section>

      <Section title="The 6R Sustainability Approach">
        <p>We follow the globally accepted 6R framework:</p>
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Refuse</li>
          <li>Reduce</li>
          <li>Rethink</li>
          <li>Reuse</li>
          <li>Repair</li>
          <li>Recycle</li>
        </ul>
        <p>Our mission is to minimize waste generation and maximize environmental sustainability.</p>
      </Section>

      <Section title="Secure Data Destruction">
        <p>
          Data security is our highest priority. We provide secure and
          certified data destruction services for organizations looking to
          dispose of IT assets safely.
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Onsite and Offsite Data Destruction</li>
          <li>Hard Drive Degaussing</li>
          <li>SSD Destruction</li>
          <li>Bulk Hard Disk Shredding</li>
          <li>NIST 800-88 Compliant Erasure</li>
          <li>Data Destruction Certificates</li>
        </ul>
      </Section>

      <Section title="IT Asset Recovery & Remarketing">
        <p>
          Before recycling, We evaluates equipment for reuse and
          remarketing opportunities to maximize asset value recovery.
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Refurbishment</li>
          <li>Redeployment</li>
          <li>Reselling</li>
          <li>Value Recovery</li>
          <li>Asset Tracking & Reporting</li>
        </ul>
      </Section>

      <Section title="Logistics & Transportation">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Safe Packing of IT Assets</li>
          <li>Secure Transportation</li>
          <li>Material Handling & Movement</li>
          <li>Asset Inspection & Segregation</li>
          <li>Recycling & Resale Processing</li>
        </ul>
      </Section>

      <Section title="Our Commitment">
        <p>Recycle Today for a Better Tomorrow.</p>
        <p>
          Sai Infotech is committed to providing safe, secure and environmentally
          responsible E-Waste management solutions while helping
          organizations achieve sustainability goals and regulatory compliance.
        </p>
      </Section>

    </PolicyPage>
  )
}