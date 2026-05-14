import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiCpu, FiMinimize2, FiMaximize2 } from 'react-icons/fi'
import { HiOutlineChatAlt2 } from 'react-icons/hi'

/* ─── Knowledge Base ────────────────────────────────────────── */
const KB = {
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy'],
  services: {
    triggers: ['service', 'services', 'what do you do', 'what you offer', 'offerings'],
    response: `We offer **11 specialized IT services** at Sai Infotech:\n\n1. 🔧 **Chip Level Repair** — PCB & motherboard repair\n2. 💾 **Data Recovery** — HDD/SSD & RAID recovery\n3. 📡 **Network Setup** — LAN/WAN, WiFi & enterprise\n4. 🛡️ **Security & Access** — CCTV & biometric systems\n5. 🖥️ **IT Sales/Rentals** — Hardware buy/rent/lease\n6. ☁️ **Cloud Products** — AWS, Azure, GCP migration\n7. 🔩 **Annual Maintenance** — AMC & preventive support\n8. 🖧 **Server/Storage** — Data centre solutions\n9. 🔊 **AV Solutions** — Audio Visual & conferencing\n10. 📹 **CCTV Solutions** — Advanced surveillance systems\n11. 🌬️ **Wind Power Control** — Renewable energy automation\n\nWhich service would you like to know more about?`,
  },
  chipRepair: {
    triggers: ['chip', 'chip level', 'motherboard', 'pcb', 'bga', 'smd', 'ic repair', 'board repair'],
    response: `🔧 **Chip Level Repair**\n\nWe perform precision chip-level diagnostics and repair:\n\n• Motherboard BGA re-balling & IC replacement\n• SMD component repair (capacitors, MOSFETs)\n• GPU/CPU socket repair\n• Power circuit fault tracing\n• Liquid damage recovery\n• All brands: Dell, HP, Lenovo, Apple, ASUS\n\n⏱ Turnaround: **24–72 hours**\n🛡️ Warranty: **3 months**\n\nCall us: +91 99459 81999`,
  },
  dataRecovery: {
    triggers: ['data', 'data recovery', 'hdd', 'ssd', 'hard drive', 'lost data', 'deleted', 'corrupt', 'raid', 'nvme'],
    response: `💾 **Data Recovery**\n\nWe recover data from virtually any scenario:\n\n• Failed/clicking hard drives\n• SSD & NVMe NAND recovery\n• RAID 0/1/5/6 reconstruction\n• Formatted/corrupted partitions\n• Accidentally deleted files\n• Fire/flood-damaged drives\n\n⏱ Turnaround: **24–48 hours**\n🛡️ Guarantee: **100% data integrity**\n\n📞 Call: +91 99459 81999`,
  },
  networking: {
    triggers: ['network', 'wifi', 'lan', 'wan', 'router', 'switch', 'firewall', 'vpn', 'cabling', 'internet'],
    response: `📡 **Network Setup & Management**\n\nEnterprise-grade networking solutions:\n\n• Structured cabling (CAT6/CAT6A)\n• Managed switches, routers & firewalls\n• Enterprise WiFi (Cisco, Ubiquiti, Ruckus)\n• SD-WAN & VPN configuration\n• 24/7 network monitoring\n• ISP coordination & failover\n\n⏱ Installation: **1–3 days**\n🛡️ Support: **1 year**\n\n📞 Call: +91 99459 81999`,
  },
  cloud: {
    triggers: ['cloud', 'aws', 'azure', 'gcp', 'google cloud', 'microsoft 365', 'office 365', 'migration', 'backup'],
    response: `☁️ **Cloud Products & Migration**\n\nFull-stack cloud services:\n\n• AWS, Azure & GCP migration\n• Microsoft 365 & Google Workspace\n• Cloud cost optimisation (FinOps)\n• Backup-as-a-Service & disaster recovery\n• Azure AD & identity management\n• Cloud security & compliance\n\n⏱ Migration: **1–4 weeks**\n🛡️ Ongoing managed support included\n\n📞 Call: +91 99459 81999`,
  },
  amc: {
    triggers: ['amc', 'annual maintenance', 'maintenance contract', 'preventive', 'support contract', 'maintenance'],
    response: `🔩 **Annual Maintenance Contract (AMC)**\n\nProactive IT care with guaranteed SLAs:\n\n• Quarterly on-site preventive visits\n• **4-hour response SLA** for critical issues\n• Patch management & OS updates\n• Endpoint security monitoring\n• Hardware replacement pool access\n• Monthly health & performance reports\n\n⏱ Response: **4 hours**\n🛡️ Guaranteed uptime SLA included\n\n📞 Call: +91 99459 81999`,
  },
  security: {
    triggers: ['cctv', 'camera', 'security', 'access control', 'biometric', 'surveillance', 'nvr', 'dvr'],
    response: `🛡️ **Security & Access Control**\n\nSmart surveillance solutions:\n\n• 2MP–8MP IP & analog CCTV cameras\n• NVR/DVR with remote mobile viewing\n• Biometric attendance & door access\n• AI video analytics & motion alerts\n• HR & ERP system integration\n• Preventive maintenance included\n\n⏱ Installation: **1–2 days**\n🛡️ Hardware warranty: **1 year**\n\n📞 Call: +91 99459 81999`,
  },
  rental: {
    triggers: ['rental', 'rent', 'lease', 'hire', 'borrow', 'laptop rent', 'projector', 'led screen', 'it rental'],
    response: `🖥️ **IT Sales & Rentals**\n\nFlexible hardware for every need:\n\n• Laptop & desktop rentals (daily/monthly/yearly)\n• Projector & LED wall rentals\n• Server & networking equipment\n• Bulk procurement with OEM warranty\n• On-site setup & asset management\n• End-of-life buyback available\n\n⏱ Delivery: **Same-day (Bengaluru)**\n🛡️ Full replacement guarantee\n\n📞 Call: +91 99459 81999`,
  },
  server: {
    triggers: ['server', 'storage', 'nas', 'san', 'vmware', 'hyper-v', 'rack', 'data centre', 'virtualisation'],
    response: `🖧 **Server & Storage Solutions**\n\nEnterprise-grade infrastructure:\n\n• Dell, HP & Lenovo server procurement\n• SAN/NAS storage configuration\n• Hyper-V & VMware virtualisation\n• Server room design & UPS setup\n• Tape & disk backup systems\n• SNMP/IPMI health monitoring\n\n⏱ Deployment: **2–5 days**\n🛡️ Support: **1 year contract**\n\n📞 Call: +91 99459 81999`,
  },
  avSolutions: {
    triggers: ['av', 'audio visual', 'conference', 'conferencing', 'video conference', 'projector', 'presentation', 'boardroom', 'meeting room'],
    response: `🔊 **AV Solutions**\n\nCrystal-clear communication systems:\n\n• Video conferencing (Zoom Rooms, MS Teams)\n• Professional audio & microphone systems\n• Projectors & interactive displays\n• Digital signage & LED video walls\n• Conference room automation\n• Complete installation & support\n\n⏱ Installation: **2–4 days**\n🛡️ Hardware warranty: **1 year**\n\n📞 Call: +91 99459 81999`,
  },
  cctvSolutions: {
    triggers: ['cctv solution', 'surveillance', 'monitoring', 'ip camera', '4k camera', 'security camera', 'video surveillance'],
    response: `📹 **CCTV Solutions**\n\nAdvanced surveillance systems:\n\n• 4K IP & HD analog cameras\n• NVR/DVR with cloud backup\n• AI-powered motion detection\n• Mobile app remote viewing\n• Night vision & weatherproof cameras\n• 24/7 monitoring integration\n\n⏱ Installation: **1–3 days**\n🛡️ Hardware warranty: **2 years**\n\n📞 Call: +91 99459 81999`,
  },
  windPower: {
    triggers: ['wind power', 'wind energy', 'renewable', 'scada', 'wind turbine', 'energy control', 'industrial automation'],
    response: `🌬️ **Wind Power Control**\n\nSmart renewable energy systems:\n\n• Wind turbine monitoring & control\n• SCADA system integration\n• Real-time performance analytics\n• Remote diagnostics & alerts\n• Energy optimization systems\n• Preventive maintenance scheduling\n\n⏱ Deployment: **1–2 weeks**\n🛡️ Support: **1 year contract**\n\n📞 Call: +91 99459 81999`,
  },
  contact: {
    triggers: ['contact', 'call', 'phone', 'email', 'address', 'location', 'visit', 'reach', 'where are you'],
    response: `📍 **Contact Sai Infotech**\n\n📞 **Phone:** +91 99459 81999\n📧 **Email:** info@saiinfotech.in\n🗺️ **Location:** Bengaluru (Bangalore), Karnataka, India\n\n🕐 **Working Hours:**\nMon–Sat: 9:00 AM – 7:00 PM\n\n💬 **WhatsApp:** [Chat with us](https://wa.me/919945981999)\n\nOr scroll down to our **Contact** section to send a message!`,
  },
  pricing: {
    triggers: ['price', 'pricing', 'cost', 'charge', 'fee', 'quote', 'how much', 'rate'],
    response: `💰 **Pricing & Quotes**\n\nPricing varies based on your specific requirements. We offer:\n\n• **Free initial consultation** for all services\n• Transparent, no-hidden-cost estimates\n• Flexible packages for SMEs & enterprises\n• AMC plans starting from ₹500/device/month\n• Rental plans from ₹500/day\n\nFor an accurate quote, please:\n📞 Call us: **+91 99459 81999**\n📝 Or use our **Contact form** below\n\nWe respond within 30 minutes!`,
  },
  about: {
    triggers: ['about', 'who are you', 'company', 'sai infotech', 'history', 'since', 'experience', 'years'],
    response: `🏢 **About Sai Infotech**\n\nFounded in **2019**, Sai Infotech is a premium IT services company based in **Bangalore, India**.\n\n✅ **5+ years** of proven excellence\n✅ **ISO certified** quality management\n✅ **50+ enterprise clients** across Bengaluru\n✅ Specialists in hardware, networking & cloud\n✅ Dedicated team of certified engineers\n\nWe combine technical expertise with fast turnaround times and transparent pricing — so your business never skips a beat.\n\n📞 +91 99459 81999`,
  },
  thanks: {
    triggers: ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect', 'helpful', 'good'],
    response: `😊 You're welcome! Is there anything else I can help you with?\n\nFeel free to ask about any of our services, pricing, or just give us a call at **+91 99459 81999** — we're happy to help!`,
  },
  bye: {
    triggers: ['bye', 'goodbye', 'see you', 'cya', 'take care', 'later'],
    response: `👋 Thanks for chatting with Sai Infotech! Have a great day.\n\nRemember, we're always here at **+91 99459 81999** whenever you need IT support. Take care! 🙏`,
  },
}

