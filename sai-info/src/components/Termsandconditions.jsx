import React, { useState } from 'react'
import PolicyPage from './PolicyPage'

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

export default function TermsAndConditions() {
  return (
    <PolicyPage title="Terms And Conditions">
      <Section title="Acceptance of Terms">
        <p>By accessing or using SAI INFOTECH's services, website, or products, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
      </Section>
      <Section title="Services">
        <p>SAI INFOTECH provides IT services including but not limited to laptop repair, networking, data recovery, virus removal, and remote support. All services are subject to availability and our technical assessment.</p>
      </Section>
      <Section title="Customer Responsibilities">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Provide accurate information about the device and the issue.</li>
          <li>Back up important data before handing over any device for service.</li>
          <li>SAI INFOTECH is not liable for data loss during the repair process.</li>
          <li>Devices left uncollected for more than 30 days after service completion may be disposed of after notice.</li>
        </ul>
      </Section>
      <Section title="Payment Terms">
        <p>Payment is due upon completion of service unless a prior agreement is made. We accept cash, UPI, bank transfer, and select credit/debit cards.</p>
      </Section>
      <Section title="Limitation of Liability">
        <p>SAI INFOTECH's liability is limited to the service fee paid. We are not responsible for consequential, indirect, or incidental damages arising from the use or inability to use our services.</p>
      </Section>
      <Section title="Intellectual Property">
        <p>All content, trademarks, and data on this website are the property of SAI INFOTECH and may not be used without written permission.</p>
      </Section>
      <Section title="Governing Law">
        <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, Karnataka.</p>
      </Section>
      <Section title="Changes to Terms">
        <p>SAI INFOTECH reserves the right to modify these terms at any time. Continued use of our services after any changes constitutes acceptance of the new terms.</p>
      </Section>
    </PolicyPage>
  )
}