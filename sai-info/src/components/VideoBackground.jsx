import React, { useRef, useEffect } from 'react'

export default function VideoBackground() {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true

    const tryPlay = () => { if (video.paused) video.play().catch(() => {}) }

    // Initial play
    const p = video.play()
    if (p !== undefined) {
      p.catch(() => {
        const resume = () => video.play().catch(() => {})
        document.addEventListener('click', resume, { once: true })
        document.addEventListener('touchstart', resume, { once: true })
      })
    }

    // Resume after file-picker / camera dialog / getUserMedia steals focus
    const onVisibility = () => { if (document.visibilityState === 'visible') tryPlay() }
    const onFocus = () => tryPlay()
    const onPageShow = () => tryPlay()

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', onFocus)
    window.addEventListener('pageshow', onPageShow)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  return (
    <>
      {/* ── Fixed full-screen video ── */}
      <video
        ref={videoRef}
        className="video-bg"
        src="/bg-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* ── Dark overlay for text readability ── */}
      <div className="video-overlay" aria-hidden="true" />
    </>
  )
}
