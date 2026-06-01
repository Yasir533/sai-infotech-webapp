import React from 'react'
import { motion } from 'framer-motion'
import logoImg from '../assets/logo.png'

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f1e]">
      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Logo Image with glow animation */}
        <div className="relative">
          <motion.img
            src={logoImg}
            alt="SAI INFOTECH"
            className="h-32 w-auto object-contain relative z-10"
            style={{ filter: 'drop-shadow(0 0 18px rgba(6,182,212,0.7)) drop-shadow(0 0 8px rgba(37,99,235,0.5))' }}
            animate={{
              filter: [
                'drop-shadow(0 0 14px rgba(6,182,212,0.6)) drop-shadow(0 0 6px rgba(37,99,235,0.4))',
                'drop-shadow(0 0 28px rgba(6,182,212,0.95)) drop-shadow(0 0 14px rgba(37,99,235,0.7))',
                'drop-shadow(0 0 14px rgba(6,182,212,0.6)) drop-shadow(0 0 6px rgba(37,99,235,0.4))',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 blur-2xl animate-pulse" />
        </div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <p className="text-slate-400 text-sm mt-1 tracking-wider">IT SOLUTIONS & SERVICES</p>
        </motion.div>

        {/* Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="loader-ring w-10 h-10" />
          <p className="text-slate-500 text-xs tracking-widest animate-pulse">INITIALIZING...</p>
        </motion.div>
      </motion.div>
    </div>
  )
}