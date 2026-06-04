import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', borderLeft: '4px solid #2f6fbf', paddingLeft: '12px' }}>{title}</h2>
    {children}
  </div>
)

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