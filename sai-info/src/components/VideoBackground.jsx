import React from 'react'

export default function VideoBackground() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <>
      <div className="video-bg" aria-hidden="true" />
      <div className="video-overlay" aria-hidden="true" />
      {/* Only render animated stars on desktop */}
      {!isMobile && <div className="video-stars" aria-hidden="true" />}
    </>
  )
}