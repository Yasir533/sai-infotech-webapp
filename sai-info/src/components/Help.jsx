import React from 'react'
import PolicyPage from './PolicyPage'

export default function Help() {
  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px', borderLeft: '4px solid #2f6fbf', paddingLeft: '12px' }}>{title}</h2>
      {children}
    </div>
  )

  return (
    <PolicyPage title="Help Center">
      <Section title="How can we help you?">
        <p>Welcome to the SAI INFOTECH Help Center. Below you'll find answers to the most common questions. If you need further assistance, please reach out to our support team.</p>
      </Section>
      <Section title="Getting Started">
        <p>SAI INFOTECH provides IT support, laptop repairs, networking solutions, and more. You can contact us via phone, email, or by visiting our Bangalore office directly.</p>
      </Section>
      <Section title="Support Channels">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li><strong>Phone:</strong> +91 83 10 33 85 44 / +91 76 76 95 21 39</li>
          <li><strong>Email:</strong> ssmb@sais.in</li>
          <li><strong>Office Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM IST</li>
          <li><strong>Location:</strong> #9, 1st Main, Ground Floor, Vijay Rangamma Layout, Basavanagudi, Bangalore – 560004</li>
        </ul>
      </Section>
      <Section title="Frequently Asked Questions">
        <p><strong>Q: How long does a laptop repair take?</strong><br/>A: Most standard repairs are completed within 24–48 hours. Complex issues may take up to 5 business days.</p>
        <p><strong>Q: Do you offer remote support?</strong><br/>A: Yes, we offer remote support for software issues, virus removal, and general troubleshooting.</p>
        <p><strong>Q: Is data recovery guaranteed?</strong><br/>A: Recovery success depends on the extent of damage. We provide a free diagnosis before proceeding.</p>
      </Section>
    </PolicyPage>
  )
}