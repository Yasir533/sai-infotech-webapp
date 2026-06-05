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

export default function ReturnPolicy() {
  return (
    <PolicyPage title="Return Policy">
      <Section title="Overview">
        <p>At SAI INFOTECH, we strive to ensure customer satisfaction with every service and product. Please read this policy carefully before making a purchase or availing our services.</p>
      </Section>
      <Section title="Eligible Returns">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Hardware components that are defective upon delivery may be returned within <strong>7 days</strong> of purchase.</li>
          <li>Items must be in original, unused condition with all original packaging and accessories.</li>
          <li>Proof of purchase (invoice/receipt) is mandatory for all return requests.</li>
        </ul>
      </Section>
      <Section title="Non-Returnable Items">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Software licenses and digital downloads</li>
          <li>Consumable items such as printer cartridges once opened</li>
          <li>Custom-configured or built-to-order systems</li>
          <li>Items damaged due to misuse or physical damage by the customer</li>
        </ul>
      </Section>
      <Section title="Return Process">
        <p>To initiate a return, contact us at <strong>ssmb@sais.in</strong> or call <strong>+91 83 10 33 85 44</strong>. Our team will guide you through the return process and issue a Return Merchandise Authorization (RMA) number.</p>
      </Section>
      <Section title="Refunds">
        <p>Once we receive and inspect the returned item, a refund will be processed to the original payment method within <strong>7–10 business days</strong>.</p>
      </Section>
    </PolicyPage>
  )
}