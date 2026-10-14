import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Menu, X, ArrowRight, Check, UserRound, Stethoscope, Building2, FlaskConical, Pill,
  MessagesSquare, CalendarCheck, UserPlus, LogIn, ClipboardCheck, ListOrdered, FileText, CreditCard,
  Repeat, Bell, BarChart3, ShieldCheck, LayoutDashboard, Plug, FolderHeart, HeartPulse, Layers,
  Eye, Gauge, Network, Share2, Radio, Microscope, CalendarClock, ChevronDown, ChevronRight, Activity, Sparkles,
  Play, Pause, Zap, CheckCircle2, RotateCcw
} from 'lucide-react'

// Authentic Clinical Healthcare Imagery (Zero Bank/ATM Reference)
const clinicalImagery = {
  reception: '/card-patient.jpg',        // Modern clinic reception & patient check-in
  consultation: '/card-appointment.jpg', // Examination room & doctor consultation chair
  records: '/card-records.jpg',          // Doctor reviewing digital EMR & radiographic scans
  prescription: '/card-prescription.jpg',// Doctor writing digital prescription with stethoscope
  corridor: '/clinic-corridor-8k.jpg',   // Modern clinical hospital corridor
  lab: '/diagnostics-lab.jpg',           // High-tech diagnostic laboratory
  workflow: '/clinical-workflow.jpg',    // Clinical workflow in practice
  doctor: '/hero-doctor.jpg'             // Modern healthcare professional
}

// Healthcare Ecosystem Ticker Partners
const partners = ['EMR Sync ↗', '▲ MedTech', '~ WhatsApp API', '▣ LabXpress', 'Practo Connect', 'Rx Gateway', 'ABDM Ready']

// Clinical Doctors & Practice Activity Indicators
const doctorsProof = [
  [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80',
    'Dr. Shannon Kirkland',
    'Cardiology • Synced'
  ],
  [
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80',
    'Dr. Tariq Antoun',
    'Oncology • Active'
  ],
  [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80',
    'Sarah Fredericksen',
    'Lab Diagnostics • 99.8%'
  ],
  [
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80',
    'Metro Care Health',
    '+520 Clinics Live'
  ]
]

// Navigation Links
const navItems = [
  { label: 'Solutions', id: 'solutions' },
  { label: 'Workflow', id: 'workflow' },
  { label: 'Platform', id: 'about' },
  { label: 'Packages', id: 'packages' },
  { label: 'Contact', id: 'contact' }
]

// 6 Core Clinical Modules
const solutions = [
  [UserRound, 'Patient Management', 'One continuous record for every patient, from first registration to long-term follow-up.', '#008891'],
  [Stethoscope, 'Doctor Management', 'Schedules, consultations and prescriptions organised around each doctor’s day.', '#0A9EAD'],
  [Building2, 'Hospital Management', 'Departments, queues, billing and staff access managed from a single operations view.', '#008891'],
  [FlaskConical, 'Diagnostics & Laboratory', 'Orders, sample tracking and reports flow straight back to the treating doctor.', '#0A9EAD'],
  [Pill, 'Pharmacy', 'Digital prescriptions reach the pharmacy directly, with dispensing and stock in step.', '#008891'],
  [MessagesSquare, 'Omnichannel Communication', 'Reminders and updates reach patients on the channel they actually use.', '#0A9EAD']
]

// 10 Longitudinal Workflow Stages
const steps = [
  [UserRound, 'Patient', 'Patient creates their record or profile with verified contact and health information.'],
  [CalendarCheck, 'Appointment', 'Scheduled through patient portal, WhatsApp, phone, or front-desk reception.'],
  [UserPlus, 'Registration', 'Fast demographic capture with zero duplicate entry across departments.'],
  [LogIn, 'Check-in', 'Self-service or front-desk queue assignment with real-time room tracking.'],
  [Stethoscope, 'Consultation', 'Doctor conducts visit with instant access to complete longitudinal history.'],
  [Microscope, 'Diagnosis', 'Lab and diagnostic requisitions generated seamlessly from the consult screen.'],
  [FileText, 'Prescription', 'Standardized digital prescriptions with dosage validation and drug alerts.'],
  [Pill, 'Pharmacy', 'Direct transmission to pharmacy dispensary for instantaneous fulfillment.'],
  [CreditCard, 'Payment', 'Transparent billing, itemized invoices, and unified payment processing.'],
  [Repeat, 'Follow-up', 'Automated reminders and scheduled check-ins sent on the patient\'s preferred channel.']
]

