import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', borderLeft: '4px solid #2f6fbf', paddingLeft: '12px' }}>{title}</h2>
    {children}
  </div>
)

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