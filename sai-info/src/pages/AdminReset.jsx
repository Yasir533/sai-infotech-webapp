import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function AdminReset() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) setMessage('Missing token in URL')
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch('http://localhost:5000/api/admin/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok) {
        setMessage('Password updated. Redirecting to admin...')
        setTimeout(() => navigate('/admin'), 1500)
      } else {
        setMessage(data.message || 'Reset failed')
      }
    } catch (err) {
      console.log('Reset submit error', err)
      setMessage('Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/80 p-8">
        <h2 className="text-xl font-semibold mb-4">Reset Admin Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-800/60 py-3 px-4 text-sm outline-none focus:border-cyan-500"
            />
          </div>

          {message && <div className="text-sm text-rose-400">{message}</div>}

          <div className="flex gap-3">
            <button disabled={loading} className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 py-2 text-sm font-semibold">
              {loading ? 'Saving...' : 'Save New Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
