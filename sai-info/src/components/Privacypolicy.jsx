import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div
    style={{
      marginBottom: '32px',
      padding: '30px',
      minHeight: '260px',
      background: '#ffffff',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
      border: '1px solid rgba(47, 111, 191, 0.08)',
      transition: 'all 0.3s ease'
    }}
  >
    <h2
      style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: '#0f172a',
        marginBottom: '16px',
        borderLeft: '5px solid #2f6fbf',
        paddingLeft: '14px',
        lineHeight: '1.4'
      }}
    >
      {title}
    </h2>

    <div
      style={{
        color: '#475569',
        lineHeight: '1.9',
        fontSize: '15px'
      }}
    >
      {children}
    </div>
  </div>
)

export default function PrivacyPolicy() {
  return (
    <PolicyPage title="Privacy Policy">
      <Section title="Introduction">
        <p>
          At Sai Infotech, we are committed to protecting your privacy and ensuring
          that your personal information is handled securely and responsibly.
          This Privacy Policy explains how we collect, use, store, and protect
          the information you provide while using our website and services.
        </p>
      </Section>

      <Section title="Information We Collect">
  <p>
    The information we collect depends on the products or services you
    request from our Team. Depending on your Product, we may collect the following information:
  </p>

 <ul
  style={{
    paddingLeft: '24px',
    lineHeight: '2',
    color: '#475569',
    marginTop: '10px',
    columns: '2 250px',
    columnGap: '40px'
  }}
>
    <li>Full Name</li>
    <li>Email Address</li>
    <li>Phone Number</li>
    <li>Billing and Shipping Address</li>
    <li>Payment Information</li>
    <li>Order and Purchase History</li>
    <li>Device, Browser, and Usage Information</li>
    <li>
      For rental services, we may require identity verification documents
      such as an Aadhaar Card, PAN Card, or other government-issued
      identification as applicable.
    </li>
    <li>
      Additional information may be requested depending on the type of
      product, rental service, repair service, or support request.
    </li>
  </ul>
</Section>

      <Section title="How We Use Your Information">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>To process and deliver your orders</li>
          <li>To provide customer support and technical assistance</li>
          <li>To send order confirmations and shipping updates</li>
          <li>To improve our website, products, and services</li>
          <li>To prevent fraudulent transactions and unauthorized activities</li>
          <li>To comply with legal and regulatory requirements</li>
        </ul>
      </Section>

      <Section title="Information Sharing">
        <p>
          Sai Infotech does not sell, rent, or trade your personal information
          to third parties. We may share information only with trusted service
          providers such as payment gateways, courier partners, and technical
          support providers who assist us in operating our business and are
          obligated to keep your information confidential.
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We implement industry-standard security measures to protect your
          personal information against unauthorized access, disclosure,
          alteration, or destruction. While we strive to protect your data,
          no method of internet transmission is completely secure.
        </p>
      </Section>

      <Section title="Cookies and Tracking Technologies">
        <p>
          Our website may use cookies and similar technologies to enhance user
          experience, remember preferences, and analyze website traffic. You
          may disable cookies through your browser settings; however, some
          features of the website may not function properly.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          You may request access to, correction of, or deletion of your personal
          information by contacting us. We will make reasonable efforts to
          respond to such requests in accordance with applicable laws.
        </p>
      </Section>

      <Section title="Policy Updates">
        <p>
          Sai Infotech reserves the right to update this Privacy Policy at any
          time. Changes will be posted on this page with an updated revision
          date. Continued use of our services constitutes acceptance of the
          updated policy.
        </p>
      </Section>

      <Section title="Contact Us">
        <p>
          If you have any questions regarding this Privacy Policy or your
          personal information, please contact us:
        </p>
        <div
  style={{
    background: '#f8fafc',
    padding: '18px',
    borderRadius: '12px',
    border: '1px solid #e2e8f0'
  }}
>
  <p style={{ margin: '0 0 10px 0' }}>
    <strong>Email:</strong> ssmb@sais.in
  </p>

  <p style={{ margin: 0 }}>
    <strong>Company:</strong> Sai Infotech
  </p>
</div>
      </Section>
    </PolicyPage>
  )
}