// 15 Comprehensive Platform Capabilities
const features = [
  [CalendarClock, 'Appointment Management'],
  [LogIn, 'Digital Check-in'],
  [ListOrdered, 'Smart Queue'],
  [FolderHeart, 'Patient Records'],
  [FileText, 'Digital Prescription'],
  [FlaskConical, 'Lab Reports'],
  [CreditCard, 'Payment Tracking'],
  [Pill, 'Pharmacy Integration'],
  [Repeat, 'Follow-up Management'],
  [Bell, 'Notifications'],
  [BarChart3, 'Reports & Analytics'],
  [ShieldCheck, 'Role-Based Access'],
  [LayoutDashboard, 'Operational Dashboards'],
  [HeartPulse, 'Patient Engagement'],
  [Plug, 'Third-Party Integrations']
]

// 4 Pricing Tiers
const packages = [
  ['Basic / Free', 'Individual doctors and very small practices', ['Appointment management', 'Patient records', 'Digital prescription', 'Notifications']],
  ['Small Clinic', 'Single-location clinics and polyclinics', ['Everything in Basic', 'Digital check-in', 'Smart queue', 'Payment tracking', 'Follow-up management']],
  ['Mid-size', 'Multi-department hospitals and diagnostic centers', ['Everything in Small Clinic', 'Lab reports', 'Pharmacy integration', 'Role-based access', 'Reports & analytics'], true],
  ['Enterprise', 'Hospital groups, diagnostic chains and pharmacy networks', ['Everything in Mid-size', 'Operational dashboards', 'Omnichannel communication', 'Third-party integrations', 'Multi-site administration']]
]

// 6 Value Pillars
const why = [
  [Layers, 'Unified Healthcare Operations', 'Front desk, clinical, lab and pharmacy teams work from the same live picture.'],
  [Share2, 'Connected Patient Journey', 'Every step of a visit hands off cleanly to the next, with nothing re-entered.'],
  [Eye, 'Workflow Visibility', 'See where each patient is, what is pending and where queues are building.'],
  [Network, 'Scalable Healthcare Platform', 'Start with one clinic and extend to departments, sites and partner networks.'],
  [Radio, 'Multi-Channel Communication', 'Reach patients and staff through the channels that fit each situation.'],
  [Gauge, 'Operational Insights', 'Turn daily activity into reports that help leaders plan capacity and service.']
]

const nodes = ['Patient', 'Doctor', 'Management', 'Lab', 'Pharmacy', 'Omnichannel']

function Brand({ light = false }) {
  return (
    <a className={`brand-anchor ${light ? 'brand-light' : ''}`} href="#top" aria-label="DOC MATRIX Home">
      <span className="brand-icon-wrapper">
        <img
          src="/logo.svg"
          alt=""
          width="40"
          height="40"
          className="brand-logo-img"
        />
      </span>
      <span className="brand-wordmark-wrapper">
        <img
          src={light ? "/name-light.svg" : "/name.svg"}
          alt="DOC MATRIX"
          height="28"
          className="brand-name-img"
        />
      </span>
    </a>
  )
}

function Interactive3DClinicFlow() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const stageRef = useRef(null)

  // Subtle 3D mouse parallax
  const handleMouseMove = (e) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setTilt({ rx: -(y - 0.5) * 4, ry: (x - 0.5) * 5 })
  }

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  return (
    <div
      className="clinic-portal-wrapper"
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="Seamless Clinic Animation"
    >
      {/* Organic Glass Portal Viewport (No harsh boundaries, blends seamlessly into the page) */}
      <div
        className="clinic-portal-stage"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Seamless Merged Video (No harsh lines/borders, completely merged into page) */}
        <div className="clinic-portal-frame">
          <video
            src="/Patient_journey_in_dental_clinic_20261013234745.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="clinic-merged-video"
            aria-label="Patient journey in dental clinic"
          />

          {/* 4-Edge Soft Vignettes & Fades to eliminate all borders and square lines */}
          <div className="clinic-edge-fade-top" aria-hidden="true" />
          <div className="clinic-edge-fade-bottom" aria-hidden="true" />
          <div className="clinic-edge-fade-left" aria-hidden="true" />
          <div className="clinic-edge-fade-right" aria-hidden="true" />
          <div className="clinic-radial-vignette" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

