import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', borderLeft: '4px solid #2f6fbf', paddingLeft: '12px' }}>{title}</h2>
    {children}
  </div>
)

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