import React from 'react'
import { useNavigate } from 'react-router-dom'
import logoIcon from '../assets/logo-icon-sm.png'

export default function PolicyPage({ title, children }) {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: "'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #2f6fbf 100%)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '8px',
            color: '#fff',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background 0.2s',
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          ← Back to Home
        </button>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>|</span>
        <img src={logoIcon} alt="SAI INFOTECH" style={{ height: '36px', objectFit: 'contain' }} />
      </div>

      {/* Page Title Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2f6fbf 100%)',
        padding: '50px 24px 80px',
        textAlign: 'center',
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          fontWeight: 800,
          margin: 0,
        }}>
          {title}
        </h1>
        <div style={{
          width: '60px',
          height: '4px',
          background: 'rgba(255,255,255,0.5)',
          borderRadius: '2px',
          margin: '14px auto 0',
        }} />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '860px',
        margin: '-40px auto 0',
        padding: '0 20px 60px',
        position: 'relative',
        zIndex: 10,
      }}>

        {/* Jurisdiction Notice */}
        <div style={{
          background: '#fff7ed',
          border: '1px solid #fdba74',
          borderLeft: '5px solid #ea580c',
          padding: '18px 20px',
          borderRadius: '12px',
          marginBottom: '16px',
          color: '#7c2d12',
          lineHeight: '1.8',
          fontSize: '0.95rem'
        }}>
          <strong>Jurisdiction & Governing Law:</strong>
          <br />
          All disputes arising out of any vendor agreements, service contracts,
          sales contracts, or related transactions shall be governed by and
          construed in accordance with the laws of India. Any dispute or
          difference whatsoever shall be subject to the exclusive jurisdiction
          of the courts located in Bangalore, India.
        </div>

        <div style={{
          background: '#fff',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 40px rgba(15,23,42,0.10)',
        }}>
          {children}
        </div>

        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.82rem',
          marginTop: '28px',
        }}>
          © {new Date().getFullYear()} SAI INFOTECH. All rights reserved. · Basavanagudi, Bangalore
        </p>
      </div>
    </div>
  )
}