import React, { useState, useEffect, useRef } from 'react'
import {
  Phone, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2, ShieldCheck,
  Building2, UserRound, MapPin, Check, RefreshCw, KeyRound, Sparkles
} from 'lucide-react'
import { DEMO_USERS, findDemoUserByPhone, MOCK_VALID_OTP } from '@/mocks/auth'

// DocMatrix Brand Cross Mark
function MedicalCrossMark({ light = false }) {
  return (
    <span className={`medical-cross-mark ${light ? 'mark-light' : ''}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  )
}

const INDIAN_STATES = [
  'Kerala', 'Tamil Nadu', 'Karnataka', 'Maharashtra', 'Andhra Pradesh',
  'Telangana', 'Delhi', 'Gujarat', 'Uttar Pradesh', 'West Bengal'
]

const CLINIC_TYPES = [
  'Solo dentist',
  'Multi-dentist clinic',
  'Clinic chain'
]

export default function AuthPage({
  view = 'login',
  onNavigate,
  onBackHome,
  onLoginSuccess
}) {
  const isLogin = view === 'login'

  // Step state: 1 = Phone / Details, 2 = 6-digit Code Verification
  const [step, setStep] = useState(1)

  // Login Phone State
  const [phone, setPhone] = useState('+910000000101')
  const [phoneError, setPhoneError] = useState('')

  // 6-digit OTP Verification State
  const [code, setCode] = useState('')
  const [codeError, setCodeError] = useState('')
  const [wrongTries, setWrongTries] = useState(0)
  const [resendCountdown, setResendCountdown] = useState(60)
  const [timerActive, setTimerActive] = useState(false)

  // Sign-up Form State
  const [signupForm, setSignupForm] = useState({
    clinicName: '',
    fullName: '',
    phone: '',
    city: '',
    state: 'Kerala',
    clinicType: 'Solo dentist',
    agreeTerms: false,
    whatsappConsent: false
  })
  const [signupErrors, setSignupErrors] = useState({})

  // Resend Countdown Timer
  useEffect(() => {
    let interval = null
    if (timerActive && resendCountdown > 0) {
      interval = setInterval(() => {
        setResendCountdown((prev) => prev - 1)
      }, 1000)
    } else if (resendCountdown === 0) {
      setTimerActive(false)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timerActive, resendCountdown])

  // Handle Request Code (Login Step 1)
  const handleRequestLoginCode = (e) => {
    if (e) e.preventDefault()
    const clean = phone.trim()
    if (!clean) {
      setPhoneError('Please enter your mobile number')
      return
    }
    if (clean.replace(/\D/g, '').length < 10) {
      setPhoneError('Please enter a valid 10-digit mobile number')
      return
    }
    setPhoneError('')
    setStep(2)
    setCode('')
    setCodeError('')
    setWrongTries(0)
    setResendCountdown(60)
    setTimerActive(true)
  }

  // Handle Signup Validation (Signup Step 1)
  const handleRequestSignupCode = (e) => {
    if (e) e.preventDefault()
    const errors = {}
    if (!signupForm.clinicName.trim()) errors.clinicName = 'Clinic name is required'
    if (!signupForm.fullName.trim()) errors.fullName = 'Full name is required'
    if (!signupForm.phone.trim()) {
      errors.phone = 'Mobile number is required'
    } else if (signupForm.phone.replace(/\D/g, '').length < 10) {
      errors.phone = 'Enter a valid 10-digit mobile number'
    }
    if (!signupForm.city.trim()) errors.city = 'City or town is required'
    if (!signupForm.agreeTerms) errors.agreeTerms = 'You must agree to the Terms and Privacy Notice'

    setSignupErrors(errors)
    if (Object.keys(errors).length > 0) return

    setPhone(signupForm.phone)
    setStep(2)
    setCode('')
    setCodeError('')
    setWrongTries(0)
    setResendCountdown(60)
    setTimerActive(true)
  }

  // Handle OTP Submission (Step 2)
  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault()

    if (wrongTries >= 5) {
      setCodeError('Too many tries. Request a new code.')
      return
    }

    if (code !== MOCK_VALID_OTP) {
      const nextTries = wrongTries + 1
      setWrongTries(nextTries)
      if (nextTries >= 5) {
        setCodeError('Too many tries. Request a new code.')
      } else {
        setCodeError("That code didn't work. Check it or request a new one.")
      }
      return
    }

    // Correct code: 123456
    let user
    if (isLogin) {
      user = findDemoUserByPhone(phone) || DEMO_USERS.ORGANIZATION_ADMIN
    } else {
      user = {
        id: 'usr-101',
        name: signupForm.fullName || 'Dr. Clinic Admin',
        role: 'ORGANIZATION_ADMIN',
        clinicName: signupForm.clinicName || 'My Dental Clinic',
        phone: signupForm.phone || '+910000000101',
        clinicId: 'clinic-demo-001'
      }
    }

    // Rule: sessionStorage must hold ONLY the mock user id under "docmatrix-demo-session"
    sessionStorage.setItem('docmatrix-demo-session', user.id)

    if (onLoginSuccess) {
      onLoginSuccess(user)
    }
  }

  // Quick 1-Click Demo Login as any role
  const handleDemoRoleClick = (roleKey) => {
    const roleUser = DEMO_USERS[roleKey]
    if (!roleUser) return
    sessionStorage.setItem('docmatrix-demo-session', roleUser.id)
    if (onLoginSuccess) {
      onLoginSuccess(roleUser)
    }
  }

  const handleResend = () => {
    setCode('')
    setCodeError('')
    setWrongTries(0)
    setResendCountdown(60)
    setTimerActive(true)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper, #fbfbf9)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Brand Bar */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--line, #e9e9e5)',
        padding: '12px clamp(16px, 4vw, 36px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={onBackHome}>
          <MedicalCrossMark />
          <span style={{ fontSize: '15px', fontWeight: '800', letterSpacing: '0.04em', color: 'var(--charcoal-title, #1a2626)' }}>
            DOC MATRIX
          </span>
        </div>

        <button
          onClick={onBackHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            borderRadius: '999px',
            border: '1px solid var(--line, #e9e9e5)',
            background: '#ffffff',
            fontSize: '12px',
            fontWeight: '700',
            color: 'var(--charcoal-dark, #111a1a)',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={13} />
          <span>Back to Home</span>
        </button>
      </header>

      {/* Main Container */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '36px 16px' }}>
        <div style={{ maxWidth: '480px', width: '100%' }}>
          {/* Main Auth Card */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1px solid var(--line, #e9e9e5)',
            padding: '32px clamp(20px, 4vw, 36px)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
            marginBottom: '20px'
          }}>
            {/* View Selector Tabs (Login / Register) */}
            <div style={{ display: 'flex', background: '#f4f6f5', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
              <button
                onClick={() => {
                  setStep(1)
                  setCodeError('')
                  onNavigate('login')
                }}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: '9px',
                  border: 'none',
                  background: isLogin ? '#ffffff' : 'transparent',
                  color: isLogin ? 'var(--charcoal-title, #1a2626)' : 'var(--charcoal-muted, #6e7e7d)',
                  fontSize: '13px',
                  fontWeight: isLogin ? '750' : '600',
                  boxShadow: isLogin ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setStep(1)
                  setCodeError('')
                  onNavigate('signup')
                }}
                style={{
                  flex: 1,
                  padding: '9px',
                  borderRadius: '9px',
                  border: 'none',
                  background: !isLogin ? '#ffffff' : 'transparent',
                  color: !isLogin ? 'var(--charcoal-title, #1a2626)' : 'var(--charcoal-muted, #6e7e7d)',
                  fontSize: '13px',
                  fontWeight: !isLogin ? '750' : '600',
                  boxShadow: !isLogin ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  cursor: 'pointer'
                }}
              >
                Register Practice
              </button>
            </div>

            {/* STEP 1: LOGIN (Phone Input) */}
            {isLogin && step === 1 && (
              <form onSubmit={handleRequestLoginCode}>
                <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '6px' }}>
                  Sign in to Clinic Portal
                </h1>
                <p style={{ fontSize: '13px', color: 'var(--charcoal-body, #475554)', marginBottom: '20px' }}>
                  Enter your registered mobile number to receive a 6-digit verification code.
                </p>

                <div style={{ marginBottom: '18px' }}>
                  <label htmlFor="login-phone" style={{ display: 'block', fontSize: '12px', fontWeight: '750', color: 'var(--charcoal-title, #1a2626)', marginBottom: '6px' }}>
                    Mobile Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={15} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--charcoal-muted, #6e7e7d)' }} />
                    <input
                      id="login-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value)
                        setPhoneError('')
                      }}
                      placeholder="+910000000101"
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 36px',
                        borderRadius: '10px',
                        border: phoneError ? '1px solid #ef4444' : '1px solid var(--line, #e9e9e5)',
                        fontSize: '14px',
                        outline: 'none',
                        background: '#ffffff'
                      }}
                    />
                  </div>
                  {phoneError && <div style={{ fontSize: '11.5px', color: '#dc2626', marginTop: '4px' }}>{phoneError}</div>}
                  <div style={{ fontSize: '11px', color: 'var(--charcoal-muted, #6e7e7d)', marginTop: '6px' }}>
                    Pre-filled with Owner demo account (+910000000101).
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-hero-teal"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: '750',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Request Verification Code</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            {/* STEP 1: SIGN-UP (Practice Details) */}
            {!isLogin && step === 1 && (
              <form onSubmit={handleRequestSignupCode}>
                <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '6px' }}>
                  Register Dental Practice
                </h1>
                <p style={{ fontSize: '12.5px', color: 'var(--charcoal-body, #475554)', marginBottom: '18px' }}>
                  Create your clinic account on the <strong style={{ color: 'var(--teal-primary, #008891)' }}>Free plan</strong>.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
                  <div>
                    <label htmlFor="signup-clinic" style={{ display: 'block', fontSize: '12px', fontWeight: '750', marginBottom: '4px' }}>
                      Clinic Name *
                    </label>
                    <input
                      id="signup-clinic"
                      type="text"
                      value={signupForm.clinicName}
                      onChange={(e) => setSignupForm({ ...signupForm, clinicName: e.target.value })}
                      placeholder="e.g. Kerala Dental Speciality"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: signupErrors.clinicName ? '1px solid #ef4444' : '1px solid var(--line, #e9e9e5)', fontSize: '13px' }}
                    />
                    {signupErrors.clinicName && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '2px' }}>{signupErrors.clinicName}</div>}
                  </div>

                  <div>
                    <label htmlFor="signup-doctor" style={{ display: 'block', fontSize: '12px', fontWeight: '750', marginBottom: '4px' }}>
                      Owner or Doctor Full Name *
                    </label>
                    <input
                      id="signup-doctor"
                      type="text"
                      value={signupForm.fullName}
                      onChange={(e) => setSignupForm({ ...signupForm, fullName: e.target.value })}
                      placeholder="e.g. Dr. Arun Kumar"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: signupErrors.fullName ? '1px solid #ef4444' : '1px solid var(--line, #e9e9e5)', fontSize: '13px' }}
                    />
                    {signupErrors.fullName && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '2px' }}>{signupErrors.fullName}</div>}
                  </div>

                  <div>
                    <label htmlFor="signup-phone" style={{ display: 'block', fontSize: '12px', fontWeight: '750', marginBottom: '4px' }}>
                      Mobile Number *
                    </label>
                    <input
                      id="signup-phone"
                      type="tel"
                      value={signupForm.phone}
                      onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: signupErrors.phone ? '1px solid #ef4444' : '1px solid var(--line, #e9e9e5)', fontSize: '13px' }}
                    />
                    {signupErrors.phone && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '2px' }}>{signupErrors.phone}</div>}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label htmlFor="signup-city" style={{ display: 'block', fontSize: '12px', fontWeight: '750', marginBottom: '4px' }}>
                        City or Town *
                      </label>
                      <input
                        id="signup-city"
                        type="text"
                        value={signupForm.city}
                        onChange={(e) => setSignupForm({ ...signupForm, city: e.target.value })}
                        placeholder="e.g. Kochi"
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '9px', border: signupErrors.city ? '1px solid #ef4444' : '1px solid var(--line, #e9e9e5)', fontSize: '13px' }}
                      />
                      {signupErrors.city && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '2px' }}>{signupErrors.city}</div>}
                    </div>

                    <div>
                      <label htmlFor="signup-state" style={{ display: 'block', fontSize: '12px', fontWeight: '750', marginBottom: '4px' }}>
                        State
                      </label>
                      <select
                        id="signup-state"
                        value={signupForm.state}
                        onChange={(e) => setSignupForm({ ...signupForm, state: e.target.value })}
                        style={{ width: '100%', padding: '9px 10px', borderRadius: '9px', border: '1px solid var(--line, #e9e9e5)', fontSize: '13px', background: '#ffffff' }}
                      >
                        {INDIAN_STATES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-type" style={{ display: 'block', fontSize: '12px', fontWeight: '750', marginBottom: '4px' }}>
                      Clinic Type
                    </label>
                    <select
                      id="signup-type"
                      value={signupForm.clinicType}
                      onChange={(e) => setSignupForm({ ...signupForm, clinicType: e.target.value })}
                      style={{ width: '100%', padding: '9px 10px', borderRadius: '9px', border: '1px solid var(--line, #e9e9e5)', fontSize: '13px', background: '#ffffff' }}
                    >
                      {CLINIC_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Required Terms Checkbox */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', cursor: 'pointer', color: 'var(--charcoal-body, #475554)' }}>
                      <input
                        type="checkbox"
                        checked={signupForm.agreeTerms}
                        onChange={(e) => setSignupForm({ ...signupForm, agreeTerms: e.target.checked })}
                        style={{ marginTop: '2px' }}
                      />
                      <span>
                        I agree to the <a href="/terms" target="_blank" rel="noreferrer" style={{ color: 'var(--teal-primary, #008891)', fontWeight: '700' }}>Terms</a> and the <a href="/privacy" target="_blank" rel="noreferrer" style={{ color: 'var(--teal-primary, #008891)', fontWeight: '700' }}>Privacy Notice</a> *
                      </span>
                    </label>
                    {signupErrors.agreeTerms && <div style={{ fontSize: '11px', color: '#dc2626', marginTop: '2px' }}>{signupErrors.agreeTerms}</div>}
                  </div>

                  {/* Optional WhatsApp Updates Checkbox */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', cursor: 'pointer', color: 'var(--charcoal-body, #475554)' }}>
                    <input
                      type="checkbox"
                      checked={signupForm.whatsappConsent}
                      onChange={(e) => setSignupForm({ ...signupForm, whatsappConsent: e.target.checked })}
                      style={{ marginTop: '2px' }}
                    />
                    <span>Receive product updates and clinical release notes on WhatsApp</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-hero-teal"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: '750',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Verify Phone & Create Practice</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            {/* STEP 2: 6-DIGIT CODE VERIFICATION (Common for Login and Sign-up) */}
            {step === 2 && (
              <form onSubmit={handleVerifyOtp}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0, 136, 145, 0.1)', color: 'var(--teal-primary, #008891)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <KeyRound size={20} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', margin: 0 }}>
                      Enter 6-digit Code
                    </h2>
                    <div style={{ fontSize: '12px', color: 'var(--charcoal-muted, #6e7e7d)' }}>
                      Sent to {phone}
                    </div>
                  </div>
                </div>

                {/* Neutral Message (Never reveals if registered) */}
                <div style={{ padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                  If this number is registered, a code has been sent.
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label htmlFor="otp-input" style={{ display: 'block', fontSize: '12px', fontWeight: '750', marginBottom: '6px' }}>
                    Verification Code
                  </label>
                  <input
                    id="otp-input"
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, ''))
                      if (codeError && wrongTries < 5) setCodeError('')
                    }}
                    placeholder="123456"
                    disabled={wrongTries >= 5}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: codeError ? '1px solid #ef4444' : '1px solid var(--line, #e9e9e5)',
                      fontSize: '20px',
                      fontWeight: '800',
                      letterSpacing: '0.25em',
                      textAlign: 'center',
                      background: wrongTries >= 5 ? '#f8fafc' : '#ffffff',
                      outline: 'none'
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--teal-primary, #008891)', fontWeight: '700' }}>
                      Demo code: 123456
                    </span>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{ fontSize: '11px', color: 'var(--charcoal-muted, #6e7e7d)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Change number
                    </button>
                  </div>
                  {codeError && (
                    <div style={{ fontSize: '12px', color: '#dc2626', fontWeight: '600', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertCircle size={14} />
                      <span>{codeError}</span>
                    </div>
                  )}
                </div>

                {/* Resend Countdown / Action */}
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  {timerActive ? (
                    <span style={{ fontSize: '12px', color: 'var(--charcoal-muted, #6e7e7d)' }}>
                      Resend code in {resendCountdown}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      style={{ fontSize: '12px', color: 'var(--teal-primary, #008891)', fontWeight: '700', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <RefreshCw size={12} />
                      <span>Request a new code</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={wrongTries >= 5}
                  className="btn-hero-teal"
                  style={{
                    width: '100%',
                    padding: '11px',
                    borderRadius: '10px',
                    fontSize: '13.5px',
                    fontWeight: '750',
                    border: 'none',
                    cursor: wrongTries >= 5 ? 'not-allowed' : 'pointer',
                    opacity: wrongTries >= 5 ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Verify Code & Continue</span>
                  <Check size={16} />
                </button>
              </form>
            )}
          </div>

          {/* DEMO ROLE 1-CLICK LOGIN PANEL */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid var(--line, #e9e9e5)',
            padding: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={14} style={{ color: 'var(--teal-primary, #008891)' }} />
              <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Instant Demo Login (Choose Role)
              </span>
            </div>
            <p style={{ fontSize: '11.5px', color: 'var(--charcoal-muted, #6e7e7d)', marginBottom: '12px' }}>
              Click any role button below to test role-based permissions immediately:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
              {Object.entries(DEMO_USERS).map(([roleKey, u]) => (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => handleDemoRoleClick(roleKey)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--line, #e9e9e5)',
                    background: '#f8fafc',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '750', color: 'var(--charcoal-title, #1a2626)' }}>
                      {u.name}
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--charcoal-muted, #6e7e7d)', fontFamily: 'monospace' }}>
                      {roleKey} • {u.phone}
                    </div>
                  </div>
                  <ArrowRight size={12} style={{ color: 'var(--teal-primary, #008891)' }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