const QUICK_REPLIES = [
  { label: '🔧 Chip Repair', key: 'chip level repair services' },
  { label: '💾 Data Recovery', key: 'data recovery service' },
  { label: '📡 Networking', key: 'network setup services' },
  { label: '☁️ Cloud', key: 'cloud migration services' },
  { label: '📹 CCTV', key: 'cctv surveillance solutions' },
  { label: '🔊 AV Systems', key: 'audio visual conference systems' },
  { label: '📞 Contact', key: 'contact information' },
]

function getBotResponse(text) {
  const lower = text.toLowerCase().trim()

  // Greetings
  if (KB.greetings.some(g => lower.includes(g))) {
    return `👋 Hello! Welcome to **Sai Infotech** — your trusted IT partner in Bangalore since 2019!\n\nI can help you with information about our services, pricing, and support. What can I assist you with today?\n\nYou can also reach us directly at **+91 99459 81999** 🙂`
  }

  // Match knowledge base
  for (const [, item] of Object.entries(KB)) {
    if (item.triggers && item.triggers.some(t => lower.includes(t))) {
      return item.response
    }
  }

  // Fallback
  return `🤔 I'm not sure about that specific query, but I'm here to help!\n\nYou can ask me about:\n• Our IT services (repair, networking, cloud, etc.)\n• Data recovery & chip-level repair\n• Pricing & AMC plans\n• Contact information\n\nOr give us a call: **+91 99459 81999** — our team responds in under 30 minutes! 🚀`
}

