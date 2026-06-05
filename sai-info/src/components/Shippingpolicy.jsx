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

export default function ShippingPolicy() {
  return (
    <PolicyPage title="Shipping Policy">
      <Section title="Overview">
        <p>SAI INFOTECH ships hardware components and accessories across Bangalore and select regions in Karnataka. Please review our shipping terms below.</p>
      </Section>
      <Section title="Shipping Areas">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li><strong>Local Delivery (Bangalore):</strong> Same-day or next-day delivery available for in-stock items.</li>
          <li><strong>Pan-India Shipping:</strong> Available for select products via trusted courier partners (3–7 business days).</li>
        </ul>
      </Section>
      <Section title="Shipping Charges">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Free local delivery within Bangalore for orders above ₹2,000.</li>
          <li>Standard shipping charges apply for deliveries outside Bangalore.</li>
          <li>Charges are calculated at checkout based on weight and destination.</li>
        </ul>
      </Section>
      <Section title="Order Processing Time">
        <p>Orders are processed within <strong>1–2 business days</strong> after payment confirmation. You will receive a tracking number via email once your order is dispatched.</p>
      </Section>
      <Section title="Damaged or Lost Shipments">
        <p>If your order arrives damaged or is lost in transit, please notify us within <strong>48 hours</strong> of the delivery date at <strong>ssmb@sais.in</strong>. We will work with the carrier to resolve the issue promptly.</p>
      </Section>
    </PolicyPage>
  )
}