import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'

export default function FloatingButtons() {
  return (
    <a
      href="https://wa.me/918310338544"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.35)] wa-pulse hover:scale-105 transition-transform"
    >
      <FaWhatsapp size={26} />
    </a>
  )
}