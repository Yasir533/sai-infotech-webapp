import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', borderLeft: '4px solid #2f6fbf', paddingLeft: '12px' }}>{title}</h2>
    {children}
  </div>
)

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