function DoctorPill({ name, role, avatar }) {
  return (
    <div className="person proof-pill">
      <img className="avatar" src={avatar} alt={name} />
      <span>
        <b>{name}</b>
        <small>{role}</small>
      </span>
    </div>
  )
}

function EcosystemHub() {
  const pts = nodes.map((n, i) => {
    const a = (-90 + 60 * i) * Math.PI / 180
    return [n, 280 + 190 * Math.cos(a), 280 + 190 * Math.sin(a)]
  })

  return (
    <div className="eco-hub-container">
      <svg className="eco-hub-svg" viewBox="0 0 560 560" role="img" aria-label="Doc Matrix ecosystem connecting patient, doctor, management, lab, pharmacy, and omnichannel channels">
        <defs>
          <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#008891" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#008891" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="280" cy="280" r="260" fill="url(#hubGlow)" />
        <circle cx="280" cy="280" r="190" className="hub-track" />
        <circle cx="280" cy="280" r="105" className="hub-track inner" />

        {pts.map(([n, x, y], i) => {
          const [, nx, ny] = pts[(i + 1) % 6]
          return <line key={'line-' + n} className="hub-connect" x1={x} y1={y} x2={nx} y2={ny} />
        })}

        {pts.map(([n, x, y]) => (
          <line key={'spoke-' + n} className="hub-spoke" x1="280" y1="280" x2={x} y2={y} />
        ))}

        {pts.map(([n, x, y]) => (
          <g key={'node-' + n} className="hub-node-group">
            <circle cx={x} cy={y} r="32" className="hub-node-outer" />
            <circle cx={x} cy={y} r="6" fill="#008891" />
            <text x={x} y={y + (y > 280 ? 52 : -42)} textAnchor="middle" className="hub-node-label">
              {n}
            </text>
          </g>
        ))}

        <circle cx="280" cy="280" r="56" className="hub-core-circle" />
        <image
          href="/logo.svg"
          x="248"
          y="248"
          width="64"
          height="64"
          className="hub-core-logo"
        />
      </svg>
    </div>
  )
}

