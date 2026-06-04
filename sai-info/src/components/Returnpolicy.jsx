import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', borderLeft: '4px solid #2f6fbf', paddingLeft: '12px' }}>{title}</h2>
    {children}
  </div>
)

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