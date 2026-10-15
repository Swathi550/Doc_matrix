import { useState, useId } from 'react'
import {
  Mail, Lock, Eye, EyeOff, Building2, UserRound, Phone, Check, ArrowRight,
  ArrowLeft, AlertCircle, CheckCircle2, ShieldCheck, X, FileText, ExternalLink,
  Sparkles, Calendar, Layers, Activity, CreditCard
} from 'lucide-react'

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

export default function AuthPage({ view = 'login', onNavigate, onBackHome }) {
  // Current active view: 'login' | 'signup'
  const isLogin = view === 'login'

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Login form state
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
    rememberMe: false
  })

  // Sign up form state
  const [signupForm, setSignupForm] = useState({
    clinicName: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })

  // Errors state
  const [errors, setErrors] = useState({})
  
  // Submission feedback state (Mock only)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(null)

  // Modals state
  const [modalType, setModalType] = useState(null) // 'terms' | 'privacy' | 'forgot'
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotSubmitted, setForgotSubmitted] = useState(false)
  const [forgotError, setForgotError] = useState('')

  // Handle Login field changes
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target
    setLoginForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Handle Signup field changes
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target
    setSignupForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Validate Login form
  const validateLoginForm = () => {
    const newErrors = {}
    if (!loginForm.identifier.trim()) {
      newErrors.identifier = 'Please enter your email or phone number'
    } else if (
      loginForm.identifier.includes('@') &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.identifier.trim())
    ) {
      newErrors.identifier = 'Please enter a valid email address'
    }

    if (!loginForm.password) {
      newErrors.password = 'Please enter your password'
    } else if (loginForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate Sign Up form
  const validateSignupForm = () => {
    const newErrors = {}
    if (!signupForm.clinicName.trim()) {
      newErrors.clinicName = 'Clinic or practice name is required'
    }
    if (!signupForm.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    if (!signupForm.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupForm.email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!signupForm.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[0-9+\s-]{8,16}$/.test(signupForm.phone.trim())) {
      newErrors.phone = 'Please enter a valid contact phone number'
    }
    if (!signupForm.password) {
      newErrors.password = 'Password is required'
    } else if (signupForm.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long'
    }
    if (!signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (signupForm.password !== signupForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!signupForm.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms and Privacy Policy'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Login Submit (Frontend UI only)
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setSubmitSuccess(null)
    if (!validateLoginForm()) return

    setSubmitting(true)
    // Simulate brief interaction delay
    setTimeout(() => {
      setSubmitting(false)
      setSubmitSuccess({
        title: 'Mock Sign In Successful',
        message: 'This is a frontend UI prototype. Authentication, sessions, and database connections are intentionally not implemented.'
      })
    }, 500)
  }

  // Handle Sign Up Submit (Frontend UI only)
  const handleSignupSubmit = (e) => {
    e.preventDefault()
    setSubmitSuccess(null)
    if (!validateSignupForm()) return

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitSuccess({
        title: 'Mock Clinic Account Created',
        message: `Welcome, ${signupForm.fullName}! This is a frontend UI prototype. No backend server or database was contacted.`
      })
    }, 600)
  }

  // Handle Forgot Password Submit (Mock)
  const handleForgotSubmit = (e) => {
    e.preventDefault()
    if (!forgotEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      setForgotError('Please enter a valid email address')
      return
    }
    setForgotError('')
    setForgotSubmitted(true)
  }

  // Switch between views
  const switchView = (targetView) => (e) => {
    if (e) e.preventDefault()
    setErrors({})
    setSubmitSuccess(null)
    onNavigate(targetView)
  }

  return (
    <div className="auth-page-root">
      <div className="auth-split-layout">
        {/* ===================================================================
            LEFT PANEL: BRAND & WELCOME SHOWCASE
            =================================================================== */}
        <aside className="auth-showcase-panel">
          <div className="auth-showcase-bg-image" />
          <div className="auth-showcase-overlay" />
          <div className="auth-showcase-grid-accent" />

          <div className="auth-showcase-content">
            {/* Top Brand Link */}
            <header className="auth-showcase-header">
              <a
                href="#top"
                onClick={onBackHome}
                className="auth-brand-anchor"
                aria-label="DocMatrix Home"
              >
                <MedicalCrossMark light={true} />
                <span className="auth-brand-name">DOC MATRIX</span>
              </a>
              <span className="auth-suite-badge">CLINIC PRACTICE SUITE</span>
            </header>

            {/* Dynamic Welcome Content */}
            <div className="auth-welcome-body">
              {isLogin ? (
                /* Login Welcome Panel */
                <div className="auth-welcome-fade">
                  <div className="auth-welcome-tag">
                    <Sparkles size={14} />
                    <span>SECURE CLINIC PORTAL</span>
                  </div>
                  <h1 className="auth-welcome-title">Welcome Back to DocMatrix</h1>
                  <p className="auth-welcome-desc">
                    Manage your dental practice with connected patient records, appointments,
                    clinical workflows, and billing — all in one place.
                  </p>

                  <div className="auth-trust-card">
                    <div className="auth-trust-icon-box">
                      <ShieldCheck size={22} className="auth-trust-icon" />
                    </div>
                    <div className="auth-trust-text">
                      <div className="auth-trust-title">Clinical Reliability & Data Protection</div>
                      <div className="auth-trust-sub">
                        Role-based clinic security, HIPAA & ABDM ready architecture, and continuous clinical uptime.
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Sign Up Welcome Panel */
                <div className="auth-welcome-fade">
                  <div className="auth-welcome-tag">
                    <Sparkles size={14} />
                    <span>PRACTICE ONBOARDING</span>
                  </div>
                  <h1 className="auth-welcome-title">
                    Digitise Your Clinic. Simplify Every Workflow.
                  </h1>
                  <p className="auth-welcome-desc">
                    Bring patient records, appointment scheduling, dental treatment workflows,
                    and financial management together with DocMatrix.
                  </p>

                  {/* 4 Supporting Points Requested */}
                  <div className="auth-feature-points-list">
                    <div className="auth-feature-point-item">
                      <div className="auth-point-check">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <div className="auth-point-text">
                        <strong>Connected Patient Records</strong>
                        <span>Permanent patient charts, medical histories, and digital radiographic notes.</span>
                      </div>
                    </div>

                    <div className="auth-feature-point-item">
                      <div className="auth-point-check">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <div className="auth-point-text">
                        <strong>Smarter Appointment Management</strong>
                        <span>Real-time chair booking, doctor schedules, and automated visit queues.</span>
                      </div>
                    </div>

                    <div className="auth-feature-point-item">
                      <div className="auth-point-check">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <div className="auth-point-text">
                        <strong>Integrated Dental Workflows</strong>
                        <span>Chairside dental charts, interactive odontograms, and lab orders.</span>
                      </div>
                    </div>

                    <div className="auth-feature-point-item">
                      <div className="auth-point-check">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <div className="auth-point-text">
                        <strong>Connected Billing & Accounts</strong>
                        <span>Itemised treatment billing, GST-ready invoicing, and complete collection tracking.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Support Callout */}
            <footer className="auth-showcase-footer">
              <span className="auth-footer-dot" />
              <span>Need help? Practice support: <a href="mailto:info@docmatrix.co.in">info@docmatrix.co.in</a></span>
            </footer>
          </div>
        </aside>

        {/* ===================================================================
            RIGHT PANEL: AUTHENTICATION FORMS
            =================================================================== */}
        <section className="auth-form-panel">
          {/* Top Bar for Form Panel */}
          <div className="auth-form-topbar">
            <button onClick={onBackHome} className="auth-back-link">
              <ArrowLeft size={16} />
              <span>Back to DocMatrix</span>
            </button>

            <div className="auth-badge-demo" title="Frontend-only preview mode">
              <span className="demo-dot" />
              UI Prototype Only
            </div>
          </div>

          <div className="auth-form-container">
            {/* Mobile Branding (Visible only on small viewports) */}
            <div className="auth-mobile-brand">
              <MedicalCrossMark />
              <span className="brand-title">DOC MATRIX</span>
            </div>

            {/* Form Header */}
            <div className="auth-form-header">
              <span className="auth-form-kicker">
                {isLogin ? 'CLINIC ACCESS' : 'GET STARTED'}
              </span>
              <h2 className="auth-form-title">
                {isLogin ? 'Clinic Login' : 'Clinic Sign Up'}
              </h2>
              <p className="auth-form-subtitle">
                {isLogin
                  ? 'Enter your clinic credentials to access your DocMatrix workspace.'
                  : 'Set up your dental practice management workspace in minutes.'}
              </p>
            </div>

            {/* Notice Banner: Frontend-only note */}
            <div className="auth-ui-notice" role="note">
              <div className="auth-ui-notice-icon">
                <AlertCircle size={16} />
              </div>
              <div className="auth-ui-notice-text">
                <strong>Frontend UI Only:</strong> Authentication APIs, user accounts, and databases are not connected.
              </div>
            </div>

            {/* Success Feedback Alert (Mock) */}
            {submitSuccess && (
              <div className="auth-success-banner" role="status">
                <div className="auth-success-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4>{submitSuccess.title}</h4>
                  <p>{submitSuccess.message}</p>
                </div>
              </div>
            )}

            {/* ===============================================================
                LOGIN FORM
                =============================================================== */}
            {isLogin ? (
              <form onSubmit={handleLoginSubmit} className="auth-form" noValidate>
                {/* Email / Phone Field */}
                <div className={`auth-field-group ${errors.identifier ? 'has-error' : ''}`}>
                  <label htmlFor="login-identifier" className="auth-label">
                    Email or Phone Number
                  </label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                      <Mail size={17} />
                    </span>
                    <input
                      id="login-identifier"
                      name="identifier"
                      type="text"
                      className="auth-input"
                      placeholder="e.g. doctor@clinic.com or 9876543210"
                      value={loginForm.identifier}
                      onChange={handleLoginChange}
                      autoComplete="username"
                    />
                  </div>
                  {errors.identifier && (
                    <p className="auth-error-msg" role="alert">
                      {errors.identifier}
                    </p>
                  )}
                </div>

                {/* Password Field with Show/Hide Toggle */}
                <div className={`auth-field-group ${errors.password ? 'has-error' : ''}`}>
                  <div className="auth-label-row">
                    <label htmlFor="login-password" className="auth-label">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setModalType('forgot')}
                      className="auth-forgot-link"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon">
                      <Lock size={17} />
                    </span>
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="auth-pw-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="auth-error-msg" role="alert">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="auth-remember-row">
                  <label className="auth-checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginForm.rememberMe}
                      onChange={handleLoginChange}
                      className="auth-checkbox"
                    />
                    <span>Remember this device for 30 days</span>
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="auth-submit-btn"
                >
                  {submitting ? (
                    <span className="auth-btn-spinner-wrap">
                      <span className="auth-btn-spinner" /> Validating...
                    </span>
                  ) : (
                    <>
                      <span>Login to Clinic</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* Toggle to Sign Up */}
                <div className="auth-switch-prompt">
                  <span>Don't have a DocMatrix clinic account?</span>
                  <button
                    type="button"
                    onClick={switchView('signup')}
                    className="auth-switch-btn"
                  >
                    Sign Up now
                  </button>
                </div>
              </form>
            ) : (
              /* ===============================================================
                 SIGN UP FORM
                 =============================================================== */
              <form onSubmit={handleSignupSubmit} className="auth-form" noValidate>
                {/* 2-Column Grid for Clinic & Doctor Name */}
                <div className="auth-row-2col">
                  {/* Clinic Name */}
                  <div className={`auth-field-group ${errors.clinicName ? 'has-error' : ''}`}>
                    <label htmlFor="signup-clinic" className="auth-label">
                      Clinic / Practice Name <span className="auth-req">*</span>
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">
                        <Building2 size={17} />
                      </span>
                      <input
                        id="signup-clinic"
                        name="clinicName"
                        type="text"
                        className="auth-input"
                        placeholder="e.g. Apex Dental Care"
                        value={signupForm.clinicName}
                        onChange={handleSignupChange}
                      />
                    </div>
                    {errors.clinicName && (
                      <p className="auth-error-msg" role="alert">
                        {errors.clinicName}
                      </p>
                    )}
                  </div>

                  {/* Doctor / Admin Name */}
                  <div className={`auth-field-group ${errors.fullName ? 'has-error' : ''}`}>
                    <label htmlFor="signup-name" className="auth-label">
                      Full Name <span className="auth-req">*</span>
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">
                        <UserRound size={17} />
                      </span>
                      <input
                        id="signup-name"
                        name="fullName"
                        type="text"
                        className="auth-input"
                        placeholder="e.g. Dr. Sarah Jenkins"
                        value={signupForm.fullName}
                        onChange={handleSignupChange}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="auth-error-msg" role="alert">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                </div>

                {/* 2-Column Grid for Email & Phone */}
                <div className="auth-row-2col">
                  {/* Email */}
                  <div className={`auth-field-group ${errors.email ? 'has-error' : ''}`}>
                    <label htmlFor="signup-email" className="auth-label">
                      Work Email <span className="auth-req">*</span>
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">
                        <Mail size={17} />
                      </span>
                      <input
                        id="signup-email"
                        name="email"
                        type="email"
                        className="auth-input"
                        placeholder="e.g. doctor@apexdental.in"
                        value={signupForm.email}
                        onChange={handleSignupChange}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p className="auth-error-msg" role="alert">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className={`auth-field-group ${errors.phone ? 'has-error' : ''}`}>
                    <label htmlFor="signup-phone" className="auth-label">
                      Phone Number <span className="auth-req">*</span>
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">
                        <Phone size={17} />
                      </span>
                      <input
                        id="signup-phone"
                        name="phone"
                        type="tel"
                        className="auth-input"
                        placeholder="e.g. +91 98765 43210"
                        value={signupForm.phone}
                        onChange={handleSignupChange}
                        autoComplete="tel"
                      />
                    </div>
                    {errors.phone && (
                      <p className="auth-error-msg" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* 2-Column Grid for Passwords */}
                <div className="auth-row-2col">
                  {/* Password with Show/Hide */}
                  <div className={`auth-field-group ${errors.password ? 'has-error' : ''}`}>
                    <label htmlFor="signup-password" className="auth-label">
                      Password <span className="auth-req">*</span>
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">
                        <Lock size={17} />
                      </span>
                      <input
                        id="signup-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder="Min. 8 characters"
                        value={signupForm.password}
                        onChange={handleSignupChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="auth-pw-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="auth-error-msg" role="alert">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password with Show/Hide */}
                  <div className={`auth-field-group ${errors.confirmPassword ? 'has-error' : ''}`}>
                    <label htmlFor="signup-confirm-password" className="auth-label">
                      Confirm Password <span className="auth-req">*</span>
                    </label>
                    <div className="auth-input-wrap">
                      <span className="auth-input-icon">
                        <Lock size={17} />
                      </span>
                      <input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="auth-input"
                        placeholder="Re-enter password"
                        value={signupForm.confirmPassword}
                        onChange={handleSignupChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="auth-pw-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="auth-error-msg" role="alert">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className={`auth-field-group ${errors.agreeTerms ? 'has-error' : ''}`}>
                  <label className="auth-checkbox-label auth-terms-checkbox">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={signupForm.agreeTerms}
                      onChange={handleSignupChange}
                      className="auth-checkbox"
                    />
                    <span>
                      I agree to the{' '}
                      <button
                        type="button"
                        onClick={() => setModalType('terms')}
                        className="auth-inline-link"
                      >
                        Terms and Conditions
                      </button>{' '}
                      and{' '}
                      <button
                        type="button"
                        onClick={() => setModalType('privacy')}
                        className="auth-inline-link"
                      >
                        Privacy Policy
                      </button>
                      .
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="auth-error-msg" role="alert">
                      {errors.agreeTerms}
                    </p>
                  )}
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="auth-submit-btn"
                >
                  {submitting ? (
                    <span className="auth-btn-spinner-wrap">
                      <span className="auth-btn-spinner" /> Creating Account...
                    </span>
                  ) : (
                    <>
                      <span>Sign Up</span>
                      <ArrowRight size={17} />
                    </>
                  )}
                </button>

                {/* Toggle to Login */}
                <div className="auth-switch-prompt">
                  <span>Already have a DocMatrix clinic account?</span>
                  <button
                    type="button"
                    onClick={switchView('login')}
                    className="auth-switch-btn"
                  >
                    Login here
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </div>

      {/* ===================================================================
          MODALS: FORGOT PASSWORD / TERMS / PRIVACY (FRONTEND ONLY)
          =================================================================== */}
      {modalType && (
        <div className="auth-modal-backdrop" onClick={() => setModalType(null)}>
          <div
            className="auth-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="auth-modal-header">
              <div className="auth-modal-title-group">
                <MedicalCrossMark />
                <h3 className="auth-modal-title">
                  {modalType === 'forgot' && 'Reset Clinic Password'}
                  {modalType === 'terms' && 'DocMatrix Terms of Service'}
                  {modalType === 'privacy' && 'DocMatrix Privacy Policy'}
                </h3>
              </div>
              <button
                className="auth-modal-close"
                onClick={() => setModalType(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="auth-modal-body">
              {modalType === 'forgot' && (
                <div>
                  {forgotSubmitted ? (
                    <div className="auth-modal-success">
                      <CheckCircle2 size={36} className="auth-modal-success-icon" />
                      <h4>Password Reset Requested</h4>
                      <p>
                        A mock recovery notification was triggered for <strong>{forgotEmail}</strong>.
                      </p>
                      <p className="auth-modal-note">
                        Note: This is a frontend UI prototype. In the production deployment, an encrypted one-time recovery link will be dispatched to your registered address.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setModalType(null)
                          setForgotSubmitted(false)
                          setForgotEmail('')
                        }}
                        className="auth-submit-btn"
                        style={{ marginTop: '1.25rem' }}
                      >
                        Return to Login
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotSubmit}>
                      <p className="auth-modal-lead">
                        Enter your clinic work email to receive password recovery instructions.
                      </p>
                      <div className={`auth-field-group ${forgotError ? 'has-error' : ''}`}>
                        <label htmlFor="forgot-email-input" className="auth-label">Work Email</label>
                        <div className="auth-input-wrap">
                          <span className="auth-input-icon">
                            <Mail size={17} />
                          </span>
                          <input
                            id="forgot-email-input"
                            type="email"
                            className="auth-input"
                            placeholder="e.g. doctor@clinic.com"
                            value={forgotEmail}
                            onChange={(e) => {
                              setForgotEmail(e.target.value)
                              setForgotError('')
                            }}
                          />
                        </div>
                        {forgotError && (
                          <p className="auth-error-msg" role="alert">
                            {forgotError}
                          </p>
                        )}
                      </div>
                      <div className="auth-modal-actions">
                        <button
                          type="button"
                          onClick={() => setModalType(null)}
                          className="auth-modal-cancel-btn"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="auth-submit-btn">
                          Send Recovery Instructions
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {modalType === 'terms' && (
                <div className="auth-legal-content">
                  <h4>1. Acceptance of Clinical Terms</h4>
                  <p>
                    By using DocMatrix, your dental practice agrees to comply with standard healthcare data guidelines, doctor authentication standards, and treatment charting protocols.
                  </p>
                  <h4>2. Clinical Practice Autonomy</h4>
                  <p>
                    DocMatrix provides digital practice management, appointment coordination, itemised billing, and electronic clinical records. All clinical diagnoses, prescriptions, and treatment plans remain under the independent medical judgment of the licensed dentist.
                  </p>
                  <h4>3. Data Confidentiality & Protection</h4>
                  <p>
                    All patient clinical records, odontograms, radiographic scans, and billing receipts are encrypted in transit and at rest in accordance with ABDM and healthcare privacy standards.
                  </p>
                </div>
              )}

              {modalType === 'privacy' && (
                <div className="auth-legal-content">
                  <h4>1. Patient Data Stewardship</h4>
                  <p>
                    DocMatrix acts as a secure platform custodian for dental practices. Your patient data, treatment records, and billing receipts are never sold, rented, or shared with third parties.
                  </p>
                  <h4>2. Encryption & Access Control</h4>
                  <p>
                    Practice records are protected by multi-tenant cryptographic isolation and role-based permissions (Doctor, Front Desk, Chairside Nurse, Billing Accountant).
                  </p>
                  <h4>3. Data Portability</h4>
                  <p>
                    Practices retain complete ownership of all clinical records, invoices, and appointment logs, with full data export options available at any time.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