export function AnimatedGradientText({
  children,
  className = '',
  speed = 2,
  colorFrom = '#4ade80',
  colorTo = '#06b6d4',
  ...props
}) {
  return (
    <span
      className={`animated-gradient-text ${className}`}
      style={{
        '--color-from': colorFrom,
        '--color-to': colorTo,
        '--speed': `${speed}s`
      }}
      {...props}
    >
      {children}
    </span>
  )
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.1,
  color = '#60A5FA',
  maxOpacity = 0.5,
  className = '',
  width,
  height
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  const rgbColor = useMemo(() => {
    if (color.startsWith('#')) {
      let c = color.substring(1)
      if (c.length === 3) c = c.split('').map((x) => x + x).join('')
      const num = parseInt(c, 16)
      return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`
    }
    return '96, 165, 250'
  }, [color])

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let gridParams = { cols: 0, rows: 0, squares: new Float32Array(0), w: 0, h: 0 }

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const w = width || rect.width || 800
      const h = height || rect.height || 600
      const dpr = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.resetTransform?.()
      ctx.scale(dpr, dpr)

      const step = squareSize + gridGap
      const cols = Math.floor((w + gridGap) / step)
      const rows = Math.floor((h + gridGap) / step)
      const total = cols * rows
      const squares = new Float32Array(total)

      for (let i = 0; i < total; i++) {
        squares[i] = Math.random() * maxOpacity
      }

      gridParams = { cols, rows, squares, w, h }
    }

    updateSize()

    const ro = new ResizeObserver(() => {
      updateSize()
    })
    ro.observe(container)

    let lastDraw = 0
    const render = (now) => {
      if (now - lastDraw > 25) {
        lastDraw = now
        const { cols, rows, squares, w, h } = gridParams
        if (cols > 0 && rows > 0) {
          ctx.clearRect(0, 0, w, h)
          const step = squareSize + gridGap

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const idx = r * cols + c
              if (Math.random() < flickerChance) {
                squares[idx] = Math.random() * maxOpacity
              }
              const op = squares[idx]
              if (op > 0.02) {
                ctx.fillStyle = `rgba(${rgbColor}, ${op})`
                ctx.fillRect(c * step, r * step, squareSize, squareSize)
              }
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      ro.disconnect()
    }
  }, [squareSize, gridGap, flickerChance, rgbColor, maxOpacity, width, height])

  return (
    <div ref={containerRef} className={`flickering-grid-container ${className}`}>
      <canvas ref={canvasRef} className="flickering-grid-canvas" />
    </div>
  )
}

export default function App() {
  const [ready, setReady] = useState(false)
  const [gridReady, setGridReady] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [lineOne, setLineOne] = useState('**********')
  const [lineTwo, setLineTwo] = useState('********************')
  const mosaicRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const start = window.setTimeout(() => setReady(true), 40)

    // Progressive Scramble Headline Animation
    const scramble = (target, setter) => {
      const glyphs = 'DOCMATRIX0123456789'
      let frame = 0
      const total = 26
      const timer = window.setInterval(() => {
        frame += 1
        const resolved = Math.floor((frame / total) * target.length)
        setter(
          target
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' '
              if (index < resolved) return char
              return glyphs[(frame * 3 + index * 7) % glyphs.length]
            })
            .join('')
        )
        if (frame >= total) {
          window.clearInterval(timer)
          setter(target)
        }
      }, 34)
      return timer
    }

    let first = 0
    let second = 0
    const scrambleStart = window.setTimeout(() => {
      first = scramble('DOC MATRIX', setLineOne)
      second = scramble('Healthcare, in Sync', setLineTwo)
    }, 210)

    // Observer for Mosaic section
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridReady(true)
        }
      },
      { threshold: 0.23 }
    )

    if (mosaicRef.current) observer.observe(mosaicRef.current)

    // General scroll reveals for lower sections
    const rvObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            rvObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    document.querySelectorAll('.rv').forEach((el) => rvObserver.observe(el))

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(scrambleStart)
      window.clearInterval(first)
      window.clearInterval(second)
      observer.disconnect()
      rvObserver.disconnect()
    }
  }, [])

  const smoothScroll = (id) => (e) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.pageYOffset - 40
      window.scrollTo({ top: topOffset, behavior: 'smooth' })
    }
  }

  return (
    <main id="top" className={`page-container ${ready ? 'is-ready' : ''}`}>
      {/* ===================================================================
          SECTION 1 — FULLSCREEN ANIMATED HERO
          =================================================================== */}
      <section className="hero" id="home">
        {/* Navigation Bar */}
        <header className="topbar">
          <Brand />
          <nav aria-label="Main navigation">
            <a href="#mosaic" onClick={smoothScroll('mosaic')} className="nav-text-link">Platform</a>
            <a href="#solutions" onClick={smoothScroll('solutions')} className="nav-text-link">Solutions</a>
            <a href="#workflow" onClick={smoothScroll('workflow')} className="nav-text-link">Workflow</a>
            <a className="pill dark-pill" href="#contact" onClick={smoothScroll('contact')}>
              Explore ↗
            </a>
          </nav>
        </header>

        {/* Hero Editorial Copy */}
        <div className="hero-copy">
          <div className="eyebrow-badge">
            <img src="/logo.svg" alt="" width="18" height="18" className="eyebrow-logo" />
            <span>CLINIC MANAGEMENT PLATFORM</span>
          </div>
          <h1>
            <AnimatedGradientText
              speed={2}
              colorFrom="#4ade80"
              colorTo="#06b6d4"
              className="docmatrix-headline"
            >
              {lineOne}
            </AnimatedGradientText>
            <span className="headline-teal">{lineTwo}</span>
          </h1>
          <p className="intro">
            One connected platform for patient records, appointments, clinical workflows and billing.
            Built for modern medical centers and healthcare networks.
          </p>
          <div className="hero-actions">
            <a className="pill dark-pill" href="#solutions" onClick={smoothScroll('solutions')}>
              Explore Platform
            </a>
            <a className="text-link" href="#mosaic" onClick={smoothScroll('mosaic')}>
              Discover <span>↗</span>
            </a>
          </div>
        </div>

        {/* Interactive 3D Running Clinic Workflow Animation */}
        <Interactive3DClinicFlow />

        {/* Decorative Vertical Pale Word */}
        <span className="vertical-word" aria-hidden="true">
          CLINICAL
        </span>


        {/* Healthcare Partner Ticker Track */}
        <div className="partner-row" aria-label="Connected healthcare ecosystem partners">
          <div className="partner-track">
            {[0, 1].map((set) => (
              <div className="partner-set" key={set} aria-hidden={set === 1}>
                {partners.map((partner) => (
                  <span key={`${set}-${partner}`}>{partner}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SECTION 2 — MINIMAL DARK CLINICAL MOSAIC (Continuously Resizing Loop)
          =================================================================== */}
      <section
        id="mosaic"
        ref={mosaicRef}
        className={`mosaic ${gridReady ? 'grid-ready' : ''}`}
      >
        <header className="mosaic-header">
          <Brand light />
          <nav aria-label="Mosaic navigation">
            <a href="#solutions" onClick={smoothScroll('solutions')} className="nav-light-link">Solutions</a>
            <a href="#workflow" onClick={smoothScroll('workflow')} className="nav-light-link">Workflow</a>
            <a href="#packages" onClick={smoothScroll('packages')} className="nav-light-link">Packages</a>
            <a className="pill light-pill" href="#contact" onClick={smoothScroll('contact')}>
              Contact Us ↗
            </a>
          </nav>
        </header>

        <div className="mosaic-grid">
          {/* Left Stack (2 Vertically Stacked Cards) */}
          <div className="left-stack">
            <article className="tile tile-emr">
              <img src={clinicalImagery.records} alt="Doctor reviewing longitudinal patient records" />
              <div className="tile-shade clinical" />
              <p className="tile-kicker">LONGITUDINAL EMR</p>
              <h2>
                Clinical Records
                <br />
                <span>in Sync.</span>
              </h2>
            </article>

            <article className="tile tile-trust">
              <p className="tile-kicker">OVER 520+</p>
              <h3>
                Clinics & Labs
                <br />
                connected
              </h3>
              <div className="teal-corner" />
              <div className="dot-field" />
            </article>
          </div>

          {/* Right Stack (3 Horizontal Bands, 5 Tiles) */}
          <div className="right-stack">
            {/* Top Band: Large Clinical Network Statistics Card */}
            <article className="tile tile-stats">
              <img src={clinicalImagery.corridor} alt="Modern hospital and clinic facilities" />
              <div className="tile-shade soft" />
              <div className="stats-copy">
                <p>DOC MATRIX CLINICAL NETWORK</p>
                <strong>+1.2M</strong>
                <span>Patients seamlessly managed across clinics, labs & pharmacies.</span>
              </div>
            </article>

            {/* Middle Band: 2 Clinical Flow Tiles */}
            <div className="middle-stack">
              <article className="tile tile-ai">
                <img src={clinicalImagery.lab} alt="Diagnostic laboratory queue" />
                <div className="tile-shade soft" />
                <p>AI Diagnostic Queue</p>
              </article>

              <article className="tile tile-easy">
                <img src={clinicalImagery.consultation} alt="Doctor examination room" />
                <div className="tile-shade soft" />
                <p>Doctor Visits</p>
              </article>
            </div>

            {/* Bottom Band: 2 Communication & Operational Tiles */}
            <div className="bottom-stack">
              <article className="tile tile-payment">
                <img src={clinicalImagery.workflow} alt="Connected patient care workflow" />
                <div className="tile-shade soft" />
                <p className="tile-kicker">OMNICHANNEL CARE</p>
                <h3>WhatsApp & Portal</h3>
                <span>Instant automated clinical alerts & follow-ups</span>
              </article>

              <article className="tile tile-invested">
                <img src={clinicalImagery.prescription} alt="Clinical reliability desk" />
                <div className="tile-shade clinical" />
                <p className="tile-kicker">CLINICAL RELIABILITY</p>
                <h3>
                  99.98%
                  <br />
                  Operational
                </h3>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          SUBSEQUENT COMPATIBLE SECTIONS (DOC MATRIX CLINICAL PLATFORM)
          =================================================================== */}

      {/* Section 3: Built for Modern Clinics Overview with FlickeringGrid */}
      <section id="about" className="section-padded modern-clinics-section">
        {/* Magic UI Flickering Grid Canvas Effect */}
        <FlickeringGrid
          squareSize={4}
          gridGap={6}
          color="#60A5FA"
          maxOpacity={0.45}
          flickerChance={0.12}
          className="modern-clinics-flicker-grid"
        />

        <div className="wrap relative-content">
          <div className="section-head rv">
            <span className="section-kicker kicker-badge">
              <img src="/logo.svg" alt="" width="16" height="16" className="kicker-inline-logo" />
              BUILT FOR MODERN CLINICS
            </span>
            <h2 className="section-title">
              Healthcare technology, designed to{' '}
              <span className="text-gradient-highlight">fade into the background</span>.
            </h2>
            <p className="section-lead">
              DocMatrix connects the people, steps, and systems that make a clinic run — so teams spend{' '}
              <mark className="text-pill-highlight">less time coordinating</mark> and{' '}
              <mark className="text-pill-highlight">more time caring</mark>.
            </p>
          </div>

          <div className="modern-cards-grid">
            <div className="feature-modern-card rv">
              <div className="card-icon-bubble">
                <UserRound size={22} color="#008891" />
              </div>
              <h3 className="card-heading">
                <span className="card-heading-accent">Single Patient Record</span>
              </h3>
              <p className="card-desc">
                From their first online registration to five years of follow-up visits, every interaction sits in{' '}
                <span className="card-key-phrase">one clean, searchable timeline</span>.
              </p>
            </div>

            <div className="feature-modern-card rv">
              <div className="card-icon-bubble">
                <CalendarCheck size={22} color="#008891" />
              </div>
              <h3 className="card-heading">
                <span className="card-heading-accent">Frictionless Check-in</span>
              </h3>
              <p className="card-desc">
                <span className="card-key-phrase">Self-service QR arrival</span>, front-desk queueing, and live consult-room routing keep patients moving and{' '}
                <span className="card-key-phrase">waiting rooms quiet</span>.
              </p>
            </div>

            <div className="feature-modern-card rv">
              <div className="card-icon-bubble">
                <CreditCard size={22} color="#008891" />
              </div>
              <h3 className="card-heading">
                <span className="card-heading-accent">Transparent Billing</span>
              </h3>
              <p className="card-desc">
                Consultations, diagnostic lab requisitions, and pharmacy prescriptions roll into{' '}
                <span className="card-key-phrase">itemised invoices</span> with{' '}
                <span className="card-key-phrase">unified payment tracking</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Solutions Grid (6 Core Modules) */}
      <section id="solutions" className="section-padded bg-soft">
        <div className="wrap">
          <div className="section-head rv">
            <span className="section-kicker">SOLUTIONS</span>
            <h2 className="section-title">Designed for every corner of your practice.</h2>
            <p className="section-lead">
              Six dedicated modules working on one unified data layer — no third-party middleware, no duplicate data entry.
            </p>
          </div>

          <div className="solutions-hex-grid">
            {solutions.map(([Icon, title, desc, col], idx) => (
              <div key={title} className="solution-box rv" style={{ transitionDelay: `${idx * 0.08}s` }}>
                <div className="solution-icon-box" style={{ background: `${col}14`, color: col }}>
                  <Icon size={24} />
                </div>
                <h3 className="solution-title">{title}</h3>
                <p className="solution-desc">{desc}</p>
                <div className="solution-action">
                  <span>Explore module</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Interactive 10-Step Longitudinal Workflow */}
      <section id="workflow" className="section-padded bg-white">
        <div className="wrap">
          <div className="section-head rv">
            <span className="section-kicker">LONGITUDINAL JOURNEY</span>
            <h2 className="section-title">From first contact to complete recovery.</h2>
            <p className="section-lead">
              Track the full patient lifecycle through 10 connected milestones. Click any stage to inspect the workflow.
            </p>
          </div>

          <div className="workflow-interactive-wrapper rv">
            <div className="workflow-steps-scroll">
              {steps.map(([Icon, label], idx) => (
                <button
                  key={label}
                  type="button"
                  className={`step-pill-btn ${activeStep === idx ? 'active' : ''}`}
                  onClick={() => setActiveStep(idx)}
                >
                  <span className="step-num">{String(idx + 1).padStart(2, '0')}</span>
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="active-step-spotlight">
              <div className="step-spotlight-inner">
                <span className="step-badge">STAGE {String(activeStep + 1).padStart(2, '0')} OF 10</span>
                <h3 className="step-spotlight-title">{steps[activeStep][1]}</h3>
                <p className="step-spotlight-desc">{steps[activeStep][2]}</p>
                <div className="step-spotlight-actions">
                  <button
                    className="step-nav-btn prev"
                    disabled={activeStep === 0}
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  >
                    Previous Step
                  </button>
                  <button
                    className="step-nav-btn next"
                    disabled={activeStep === steps.length - 1}
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  >
                    Next Step <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Comprehensive Features List (15 capabilities) */}
      <section id="features" className="section-padded bg-soft">
        <div className="wrap">
          <div className="section-head rv">
            <span className="section-kicker">CAPABILITIES</span>
            <h2 className="section-title">Everything a modern healthcare facility requires.</h2>
            <p className="section-lead">
              15 production-grade operational capabilities configured to your clinic's precise specialty and protocol.
            </p>
          </div>

          <div className="features-compact-grid">
            {features.map(([Icon, title], idx) => (
              <div key={title} className="feature-compact-item rv" style={{ transitionDelay: `${idx * 0.04}s` }}>
                <div className="feature-icon-circle">
                  <Icon size={18} color="#008891" />
                </div>
                <span className="feature-compact-title">{title}</span>
                <Check size={16} className="feature-check" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Ecosystem Interactive Hub */}
      <section id="ecosystem" className="section-padded bg-white">
        <div className="wrap">
          <div className="section-head rv">
            <span className="section-kicker">ECOSYSTEM ARCHITECTURE</span>
            <h2 className="section-title">One central nervous system for your clinic.</h2>
            <p className="section-lead">
              All healthcare stakeholders connect into a single synchronized platform with real-time state sharing.
            </p>
          </div>

          <div className="rv">
            <EcosystemHub />
          </div>
        </div>
      </section>

      {/* Section 8: Packages & Pricing */}
      <section id="packages" className="section-padded bg-soft">
        <div className="wrap">
          <div className="section-head rv">
            <span className="section-kicker">PACKAGES</span>
            <h2 className="section-title">Transparent plans for practices of any scale.</h2>
            <p className="section-lead">
              From solo medical practitioners to multi-location healthcare systems.
            </p>
          </div>

          <div className="packages-tier-grid">
            {packages.map(([name, subtitle, inclusions, featured], idx) => (
              <div
                key={name}
                className={`package-card rv ${featured ? 'featured' : ''}`}
                style={{ transitionDelay: `${idx * 0.08}s` }}
              >
                {featured && <div className="featured-badge">MOST POPULAR</div>}
                <h3 className="package-name">{name}</h3>
                <p className="package-sub">{subtitle}</p>
                <div className="package-divider" />
                <ul className="package-list">
                  {inclusions.map((inc) => (
                    <li key={inc}>
                      <Check size={16} color="#008891" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" onClick={smoothScroll('contact')} className={`package-btn ${featured ? 'btn-teal-primary' : 'btn-outline-white'}`}>
                  Select {name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Why Doc Matrix (6 Pillars) */}
      <section id="why" className="section-padded bg-white">
        <div className="wrap">
          <div className="why-header-layout rv">
            <div className="section-head">
              <span className="section-kicker">WHY DOC MATRIX</span>
              <h2 className="section-title">Why leading clinics choose DocMatrix.</h2>
              <p className="section-lead">
                The difference is in the connection — no gaps, no dropped handoffs, no lost history.
              </p>
            </div>
            <div className="why-brand-seal" aria-hidden="true">
              <img src="/logo-and-name.svg" alt="DOC MATRIX" className="why-brand-seal-img" />
            </div>
          </div>

          <div className="why-pillars-grid">
            {why.map(([Icon, title, desc], idx) => (
              <div key={title} className="why-box rv" style={{ transitionDelay: `${idx * 0.06}s` }}>
                <div className="why-icon-bubble">
                  <Icon size={22} color="#008891" />
                </div>
                <h3 className="why-box-title">{title}</h3>
                <p className="why-box-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Contact / Consultation Request */}
      <section id="contact" className="section-padded bg-dark">
        <div className="wrap contact-layout">
          <div className="contact-text-col rv">
            <div className="contact-brand-lockup">
              <img src="/logo-and-name-light.svg" alt="DOC MATRIX" className="contact-brand-img" />
            </div>
            <span className="section-kicker light">READY TO CONNECT?</span>
            <h2 className="contact-headline">Schedule a personalized platform walkthrough.</h2>
            <p className="contact-lead">
              See how DocMatrix organizes records, reduces queue bottlenecks, and brings your clinical staff into sync.
            </p>
            <div className="contact-metrics">
              <div>
                <strong>+520</strong>
                <span>Clinics live</span>
              </div>
              <div>
                <strong>99.98%</strong>
                <span>Uptime SLA</span>
              </div>
              <div>
                <strong>&lt; 24h</strong>
                <span>Onboarding turnaround</span>
              </div>
            </div>
          </div>

          <div className="contact-form-col rv">
            <form className="clinic-inquiry-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for reaching out! A DocMatrix specialist will contact you shortly.') }}>
              <div className="form-row">
                <label>
                  <span>Your Full Name</span>
                  <input type="text" placeholder="Dr. Sarah Johnson" required />
                </label>
                <label>
                  <span>Work Email</span>
                  <input type="email" placeholder="sarah@cliniccare.com" required />
                </label>
              </div>
              <div className="form-row">
                <label>
                  <span>Phone Number</span>
                  <input type="tel" placeholder="+91 98765 43210" required />
                </label>
                <label>
                  <span>Clinic / Facility Name</span>
                  <input type="text" placeholder="Metro Dental & Polyclinic" required />
                </label>
              </div>
              <label className="form-full">
                <span>Message or Practice Requirements</span>
                <textarea rows={3} placeholder="Tell us about your clinic setup, staff size, and key workflow priorities..." />
              </label>
              <button type="submit" className="form-submit-btn">
                Request Platform Demo <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-site">
        <div className="wrap footer-content">
          <div className="footer-brand-info">
            <Brand light />
            <p className="footer-bio">
              DocMatrix connects healthcare operations, patient longitudinal journeys, diagnostic queues,
              and omnichannel communication into one seamless clinic platform.
            </p>
          </div>

          <div className="footer-nav-columns">
            <div className="footer-col">
              <h4>Platform</h4>
              <a href="#about" onClick={smoothScroll('about')}>About Us</a>
              <a href="#solutions" onClick={smoothScroll('solutions')}>Solutions</a>
              <a href="#workflow" onClick={smoothScroll('workflow')}>Workflows</a>
              <a href="#features" onClick={smoothScroll('features')}>Capabilities</a>
            </div>

            <div className="footer-col">
              <h4>Solutions</h4>
              <a href="#solutions" onClick={smoothScroll('solutions')}>Patient Management</a>
              <a href="#solutions" onClick={smoothScroll('solutions')}>Doctor Desk</a>
              <a href="#solutions" onClick={smoothScroll('solutions')}>Hospital Operations</a>
              <a href="#solutions" onClick={smoothScroll('solutions')}>Smart Pharmacy</a>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <a href="mailto:info@docmatrix.co.in">info@docmatrix.co.in</a>
              <a href="https://www.docmatrix.co.in" target="_blank" rel="noreferrer">www.docmatrix.co.in</a>
              <span>Bengaluru, Karnataka, India</span>
            </div>
          </div>
        </div>

        <div className="wrap footer-bottom-bar">
          <p>© {new Date().getFullYear()} DocMatrix Technologies. All rights reserved. Healthcare in Sync.</p>
          <div className="footer-legal">
            <a href="#home" onClick={smoothScroll('home')}>Privacy Policy</a>
            <a href="#home" onClick={smoothScroll('home')}>Terms of Service</a>
            <a href="#home" onClick={smoothScroll('home')}>Security & HIPAA/ABDM Compliance</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
