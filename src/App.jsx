import { useEffect, useState } from 'react'
import {
  Menu, X, ArrowRight, Check, UserRound, Stethoscope, Building2, FlaskConical, Pill,
  MessagesSquare, CalendarCheck, UserPlus, LogIn, ClipboardCheck, ListOrdered, FileText, CreditCard,
  Repeat, Bell, BarChart3, ShieldCheck, LayoutDashboard, Plug, FolderHeart, HeartPulse, Layers,
  Eye, Gauge, Network, Share2, Radio, Microscope, CalendarClock
} from 'lucide-react'

const nav = [['Solutions', 'solutions'], ['Workflow', 'workflow'], ['Features', 'features'], ['Ecosystem', 'ecosystem'], ['Packages', 'packages'], ['About', 'about']]

const solutions = [
  [UserRound, 'Patient Management', 'One continuous record for every patient, from first registration to long-term follow-up.', '#1D6FE8'],
  [Stethoscope, 'Doctor Management', 'Schedules, consultations and prescriptions organised around each doctor\u2019s day.', '#0FA3A3'],
  [Building2, 'Hospital Management', 'Departments, queues, billing and staff access managed from a single operations view.', '#0A1F3C'],
  [FlaskConical, 'Diagnostics & Laboratory', 'Orders, sample tracking and reports flow straight back to the treating doctor.', '#2E9E6B'],
  [Pill, 'Pharmacy', 'Digital prescriptions reach the pharmacy directly, with dispensing and stock in step.', '#1D6FE8'],
  [MessagesSquare, 'Omnichannel Communication', 'Reminders and updates reach patients on the channel they actually use.', '#0FA3A3']
]

const steps = [
  [UserRound, 'Patient'], [CalendarCheck, 'Appointment'], [UserPlus, 'Registration'], [LogIn, 'Check-in'], [Stethoscope, 'Consultation'],
  [Microscope, 'Diagnosis'], [FileText, 'Prescription'], [Pill, 'Pharmacy'], [CreditCard, 'Payment'], [Repeat, 'Follow-up']
]

const features = [
  [CalendarClock, 'Appointment Management'], [LogIn, 'Digital Check-in'], [ListOrdered, 'Smart Queue'], [FolderHeart, 'Patient Records'], [FileText, 'Digital Prescription'],
  [FlaskConical, 'Lab Reports'], [CreditCard, 'Payment Tracking'], [Pill, 'Pharmacy Integration'], [Repeat, 'Follow-up Management'], [Bell, 'Notifications'],
  [BarChart3, 'Reports & Analytics'], [ShieldCheck, 'Role-Based Access'], [LayoutDashboard, 'Operational Dashboards'], [HeartPulse, 'Patient Engagement'], [Plug, 'Third-Party Integrations']
]

const packages = [
  ['Basic / Free', 'Individual doctors and very small practices', ['Appointment management', 'Patient records', 'Digital prescription', 'Notifications']],
  ['Small Clinic', 'Single-location clinics and polyclinics', ['Everything in Basic', 'Digital check-in', 'Smart queue', 'Payment tracking', 'Follow-up management']],
  ['Mid-size', 'Multi-department hospitals and diagnostic centers', ['Everything in Small Clinic', 'Lab reports', 'Pharmacy integration', 'Role-based access', 'Reports & analytics'], true],
  ['Enterprise', 'Hospital groups, diagnostic chains and pharmacy networks', ['Everything in Mid-size', 'Operational dashboards', 'Omnichannel communication', 'Third-party integrations', 'Multi-site administration']]
]

const why = [
  [Layers, 'Unified Healthcare Operations', 'Front desk, clinical, lab and pharmacy teams work from the same live picture.'],
  [Share2, 'Connected Patient Journey', 'Every step of a visit hands off cleanly to the next, with nothing re-entered.'],
  [Eye, 'Workflow Visibility', 'See where each patient is, what is pending and where queues are building.'],
  [Network, 'Scalable Healthcare Platform', 'Start with one clinic and extend to departments, sites and partner networks.'],
  [Radio, 'Multi-Channel Communication', 'Reach patients and staff through the channels that fit each situation.'],
  [Gauge, 'Operational Insights', 'Turn daily activity into reports that help leaders plan capacity and service.']
]

