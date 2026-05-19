import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone, FiX } from 'react-icons/fi'

export default function FloatingButtons() {

  const [open, setOpen] = useState(false)

  return (

    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">

      <AnimatePresence>

        {open && (

          <>

            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/917676952139"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 bg-[#25d366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#22c55e] transition-colors"
            >

              <FaWhatsapp size={20} />

              <span className="text-sm font-semibold">
                WhatsApp
              </span>

            </motion.a>

            {/* Call */}
            <motion.a
              href="tel:+917676952139"
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ duration: 0.2, delay: 0.05 }}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >

              <FiPhone size={18} />

              <span className="text-sm font-semibold">
                Call Now
              </span>

            </motion.a>

          </>

        )}

      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-xl wa-pulse"
      >

        <AnimatePresence mode="wait">

          {open ? (

            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <FiX size={22} />
            </motion.span>

          ) : (

            <motion.span
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <FaWhatsapp size={26} />
            </motion.span>

          )}

        </AnimatePresence>

      </motion.button>

    </div>
  )
}