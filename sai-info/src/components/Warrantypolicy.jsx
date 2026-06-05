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

export default function WarrantyPolicy() {
  return (
    <PolicyPage title="Warranty Policy">
      <Section title="Service Warranty">
        <p>All repairs and services performed by SAI INFOTECH come with a <strong>90-day service warranty</strong>. If the same issue recurs within this period due to our workmanship, we will repair it free of charge.</p>
      </Section>
      <Section title="Parts Warranty">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li><strong>Original/OEM Parts:</strong> Covered by the original manufacturer's warranty (typically 6 months – 1 year).</li>
          <li><strong>Third-party Parts:</strong> 30-day warranty provided by SAI INFOTECH.</li>
          <li>Warranty cards and purchase receipts must be retained for warranty claims.</li>
        </ul>
      </Section>
      <Section title="What Is Not Covered">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Physical damage caused by the customer after service</li>
          <li>Liquid damage occurring post-service</li>
          <li>Issues unrelated to the original service performed</li>
          <li>Software issues (virus, OS reinstallation) after service unless specified</li>
        </ul>
      </Section>
      <Section title="How to Claim Warranty">
        <p>Bring your device to our office at Basavanagudi, Bangalore along with your service receipt, or call us at <strong>+91 83 10 33 85 44</strong> to schedule a warranty inspection.</p>
      </Section>
    </PolicyPage>
  )
}