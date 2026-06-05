import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function PolicyPage({ title, children }) {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Segoe UI', sans-serif" }}>
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
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.01em' }}>
          SAI INFOTECH
        </span>
      </div>

      {/* Page Title Banner */}
      <div style={{
        background:'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #2f6fbf 100%)',
        padding: '70px 24px 60px',
        textAlign: 'center',
      }}>
        <h1 style={{
          color: '#fff',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
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
          margin: '16px auto 0',
        }} />
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '900px',
        margin: '-40px auto 0',
        padding: '48px 24px 80px',
        position: 'relative',
        zIndex: 10,
      }}>
        <div style={{
  background: '#fff',
  borderRadius: '20px',
  padding: 'clamp(24px, 5vw, 48px)',
  boxShadow: '0 10px 40px rgba(15,23,42,0.08)',
  color: '#334155',
  fontSize: '0.97rem',
  lineHeight: '1.75',
  overflow: 'hidden'
}}>

  {/* Intro Banner */}
  <div
    style={{
      background: 'linear-gradient(135deg, #2f6fbf 0%, #1e40af 100%)',
      color: '#fff',
      padding: '32px',
      borderRadius: '16px',
      marginBottom: '32px',
      boxShadow: '0 10px 30px rgba(47,111,191,0.25)'
    }}
  >
    <h2
      style={{
        margin: '0 0 12px 0',
        fontSize: '1.8rem',
        fontWeight: 700
      }}
    >
      Privacy & Data Protection
    </h2>

    <p
      style={{
        margin: 0,
        lineHeight: '1.8',
        opacity: 0.95
      }}
    >
      Sai Infotech values your privacy and is committed to safeguarding your
      personal information. This policy explains how we collect, use, store,
      and protect your data while providing our products and services.
    </p>
  </div>

  {children}
</div>

        {/* Footer note */}
        <p style={{
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.82rem',
          marginTop: '32px',
        }}>
          © {new Date().getFullYear()} SAI INFOTECH. All rights reserved. · Basavanagudi, Bangalore
        </p>
      </div>
    </div>
  )
}
