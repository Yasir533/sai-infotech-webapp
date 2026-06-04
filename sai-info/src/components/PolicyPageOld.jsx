import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', borderLeft: '4px solid #2f6fbf', paddingLeft: '12px' }}>{title}</h2>
    {children}
  </div>
)

export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy">
      <Section title="Information We Collect">
        <p>We collect information you provide directly to us, such as name, email address, phone number, and any other information you choose to provide when using our services or contacting us.</p>
      </Section>
      <Section title="How We Use Your Information">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>To provide, maintain, and improve our services</li>
          <li>To send you service-related communications</li>
          <li>To respond to your comments and questions</li>
          <li>To send you technical notices and support messages</li>
        </ul>
      </Section>
      <Section title="Information Sharing">
        <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our business, so long as those parties agree to keep this information confidential.</p>
      </Section>
      <Section title="Data Security">
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      </Section>
      <Section title="Cookies">
        <p>Our website may use cookies to enhance the user experience. You may choose to set your browser to refuse cookies, though some parts of our website may not function properly as a result.</p>
      </Section>
      <Section title="Contact">
        <p>If you have questions regarding this Privacy Policy, please contact us at <strong>ssmb@sais.in</strong>.</p>
      </Section>
    </PolicyPage>
  )
}