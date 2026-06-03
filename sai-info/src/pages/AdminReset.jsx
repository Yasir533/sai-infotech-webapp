import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getApiBase } from '../utils/apiBase'

const OTP_LENGTH = 6

export default function AdminReset() {
  const API_BASE = getApiBase()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const otpRefs = useRef([])

  useEffect(() => {
    otpRefs.current[0]?.focus()
  }, [])

  const otpValue = useMemo(() => otp.join(''), [otp])

  const setOtpAtIndex = (index, value) => {
    const nextValue = value.replace(/\D/g, '').slice(-1)
    setOtp((current) => {
      const next = [...current]
      next[index] = nextValue
      return next
    })

    if (nextValue && index < OTP_LENGTH - 1) {
      otpRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const sendOtp = async (isResend = false) => {
    setLoading(!isResend)
    setResendLoading(isResend)
    setMessage('')
    setError('')

    try {
      let response = await fetch(`${API_BASE}/api/admin/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.status === 404) {
        response = await fetch(`${API_BASE}/api/admin/forgot`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        })
      }

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.message || 'Failed to send OTP')
        return
      }

      if (data.resolvedEmail) {
        setEmail(data.resolvedEmail)
      }
      setStep(2)
      setMessage('OTP sent to your registered email.')
      setOtp(Array(OTP_LENGTH).fill(''))
      otpRefs.current[0]?.focus()
    } catch (err) {
      console.log('Send OTP error', err)
      setError('Server error')
    } finally {
      setLoading(false)
      setResendLoading(false)
    }
  }

  const verifyOtp = async () => {
    if (otpValue.length !== OTP_LENGTH) {
      setError('Enter the 6-digit OTP')
      return
    }

    setLoading(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch(`${API_BASE}/api/admin/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.message || 'Invalid OTP')
        return
      }

      if (data.resolvedEmail) {
        setEmail(data.resolvedEmail)
      }
      setResetToken(data.resetToken || '')
      setStep(3)
      setMessage('OTP verified. Create your new password.')
    } catch (err) {
      console.log('Verify OTP error', err)
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (event) => {
    event.preventDefault()

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch(`${API_BASE}/api/admin/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resetToken,
          newPassword,
          confirmPassword,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        setError(data.message || 'Failed to reset password')
        return
      }

      setStep(4)
      setMessage('Password updated successfully. Redirecting to login...')
      localStorage.removeItem('adminToken')
      setTimeout(() => navigate('/admin'), 1600)
    } catch (err) {
      console.log('Reset password error', err)
      setError('Server error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10">
        <div className="grid w-full gap-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative hidden overflow-hidden border-r border-slate-200 bg-slate-50 p-10 lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.08),transparent_35%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Admin security</p>
                <h1 className="mt-4 max-w-md text-4xl font-semibold tracking-tight text-slate-900">Reset access with a secure OTP flow.</h1>
                <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">
                  Enter the registered admin email, verify the 6-digit OTP sent by email, and set a new password without exposing the code in the UI.
                </p>
              </div>

              <div className="grid gap-4 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">OTP expires in 5 minutes.</div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">Passwords are stored with bcrypt hashing.</div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">Reset session uses a short-lived JWT.</div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-600">Forgot password</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Admin password reset</h2>
              </div>
              <Link to="/admin" className="rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-600 transition hover:border-cyan-500 hover:text-cyan-700 hover:bg-slate-50">
                Back to login
              </Link>
            </div>

            <div className="mb-6 flex items-center gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`h-2 flex-1 rounded-full ${step >= item ? 'bg-gradient-to-r from-sky-500 to-cyan-400' : 'bg-slate-200'}`}
                />
              ))}
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Registered email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500"
                    placeholder="admin@company.com"
                  />
                </div>

                {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>}
                {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}

                <button
                  type="button"
                  onClick={() => sendOtp(false)}
                  disabled={loading || !email}
                  className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-slate-600">Enter the 6-digit code sent to {email}.</p>
                  <div className="mt-4 grid grid-cols-6 gap-2 sm:gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(element) => {
                          otpRefs.current[index] = element
                        }}
                        value={digit}
                        onChange={(event) => setOtpAtIndex(index, event.target.value)}
                        onKeyDown={(event) => handleOtpKeyDown(index, event)}
                        inputMode="numeric"
                        maxLength={1}
                        className="h-14 rounded-2xl border border-slate-300 bg-white text-center text-xl font-semibold text-slate-900 outline-none transition focus:border-cyan-500"
                      />
                    ))}
                  </div>
                </div>

                {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>}
                {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={verifyOtp}
                    disabled={loading}
                    className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                  <button
                    type="button"
                    onClick={() => sendOtp(true)}
                    disabled={resendLoading}
                    className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-cyan-500 hover:text-cyan-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {resendLoading ? 'Resending...' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={resetPassword} className="space-y-5">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  OTP verified for <span className="font-medium text-slate-900">{email}</span>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">New password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500"
                    placeholder="Minimum 6 characters"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500"
                    placeholder="Re-enter the new password"
                  />
                </div>

                {error && <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">{error}</div>}
                {message && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Saving Password...' : 'Save Password'}
                </button>
              </form>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/admin"
                    className="flex-1 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Go to login
                  </Link>
                </div>
              </div>
            )}

            <p className="mt-6 text-xs leading-5 text-slate-500">
              If the OTP expires, request a new code from the first step. Passwords are stored with bcrypt and the temporary OTP record is removed automatically after expiry or successful verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}