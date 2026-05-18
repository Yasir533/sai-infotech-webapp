import React from 'react'

export default function VideoBackground() {
  return (
    <>
      {/* ── Fixed full-screen background image ── */}
      <img
        className="video-bg"
        src="/bg.jpeg"
        alt="background"
        aria-hidden="true"
      />

      {/* ── Dark overlay for text readability ── */}
      <div className="video-overlay" aria-hidden="true" />
    </>
  )
}
