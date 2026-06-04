import React from 'react'
import PolicyPage from './PolicyPage'

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2
      style={{
        fontSize: '1.2rem',
        fontWeight: 700,
        color: '#0f172a',
        borderLeft: '4px solid #2f6fbf',
        paddingLeft: '12px',
        marginBottom: '12px'
      }}
    >
      {title}
    </h2>
    {children}
  </div>
)

export default function EWasteManagement() {
  return (
    <PolicyPage title="E-Waste Management Solutions">

      <Section title="About GRKMS">
        <p>
          Global Resource Knowledge Management Service (GRKMS) is a leading
          E-Waste Management Company specializing in IT Asset Disposition,
          Asset Remarketing, Secure Data Destruction, Logistics and
          Sustainable Recycling Services across India.
        </p>

        <p>
          Established in 2010, GRKMS brings over 20 years of industry
          expertise in environmentally responsible recycling and IT asset
          lifecycle management.
        </p>
      </Section>

      <Section title="Services Offered">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>IT Asset Disposition Services (ITAD)</li>
          <li>IT Asset Remarketing Services (ITAR)</li>
          <li>Secure Data Destruction Services</li>
          <li>Asset Decommissioning & Installation</li>
          <li>Secure Logistics & Transportation</li>
          <li>E-Waste Collection & Recycling</li>
        </ul>
      </Section>

      <Section title="Why Choose GRKMS">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>KSPCB Authorized E-Waste Recycler</li>
          <li>ISO 14001:2015 Certified</li>
          <li>ISO 45001:2018 Certified</li>
          <li>ISO 9001 Certified</li>
          <li>R2 Certified Recycler</li>
          <li>Nationwide Collection and Recycling Support</li>
        </ul>
      </Section>

      <Section title="The 6R Sustainability Approach">
        <p>
          GRKMS follows the globally accepted 6R framework:
        </p>

        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Refuse</li>
          <li>Reduce</li>
          <li>Rethink</li>
          <li>Reuse</li>
          <li>Repair</li>
          <li>Recycle</li>
        </ul>

        <p>
          Our mission is to minimize waste generation and maximize
          environmental sustainability.
        </p>
      </Section>

      <Section title="Secure Data Destruction">
        <p>
          Data security is our highest priority. We provide secure and
          certified data destruction services for organizations looking to
          dispose of IT assets safely.
        </p>

        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Onsite and Offsite Data Destruction</li>
          <li>Hard Drive Degaussing</li>
          <li>SSD Destruction</li>
          <li>Bulk Hard Disk Shredding</li>
          <li>NIST 800-88 Compliant Erasure</li>
          <li>Data Destruction Certificates</li>
        </ul>
      </Section>

      <Section title="IT Asset Recovery & Remarketing">
        <p>
          Before recycling, GRKMS evaluates equipment for reuse and
          remarketing opportunities to maximize asset value recovery.
        </p>

        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Refurbishment</li>
          <li>Redeployment</li>
          <li>Reselling</li>
          <li>Value Recovery</li>
          <li>Asset Tracking & Reporting</li>
        </ul>
      </Section>

      <Section title="Logistics & Transportation">
        <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
          <li>Safe Packing of IT Assets</li>
          <li>Secure Transportation</li>
          <li>Material Handling & Movement</li>
          <li>Asset Inspection & Segregation</li>
          <li>Recycling & Resale Processing</li>
        </ul>
      </Section>

      <Section title="Our Commitment">
        <p>
          Recycle Today for a Better Tomorrow.
        </p>

        <p>
          GRKMS is committed to providing safe, secure and environmentally
          responsible E-Waste management solutions while helping
          organizations achieve sustainability goals and regulatory
          compliance.
        </p>
      </Section>

    </PolicyPage>
  )
}