function formatMessage(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')
    .replace(/• /g, '&nbsp;&nbsp;• ')
}

export default function AIChat() {
  const [open, setOpen] = useState(false)
  const [minimised, setMinimised] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: `👋 Hi! I'm **SAI**, your AI assistant at Sai Infotech.\n\nHow can I help you today? Ask me about our IT services, pricing, or support! 🚀`,
      time: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, typing])

  useEffect(() => {
    if (open && !minimised && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open, minimised])

  const sendMessage = (text = input) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const userMsg = { role: 'user', text: trimmed, time: new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    const delay = 800 + Math.random() * 700
    setTimeout(() => {
      const botReply = getBotResponse(trimmed)
      setTyping(false)
      setMessages(prev => [...prev, { role: 'bot', text: botReply, time: new Date() }])
    }, delay)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', damping: 16, stiffness: 200 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 z-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
              boxShadow: '0 0 40px rgba(14,165,233,0.5), 0 8px 30px rgba(0,0,0,0.5)',
            }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <HiOutlineChatAlt2 className="text-white w-8 h-8" />
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-2xl animate-ping opacity-25"
              style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)' }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 230 }}
            className="fixed bottom-6 left-6 z-50 w-[360px] sm:w-[380px] rounded-3xl overflow-hidden shadow-2xl"
            style={{
              background: 'linear-gradient(145deg, rgba(8,12,28,0.98), rgba(12,18,40,0.98))',
              border: '1px solid rgba(14,165,233,0.35)',
              boxShadow: '0 0 60px rgba(14,165,233,0.2), 0 30px 80px rgba(0,0,0,0.7)',
              maxHeight: minimised ? 'auto' : '580px',
            }}
          >
            {/* Top glow bar */}
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #8b5cf6, #0ea5e9, #06b6d4)' }} />

            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: minimised ? 'none' : '1px solid rgba(255,255,255,0.07)', background: 'rgba(14,165,233,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)', boxShadow: '0 0 20px rgba(14,165,233,0.5)' }}
                >
                  <FiCpu className="text-white w-5 h-5" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">SAI Assistant</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-[11px]">Online • Sai Infotech</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMinimised(m => !m)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  {minimised ? <FiMaximize2 size={13} /> : <FiMinimize2 size={13} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.07)' }}
                >
                  <FiX size={14} />
                </button>
              </div>
            </div>

            {/* Body */}
            <AnimatePresence>
              {!minimised && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Messages */}
                  <div className="px-4 py-4 space-y-4 overflow-y-auto" style={{ height: '340px' }}>
                    {messages.map((msg, i) => (
                      <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        {msg.role === 'bot' && (
                          <div
                            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 self-end"
                            style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)' }}
                          >
                            <FiCpu className="text-white w-4 h-4" />
                          </div>
                        )}
                        <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                          <div
                            className="px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed"
                            style={
                              msg.role === 'user'
                                ? {
                                    background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)',
                                    color: '#fff',
                                    borderBottomRightRadius: '6px',
                                    boxShadow: '0 2px 12px rgba(14,165,233,0.3)',
                                  }
                                : {
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.09)',
                                    color: '#e2e8f0',
                                    borderBottomLeftRadius: '6px',
                                  }
                            }
                            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                          />
                          <span className="text-[10px] text-slate-600 mt-1 px-1">{formatTime(msg.time)}</span>
                        </div>
                      </div>
                    ))}

                    {/* Typing indicator */}
                    {typing && (
                      <div className="flex gap-2.5 items-end">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)' }}
                        >
                          <FiCpu className="text-white w-4 h-4" />
                        </div>
                        <div
                          className="px-4 py-3 rounded-2xl flex gap-1.5 items-center"
                          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}
                        >
                          {[0, 1, 2].map(j => (
                            <span
                              key={j}
                              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                              style={{ animation: `bounce 1.2s ease-in-out ${j * 0.2}s infinite` }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  <div className="px-4 pb-2">
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                      {QUICK_REPLIES.map((qr, i) => (
                        <button
                          key={i}
                          onClick={() => sendMessage(qr.key)}
                          className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:opacity-90 active:scale-95"
                          style={{
                            background: 'rgba(14,165,233,0.12)',
                            border: '1px solid rgba(14,165,233,0.3)',
                            color: '#38bdf8',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {qr.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input */}
                  <div className="px-4 pb-4 pt-2">
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about our services..."
                        className="flex-1 bg-transparent text-slate-200 text-xs placeholder-slate-600 outline-none"
                      />
                      <button
                        onClick={() => sendMessage()}
                        disabled={!input.trim()}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-90 disabled:opacity-30"
                        style={{ background: 'linear-gradient(135deg, #0ea5e9, #8b5cf6)', boxShadow: '0 2px 10px rgba(14,165,233,0.4)' }}
                      >
                        <FiSend className="text-white w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bounce keyframe injection */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  )
}