const nodes = ['Patient', 'Doctor', 'Management', 'Lab', 'Pharmacy', 'Omnichannel']

function Network_({ mini }) {
  const pts = nodes.map((n, i) => {
    const a = (-90 + 60 * i) * Math.PI / 180
    return [n, 300 + 210 * Math.cos(a), 300 + 210 * Math.sin(a)]
  })
  return (
    <svg className={'net' + (mini ? ' mini' : '')} viewBox="0 0 600 600" role="img" aria-label="Doc Matrix connected to patient, doctor, management, lab, pharmacy and omnichannel">
      <defs>
        <radialGradient id={'g' + (mini ? 'a' : 'b')}><stop offset="0" stopColor="#14B8A6" stopOpacity=".35" /><stop offset="1" stopColor="#14B8A6" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx="300" cy="300" r="290" fill={`url(#g${mini ? 'a' : 'b'})`} />
      <circle className="orbit" cx="300" cy="300" r="210" />
      <circle className="orbit o2" cx="300" cy="300" r="120" />
      {pts.map(([n, x, y], i) => {
        const [, nx, ny] = pts[(i + 1) % 6]
        return <line key={'r' + n} className="ring" x1={x} y1={y} x2={nx} y2={ny} />
      })}
      {pts.map(([n, x, y], i) => (
        <g key={n}>
          <line className="flow" x1="300" y1="300" x2={x} y2={y} />
          <circle r="4" fill="#7FE0B0">
            <animateMotion dur={`${3 + (i % 3) * 0.6}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M300,300 L${x},${y}`} />
          </circle>
          <circle className="node" cx={x} cy={y} r="34" style={{ animationDelay: `${i * 0.4}s` }} />
          <circle cx={x} cy={y} r="8" fill={i % 2 ? '#14B8A6' : '#4C9AFF'} />
          <text x={x} y={y + (y > 300 ? 62 : -48)} textAnchor="middle" className="nl">{n}</text>
        </g>
      ))}
      <circle className="core" cx="300" cy="300" r="62" />
      <text x="300" y="296" textAnchor="middle" className="ct">DOC</text>
      <text x="300" y="322" textAnchor="middle" className="ct">MATRIX</text>
    </svg>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.12 })
    document.querySelectorAll('.rv').forEach(el => io.observe(el))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const go = () => setOpen(false)

  return (
    <>
      <header className={'nav' + (scrolled ? ' solid' : '')}>
        <div className="wrap nav-in">
          <a href="#home" className="brand">
            <img src="/favicon.svg" alt="DOC MATRIX Icon" className="brand-icon" />
            DOC MATRIX
          </a>
          <nav className={open ? 'links open' : 'links'}>
            {nav.map(([l, id]) => <a key={id} href={'#' + id} onClick={go}>{l}</a>)}
            <a href="#contact" className="btn sm" onClick={go}>Contact Us</a>
          </nav>
          <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="wrap hero-in">
          <div>
            <h1>DOC MATRIX</h1>
            <p className="tag">Healthcare, Connected as One.</p>
            <p className="lead">An integrated digital healthcare ecosystem connecting patients, doctors, management, diagnostics, pharmacy and communication channels.</p>
            <div className="btns">
              <a href="#solutions" className="btn">Explore Platform <ArrowRight size={18} /></a>
              <a href="#contact" className="btn ghost">Contact Us</a>
            </div>
          </div>
          <Network_ mini />
        </div>
      </section>

      <section id="about" className="sec">
        <div className="wrap split">
          <div className="rv">
            <h2>One platform for every healthcare workflow</h2>
            <p>Doc Matrix is a unified digital healthcare platform designed to connect different healthcare workflows into one ecosystem. Instead of separate tools for registration, consultation, lab, pharmacy and billing, every team shares one connected flow of information.</p>
            <p>The result is fewer handoffs, fewer repeated entries and a clearer view of care from the first appointment to the follow-up.</p>
          </div>
          <ul className="pillars rv">
            {[[UserRound, 'Patient'], [Stethoscope, 'Doctor'], [Building2, 'Management'], [FlaskConical, 'Diagnostics'], [Pill, 'Pharmacy'], [MessagesSquare, 'Omnichannel']].map(([I, t]) => <li key={t}><I size={22} />{t}</li>)}
          </ul>
        </div>
      </section>

      <section id="solutions" className="sec alt">
        <div className="wrap">
          <h2 className="rv">Solutions for every part of care</h2>
          <p className="sub rv">Six modules that work on their own and work better together.</p>
          <div className="grid g3">
            {solutions.map(([I, t, d, c], i) => (
              <article key={t} className="card sol rv" style={{ '--c': c, transitionDelay: `${(i % 3) * 80}ms` }}>
                <span className="ic"><I size={24} /></span>
                <h3>{t}</h3><p>{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="sec dark">
        <div className="wrap">
          <h2 className="rv">The healthcare workflow, end to end</h2>
          <p className="sub rv">Follow a patient through one connected journey.</p>
          <ol className="flow-steps">
            {steps.map(([I, t], i) => (
              <li key={t} className="rv" style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="dot"><I size={22} /></span>
                <b>{t}</b><small>Step {i + 1}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="sec">
        <div className="wrap">
          <h2 className="rv">Capabilities built for daily operations</h2>
          <div className="grid g5">
            {features.map(([I, t], i) => (
              <div key={t} className="card feat rv" style={{ transitionDelay: `${(i % 5) * 50}ms` }}><I size={22} /><span>{t}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="ecosystem" className="sec alt">
        <div className="wrap split eco">
          <div className="rv">
            <h2>A connected ecosystem</h2>
            <p>At the center, Doc Matrix links patients, doctors, management, labs, pharmacies and communication channels. Information moves between them as it happens, so every team sees the same up-to-date picture.</p>
          </div>
          <div className="rv"><Network_ /></div>
        </div>
      </section>

      <section id="packages" className="sec">
        <div className="wrap">
          <h2 className="rv">Packages for every organization</h2>
          <p className="sub rv">Choose the scope that matches your organization. Contact us for details.</p>
          <div className="grid g4">
            {packages.map(([n, who, fs, hl], i) => (
              <article key={n} className={'card pkg rv' + (hl ? ' hl' : '')} style={{ transitionDelay: `${i * 70}ms` }}>
                <h3>{n}</h3>
                <p className="who">{who}</p>
                <ul>{fs.map(f => <li key={f}><Check size={16} />{f}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="sec dark">
        <div className="wrap">
          <h2 className="rv">Why Doc Matrix</h2>
          <div className="why">
            {why.map(([I, t, d], i) => (
              <div key={t} className="why-row rv" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <I size={26} /><div><h3>{t}</h3><p>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="cta">
        <div className="wrap rv">
          <h2>Ready to Connect Your Healthcare Ecosystem?</h2>
          <p>Discover how Doc Matrix can bring your healthcare workflows together.</p>
          <a href="#contact" className="btn light">Talk to Us <ArrowRight size={18} /></a>
        </div>
      </section>

      <footer className="foot">
        <div className="wrap foot-in">
          <div>
            <a href="#home" className="brand">
              <img src="/favicon.svg" alt="DOC MATRIX Icon" className="brand-icon" />
              DOC MATRIX
            </a>
            <p>Connecting Every Layer of Healthcare.</p>
          </div>
          <nav>
            {[['Home', 'home'], ['Solutions', 'solutions'], ['Features', 'features'], ['Workflows', 'workflow'], ['Packages', 'packages'], ['About', 'about'], ['Contact', 'contact']].map(([l, id]) => <a key={l} href={'#' + id}>{l}</a>)}
          </nav>
        </div>
        <div className="wrap copy">&copy; {new Date().getFullYear()} DOC MATRIX. All rights reserved.</div>
      </footer>
    </>
  )
}
