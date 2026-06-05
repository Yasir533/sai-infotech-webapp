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

export default function RefundPolicy() {
  return (
    <PolicyPage title="Refund Policy">
      <Section title="Our Commitment">
        <p>SAI INFOTECH is committed to providing high-quality IT services and products. If you are not satisfied with our service, we will do our best to make it right.</p>
      </Section>
      <Section title="Service Refunds">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>If a repair service does not resolve the issue within <strong>7 days</strong>, we will re-service at no extra charge or provide a full refund of the service fee.</li>
          <li>Diagnostic fees are non-refundable once the diagnosis has been performed.</li>
          <li>Advance payments are refundable if the service has not yet commenced.</li>
        </ul>
      </Section>
      <Section title="Product Refunds">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Defective products may be refunded within <strong>7 days</strong> of purchase (see Return Policy).</li>
          <li>Once a product is used or opened (for non-defective reasons), refunds are not applicable.</li>
        </ul>
      </Section>
      <Section title="Refund Processing Time">
        <p>Approved refunds are processed within <strong>7–10 business days</strong>. Refunds are issued via the original payment method (cash, bank transfer, or UPI).</p>
      </Section>
      <Section title="How to Request a Refund">
        <p>Email us at <strong>ssmb@sais.in</strong> with your invoice number, reason for refund, and any supporting evidence. Our team will review and respond within 48 hours.</p>
      </Section>
    </PolicyPage>
  )
}