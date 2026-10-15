import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Calendar, Users, Stethoscope, Receipt, BookOpen, Package, MessageSquare, Globe,
  BarChart3, Settings, LayoutDashboard, LogOut, User, Menu, X, ChevronRight, ChevronDown,
  Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Clock,
  Check, ShieldAlert, CreditCard, Search, Plus, Filter, Phone, Mail, FileText,
  Trash2, Edit3, Printer, Share2, CheckCircle, RefreshCw
} from 'lucide-react'

// Authentic DocMatrix Medical Cross Mark
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

// 8 Demo Staff Roles
const DEMO_STAFF_ROLES = [
  { role: 'DOCTOR', name: 'Dr. Arun Kumar', phone: '+910000000104' },
  { role: 'ORGANIZATION_ADMIN', name: 'Dr. Rajesh Nair (Owner)', phone: '+910000000101' },
  { role: 'BRANCH_ADMIN', name: 'Priya Menon (Branch Mgr)', phone: '+910000000102' },
  { role: 'RECEPTIONIST', name: 'Ananya S (Front Desk)', phone: '+910000000103' },
  { role: 'NURSE', name: 'Suma Joseph (Clinic Nurse)', phone: '+910000000105' },
  { role: 'LAB_TECHNICIAN', name: 'Rahul V (Lab Tech)', phone: '+910000000106' },
  { role: 'PHARMACIST', name: 'Deepa K (Pharmacist)', phone: '+910000000107' },
  { role: 'ACCOUNTANT', name: 'Manoj Pillai (Accounts)', phone: '+910000000108' }
]

// All 55 Launch Features exactly from the DocMatrix Feature Plan
const ALL_LAUNCH_FEATURES = [
  // Appointments
  { id: 'appt.queue', area: 'Appointments', name: 'Live queue', route: '/appointments/queue', desc: 'Live queue: Scheduled, Arrived, Waiting, In Consultation, Completed, with waiting-room timer', source: 'Part 1' },
  { id: 'appt.new', area: 'Appointments', name: 'Book appointment', route: '/appointments/new', desc: 'Book appointment and walk-ins on real clinic hours and doctor availability', source: 'Part 1' },
  { id: 'appt.calendar', area: 'Appointments', name: 'Calendar views', route: '/appointments/calendar', desc: 'Day, week and doctor-wise views with filters', source: 'Part 1' },
  { id: 'appt.detail', area: 'Appointments', name: 'Appointment details', route: '/appointments/:id', desc: 'Appointment details: reschedule and cancel with a reason, automatic no-show marking', source: 'Part 1', inNav: false },
  { id: 'appt.enquiries', area: 'Appointments', name: 'Missed enquiries', route: '/appointments/missed-enquiries', desc: 'Missed enquiries (half-finished online bookings)', source: 'Part 1' },

  // Patients
  { id: 'pat.list', area: 'Patients', name: 'Patients list', route: '/patients', desc: 'Patients: permanent ID, search by name, phone or ID', source: 'Part 1' },
  { id: 'pat.new', area: 'Patients', name: 'Register patient', route: '/patients/new', desc: 'Register patient', source: 'Part 1' },
  { id: 'pat.profile', area: 'Patients', name: 'Patient profile', route: '/patients/:id', desc: 'Patient profile: medical and dental history, allergy warnings at the top, assigned doctor', source: 'Part 1', inNav: false },
  { id: 'pat.timeline', area: 'Patients', name: 'Visit timeline', route: '/patients/:id/timeline', desc: 'Visit-by-visit timeline', source: 'Part 1', inNav: false },
  { id: 'pat.documents', area: 'Patients', name: 'Documents & X-rays', route: '/patients/:id/documents', desc: 'Documents: X-rays, scans, photos, consent forms', source: 'Part 1', inNav: false },
  { id: 'pat.consents', area: 'Patients', name: 'Consent records', route: '/patients/:id/consents', desc: 'Consent records', source: 'Part 1', inNav: false },
  { id: 'pat.pending', area: 'Patients', name: 'Pending treatments', route: '/patients/:id/pending-treatments', desc: 'Pending treatments from earlier visits (#30)', source: '#30', inNav: false },
  { id: 'pat.toothchart', area: 'Patients', name: 'Tooth chart', route: '/patients/:id/tooth-chart', desc: 'Tooth chart: tap a tooth, mark its condition, history for every visit (#1)', source: '#1', inNav: false },

  // Clinical
  { id: 'clin.prescriptions', area: 'Clinical', name: 'Digital prescriptions', route: '/clinical/prescriptions', desc: 'Digital prescriptions on the clinic letterhead', source: 'Part 1' },
  { id: 'clin.masterlists', area: 'Clinical', name: 'Master lists', route: '/clinical/master-lists', desc: 'Master lists: complaints, findings, diagnoses, medicines, advice', source: 'Part 1' },
  { id: 'clin.notes', area: 'Clinical', name: 'Clinical notes', route: '/clinical/notes', desc: 'Structured clinical notes', source: 'Part 1' },
  { id: 'clin.orders', area: 'Clinical', name: 'Diagnostic orders', route: '/clinical/orders', desc: 'Pathology and X-ray orders', source: 'Part 1' },
  { id: 'clin.plans', area: 'Clinical', name: 'Treatment plans', route: '/clinical/treatment-plans', desc: 'Treatment plans tracked to completion', source: 'Part 1' },
  { id: 'clin.estimates', area: 'Clinical', name: 'Cost estimates', route: '/clinical/estimates', desc: 'Treatment cost estimate the patient approves (#2)', source: '#2' },

  // Billing
  { id: 'bill.invoices', area: 'Billing', name: 'Itemised invoices', route: '/billing/invoices', desc: 'Itemised PDF invoices, part payments, UPI QR on the bill', source: 'Part 1' },
  { id: 'bill.invoice-new', area: 'Billing', name: 'New invoice', route: '/billing/invoices/new', desc: 'New invoice', source: 'Part 1', inNav: false },
  { id: 'bill.dues', area: 'Billing', name: 'Pending dues', route: '/billing/dues', desc: 'Pending dues list', source: 'Part 1' },
  { id: 'bill.collection', area: 'Billing', name: 'Daily collection', route: '/billing/collection', desc: 'Daily collection: cash, card, UPI', source: 'Part 1' },
  { id: 'bill.price-list', area: 'Billing', name: 'Price list & GST', route: '/billing/price-list', desc: 'Service price list with offer prices; tag each service as treatment or cosmetic for GST (#18)', source: '#18' },
  { id: 'bill.payments', area: 'Billing', name: 'Payment history', route: '/billing/payments', desc: 'Payment history', source: 'Part 1' },
  { id: 'bill.expenses', area: 'Billing', name: 'Expenses', route: '/billing/expenses', desc: 'Expense tracking', source: 'Part 1' },

  // Accounts (#5; roles ORGANIZATION_ADMIN, ACCOUNTANT)
  { id: 'acc.ledgers', area: 'Accounts', name: 'Accounts (ledgers)', route: '/accounts/ledgers', desc: 'Accounts (ledgers)', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },
  { id: 'acc.entries', area: 'Accounts', name: 'Entries (vouchers)', route: '/accounts/entries', desc: 'Entries (vouchers)', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },
  { id: 'acc.day-book', area: 'Accounts', name: 'Day book', route: '/accounts/day-book', desc: 'Day book', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },
  { id: 'acc.profit-loss', area: 'Accounts', name: 'Profit and loss', route: '/accounts/profit-loss', desc: 'Profit and loss', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },
  { id: 'acc.trial-balance', area: 'Accounts', name: 'Trial balance', route: '/accounts/trial-balance', desc: 'Trial balance', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },
  { id: 'acc.balance-sheet', area: 'Accounts', name: 'Balance sheet', route: '/accounts/balance-sheet', desc: 'Balance sheet', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },
  { id: 'acc.gst', area: 'Accounts', name: 'GST report', route: '/accounts/gst-report', desc: 'GST report', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },
  { id: 'acc.tally-export', area: 'Accounts', name: 'Export to Tally', route: '/accounts/export-tally', desc: 'Export to Tally', source: '#5', roles: ['ORGANIZATION_ADMIN', 'ACCOUNTANT'] },

  // Inventory (#6, basic)
  { id: 'inv.items', area: 'Inventory', name: 'Items and stock', route: '/inventory/items', desc: 'Items and stock', source: '#6' },
  { id: 'inv.movements', area: 'Inventory', name: 'Stock in/out', route: '/inventory/movements', desc: 'Stock in and out', source: '#6' },
  { id: 'inv.alerts', area: 'Inventory', name: 'Low-stock alerts', route: '/inventory/alerts', desc: 'Low-stock and expiry alerts', source: '#6' },

  // WhatsApp
  { id: 'wa.automation', area: 'WhatsApp', name: 'WhatsApp automation', route: '/whatsapp/automation', desc: 'Confirmation, 24-hour and 2-hour reminders, rescheduled and cancelled notices, welcome message, prescription and invoice PDFs', source: 'Part 1' },
  { id: 'wa.log', area: 'WhatsApp', name: 'Message log', route: '/whatsapp/log', desc: 'Log of every message', source: 'Part 1' },
  { id: 'wa.recalls', area: 'WhatsApp', name: 'Recall reminders', route: '/whatsapp/recalls', desc: 'Recall reminders, for example "your 6-month cleaning is due" (#10)', source: '#10' },

  // Website (staff side)
  { id: 'web.settings', area: 'Website', name: 'Clinic website settings', route: '/website/settings', desc: 'Clinic website: online booking on real slots, gallery with before-and-after sliders, reviews, enquiry form', source: 'Part 1' },
  { id: 'web.approvals', area: 'Website', name: 'Booking approvals', route: '/website/approvals', desc: 'Approval inbox for online bookings (WhatsApp code verified)', source: 'Part 1' },

  // Reports
  { id: 'rep.revenue', area: 'Reports', name: 'Revenue', route: '/reports/revenue', desc: 'Revenue', source: 'Part 1' },
  { id: 'rep.doctors', area: 'Reports', name: 'Doctor performance', route: '/reports/doctors', desc: 'Doctor-wise performance', source: 'Part 1' },
  { id: 'rep.treatments', area: 'Reports', name: 'Treatment breakdown', route: '/reports/treatments', desc: 'Treatment breakdown', source: 'Part 1' },
  { id: 'rep.dues-ageing', area: 'Reports', name: 'Dues ageing', route: '/reports/dues-ageing', desc: 'Pending dues by age', source: 'Part 1' },
  { id: 'rep.income-expense', area: 'Reports', name: 'Income vs expense', route: '/reports/income-expense', desc: 'Income vs expense', source: 'Part 1' },
  { id: 'rep.conversion', area: 'Reports', name: 'Booking conversion', route: '/reports/booking-conversion', desc: 'Booking conversion', source: 'Part 1' },

  // Settings
  { id: 'set.clinic', area: 'Settings', name: 'Clinic profile', route: '/settings/clinic', desc: 'Clinic profile, letterhead, working hours, chairs, branches', source: 'Part 1', roles: ['ORGANIZATION_ADMIN', 'BRANCH_ADMIN'] },
  { id: 'set.staff', area: 'Settings', name: 'Staff management', route: '/settings/staff', desc: 'Staff: unlimited logins, person-by-person permissions, instant deactivation, staff profiles', source: 'Part 1', roles: ['ORGANIZATION_ADMIN', 'BRANCH_ADMIN'] },
  { id: 'set.audit', area: 'Settings', name: 'Audit log', route: '/settings/audit-log', desc: 'Audit log: every edit, deletion, prescription change, discount and cancellation', source: 'Part 1', roles: ['ORGANIZATION_ADMIN'] },
  { id: 'set.privacy', area: 'Settings', name: 'Privacy & consent', route: '/settings/privacy', desc: 'Consent screens and data-protection controls, patient data export on request (#25)', source: '#25', roles: ['ORGANIZATION_ADMIN', 'BRANCH_ADMIN'] },
  { id: 'set.data', area: 'Settings', name: 'Data export/import', route: '/settings/data', desc: 'Data export and import (#24)', source: '#24', roles: ['ORGANIZATION_ADMIN', 'BRANCH_ADMIN'] },
  { id: 'set.activity', area: 'Settings', name: 'Activity log', route: '/settings/activity-log', desc: 'Activity log: who changed what, and when (#26)', source: '#26', roles: ['ORGANIZATION_ADMIN', 'BRANCH_ADMIN'] },
  { id: 'set.plan', area: 'Settings', name: 'Subscription plan', route: '/settings/plan', desc: 'Subscription and plan', source: 'Part 1', roles: ['ORGANIZATION_ADMIN', 'BRANCH_ADMIN'] }
]

const AREA_ICONS = {
  Appointments: Calendar,
  Patients: Users,
  Clinical: Stethoscope,
  Billing: Receipt,
  Accounts: BookOpen,
  Inventory: Package,
  WhatsApp: MessageSquare,
  Website: Globe,
  Reports: BarChart3,
  Settings: Settings
}

export default function StaffPortal({
  user = { id: 'usr-104', name: 'Dr. Arun Kumar', role: 'DOCTOR', clinicName: 'Demo Dental Clinic' },
  onUserChange,
  onLogout,
  onReturnToWebsite
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentUser, setCurrentUser] = useState(user)
  const [activeRoute, setActiveRoute] = useState(() => {
    return location.pathname && location.pathname !== '/' ? location.pathname : '/dashboard'
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lang, setLang] = useState('en')
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Interactive Live Queue State
  const [queueItems, setQueueItems] = useState([
    { id: 'q-1', token: 'T-01', patient: 'Meera Nambiar', phone: '+91 94471 23456', time: '10:00 AM', arrival: '09:52 AM', waitMins: 8, doctor: 'Dr. Arun Kumar', stage: 'Waiting', reason: 'Toothache (Upper Molar)' },
    { id: 'q-2', token: 'T-02', patient: 'Rahul Krishnan', phone: '+91 98460 54321', time: '10:15 AM', arrival: '10:00 AM', waitMins: 15, doctor: 'Dr. Arun Kumar', stage: 'In Consultation', reason: 'Routine Scaling & Polish' },
    { id: 'q-3', token: 'T-03', patient: 'Fatima Zahra', phone: '+91 97455 11223', time: '10:30 AM', arrival: '10:08 AM', waitMins: 22, doctor: 'Dr. Tariq Antoun', stage: 'Waiting', reason: 'Ceramic Crown Fitting' },
    { id: 'q-4', token: 'T-04', patient: 'George Mathew', phone: '+91 94470 98765', time: '10:45 AM', arrival: '10:35 AM', waitMins: 5, doctor: 'Dr. Arun Kumar', stage: 'Arrived', reason: 'Post-op Extraction Review' },
    { id: 'q-5', token: 'T-05', patient: 'Ananya Pillai', phone: '+91 98472 33445', time: '11:00 AM', arrival: '10:45 AM', waitMins: 2, doctor: 'Dr. Tariq Antoun', stage: 'Arrived', reason: 'Clear Aligner Consultation' }
  ])

  // Interactive Patients State
  const [patientsList, setPatientsList] = useState([
    { id: 'DM-2026-001', name: 'Meera Nambiar', age: 34, gender: 'F', phone: '+91 94471 23456', doctor: 'Dr. Arun Kumar', alerts: 'Penicillin Allergy', lastVisit: 'Today', treatment: 'Root Canal Treatment (Session 2/3)', balance: '₹0' },
    { id: 'DM-2026-002', name: 'Rahul Krishnan', age: 28, gender: 'M', phone: '+91 98460 54321', doctor: 'Dr. Arun Kumar', alerts: 'None', lastVisit: 'Today', treatment: 'Ultrasonic Scaling & Polishing', balance: '₹0' },
    { id: 'DM-2026-003', name: 'Fatima Zahra', age: 41, gender: 'F', phone: '+91 97455 11223', doctor: 'Dr. Tariq Antoun', alerts: 'Hypertension', lastVisit: '12 Oct 2026', treatment: 'E-Max Crown Cementation', balance: '₹3,000' },
    { id: 'DM-2026-004', name: 'George Mathew', age: 56, gender: 'M', phone: '+91 94470 98765', doctor: 'Dr. Arun Kumar', alerts: 'Diabetic (Type 2)', lastVisit: '08 Oct 2026', treatment: 'Extraction Socket Healing', balance: '₹1,800' },
    { id: 'DM-2026-005', name: 'Ananya Pillai', age: 22, gender: 'F', phone: '+91 98472 33445', doctor: 'Dr. Tariq Antoun', alerts: 'None', lastVisit: '01 Oct 2026', treatment: 'Clear Aligner Scan & Plan', balance: '₹0' }
  ])

  // Keep route synced with browser address bar
  useEffect(() => {
    if (location.pathname && location.pathname !== '/login' && location.pathname !== '/signup') {
      setActiveRoute(location.pathname)
    }
  }, [location.pathname])

  const navigateTo = (route) => {
    setActiveRoute(route)
    navigate(route)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Group features by area
  const groupedAreas = useMemo(() => {
    const map = {}
    ALL_LAUNCH_FEATURES.forEach((f) => {
      if (f.inNav === false) return
      if (!map[f.area]) map[f.area] = []
      map[f.area].push(f)
    })
    return map
  }, [])

  // Check role permission for active feature
  const activeFeature = useMemo(() => {
    return ALL_LAUNCH_FEATURES.find((f) => f.route === activeRoute)
  }, [activeRoute])

  const isForbidden = useMemo(() => {
    if (!activeFeature || !activeFeature.roles) return false
    return !activeFeature.roles.includes(currentUser.role)
  }, [activeFeature, currentUser.role])

  // Switch role handler
  const handleRoleSelect = (roleObj) => {
    const updated = {
      ...currentUser,
      role: roleObj.role,
      name: roleObj.name,
      phone: roleObj.phone
    }
    setCurrentUser(updated)
    setRoleDropdownOpen(false)
    if (onUserChange) onUserChange(updated)
  }

  // Update patient stage in queue
  const handleStageChange = (id, newStage) => {
    setQueueItems(prev => prev.map(item => item.id === id ? { ...item, stage: newStage } : item))
  }

  return (
    <div className="staff-portal-container" style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--paper, #fbfbf9)',
      color: 'var(--ink, #0b0b0b)',
      fontFamily: '"Instrument Sans", "Plus Jakarta Sans", "Inter", -apple-system, sans-serif'
    }}>
      {/* Top Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--line, #e9e9e5)',
        padding: '10px clamp(16px, 3vw, 28px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '32px',
        zIndex: 90
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px'
            }}
            className="mobile-nav-toggle-btn"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Brand Logo */}
          <div
            onClick={() => navigateTo('/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <MedicalCrossMark />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', fontWeight: '900', letterSpacing: '0.08em', color: 'var(--teal-primary, #008891)' }}>
                DOC MATRIX
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--charcoal-title, #1a2626)' }}>
                {currentUser.clinicName || 'Demo Dental Clinic'}
              </span>
            </div>
          </div>

          {/* Breadcrumb path */}
          <div style={{ display: 'none', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--charcoal-muted, #6e7e7d)', paddingLeft: '14px', borderLeft: '1px solid var(--line, #e9e9e5)' }} className="desktop-breadcrumb">
            <span style={{ cursor: 'pointer', color: activeRoute === '/dashboard' ? 'var(--teal-primary)' : 'inherit', fontWeight: activeRoute === '/dashboard' ? '700' : 'normal' }} onClick={() => navigateTo('/dashboard')}>
              Dashboard
            </span>
            {activeFeature && (
              <>
                <ChevronRight size={13} />
                <span>{activeFeature.area}</span>
                <ChevronRight size={13} />
                <span style={{ fontWeight: '700', color: 'var(--charcoal-title, #1a2626)' }}>{activeFeature.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Right Header Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Back to Website Button */}
          {onReturnToWebsite && (
            <button
              onClick={onReturnToWebsite}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '999px',
                border: '1.5px solid var(--line, #e9e9e5)',
                background: '#ffffff',
                fontSize: '12px',
                fontWeight: '700',
                color: 'var(--charcoal-dark, #111a1a)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Globe size={13} style={{ color: 'var(--teal-primary, #008891)' }} />
              <span>Main Website</span>
            </button>
          )}

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ml' : 'en')}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid var(--line, #e9e9e5)',
              background: '#ffffff',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {lang === 'en' ? 'EN' : 'മലയാളം'}
          </button>

          {/* Interactive Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '999px',
                background: 'rgba(0, 136, 145, 0.08)',
                border: '1px solid rgba(0, 136, 145, 0.25)',
                fontSize: '12.5px',
                fontWeight: '700',
                color: 'var(--charcoal-dark, #111a1a)',
                cursor: 'pointer'
              }}
            >
              <User size={13} style={{ color: 'var(--teal-primary, #008891)' }} />
              <span style={{ maxWidth: '130px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentUser.name}
              </span>
              <span style={{ fontSize: '10px', fontWeight: '800', background: 'var(--teal-primary, #008891)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px' }}>
                {currentUser.role}
              </span>
              <ChevronDown size={13} />
            </button>

            {roleDropdownOpen && (
              <div style={{
                position: 'absolute',
                right: 0,
                top: '42px',
                width: '260px',
                background: '#ffffff',
                border: '1px solid var(--line, #e9e9e5)',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                padding: '8px',
                zIndex: 120
              }}>
                <div style={{ padding: '6px 10px', fontSize: '11px', fontWeight: '800', color: 'var(--charcoal-muted, #6e7e7d)', textTransform: 'uppercase' }}>
                  Switch Demo Staff Role
                </div>
                {DEMO_STAFF_ROLES.map((r) => (
                  <button
                    key={r.role}
                    onClick={() => handleRoleSelect(r)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: currentUser.role === r.role ? 'rgba(0, 136, 145, 0.08)' : 'transparent',
                      color: currentUser.role === r.role ? 'var(--teal-primary, #008891)' : 'var(--charcoal-body, #475554)',
                      fontSize: '12px',
                      fontWeight: currentUser.role === r.role ? '750' : '550',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: '700' }}>{r.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--charcoal-muted, #6e7e7d)' }}>{r.role}</div>
                    </div>
                    {currentUser.role === r.role && <Check size={14} style={{ color: 'var(--teal-primary, #008891)' }} />}
                  </button>
                ))}
                <div style={{ height: '1px', background: 'var(--line, #e9e9e5)', margin: '6px 0' }} />
                <button
                  onClick={() => { setRoleDropdownOpen(false); if (onLogout) onLogout(); }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#fef2f2',
                    color: '#dc2626',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={13} />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 3. Main Portal Body (Sidebar + Content Stage) */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Left Sidebar Navigation */}
        <aside
          style={{
            width: '260px',
            background: '#ffffff',
            borderRight: '1px solid var(--line, #e9e9e5)',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: '92px',
            height: 'calc(100vh - 92px)',
            overflowY: 'auto'
          }}
          className={`staff-sidebar ${mobileMenuOpen ? 'is-open' : ''}`}
        >
          {/* Dashboard Home Link */}
          <div style={{ padding: '12px 14px 4px 14px' }}>
            <button
              onClick={() => navigateTo('/dashboard')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                borderRadius: '10px',
                border: 'none',
                background: activeRoute === '/dashboard' ? 'var(--teal-primary, #008891)' : 'transparent',
                color: activeRoute === '/dashboard' ? '#ffffff' : 'var(--charcoal-body, #475554)',
                fontSize: '13px',
                fontWeight: activeRoute === '/dashboard' ? '700' : '600',
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              <LayoutDashboard size={16} />
              <span>Clinic Dashboard</span>
            </button>
          </div>

          {/* Grouped Areas */}
          <div style={{ padding: '8px 14px 20px 14px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(groupedAreas).map(([areaName, features]) => {
              const IconComp = AREA_ICONS[areaName] || Calendar
              return (
                <div key={areaName}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 8px',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    color: 'var(--charcoal-muted, #6e7e7d)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}>
                    <IconComp size={12} style={{ color: 'var(--teal-primary, #008891)' }} />
                    <span>{areaName}</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
                    {features.map((feat) => {
                      const isCurrent = activeRoute === feat.route
                      const isRestricted = feat.roles && !feat.roles.includes(currentUser.role)
                      return (
                        <button
                          key={feat.id}
                          onClick={() => navigateTo(feat.route)}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '7px 10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isCurrent ? 'rgba(0, 136, 145, 0.1)' : 'transparent',
                            color: isCurrent ? 'var(--teal-primary, #008891)' : isRestricted ? '#94a3b8' : 'var(--charcoal-body, #475554)',
                            fontSize: '12px',
                            fontWeight: isCurrent ? '750' : '550',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {feat.name}
                          </span>
                          {isRestricted ? (
                            <span style={{ fontSize: '9px', fontWeight: '700', padding: '1px 4px', borderRadius: '4px', background: '#f1f5f9', color: '#64748b' }}>
                              Locked
                            </span>
                          ) : isCurrent ? (
                            <ChevronRight size={12} />
                          ) : null}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main style={{ flex: 1, padding: '28px clamp(16px, 3vw, 36px)', overflowY: 'auto' }}>
          {isForbidden ? (
            /* 403 Forbidden Screen */
            <div style={{ maxWidth: '600px', margin: '40px auto', background: '#ffffff', border: '1px solid #fee2e2', borderRadius: '18px', padding: '36px', textAlign: 'center', boxShadow: '0 4px 20px rgba(220, 38, 38, 0.08)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#fef2f2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                <ShieldAlert size={28} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#991b1b', marginBottom: '8px' }}>Access Restricted (403 Forbidden)</h2>
              <p style={{ fontSize: '13.5px', color: 'var(--charcoal-body, #475554)', lineHeight: '1.5', marginBottom: '16px' }}>
                Your current staff role <strong>{currentUser.role}</strong> does not have permission to view this section.
              </p>
              <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '10px', fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
                Allowed roles for this page: {activeFeature?.roles?.join(', ')}
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={() => navigateTo('/dashboard')}
                  className="btn-hero-teal"
                  style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '999px', cursor: 'pointer' }}
                >
                  Return to Dashboard
                </button>
                <button
                  onClick={() => handleRoleSelect(DEMO_STAFF_ROLES[1])}
                  className="btn-hero-outline"
                  style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '999px', cursor: 'pointer' }}
                >
                  Switch to Org Admin
                </button>
              </div>
            </div>
          ) : activeRoute === '/dashboard' ? (
            /* ===============================================================
               DASHBOARD VIEW (6 Clearly Labelled DEMO Metric Cards)
               =============================================================== */
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)' }}>
                      Clinic Operations Dashboard
                    </h1>
                    <span style={{ fontSize: '11px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px', background: '#ddf4ef', color: '#00757d' }}>
                      <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
                      LIVE DEMO DATA
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--charcoal-muted, #6e7e7d)' }}>
                    Clinic overview, live queues, patient consultations, and collections for {currentUser.clinicName}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => navigateTo('/appointments/new')}
                    className="btn-hero-teal"
                    style={{ padding: '8px 16px', fontSize: '12.5px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                  >
                    <span>+ Book Appointment</span>
                  </button>
                </div>
              </div>

              {/* 6 DEMO Metric Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
              }}>
                {[
                  { title: "Today's Appointments", value: '18', badge: 'TODAY', desc: '12 completed • 4 waiting • 2 no-shows', route: '/appointments/queue', icon: Calendar, color: '#008891' },
                  { title: 'Waiting Room Queue', value: '5 Patients', badge: 'LIVE QUEUE', desc: 'Average wait: 14 mins (Under target)', route: '/appointments/queue', icon: Clock, color: '#0A9EAD' },
                  { title: 'Collections Today', value: '₹34,500', badge: 'DAILY BILLING', desc: 'Cash: ₹8,000 • Card: ₹14,500 • UPI: ₹12,000', route: '/billing/collection', icon: Receipt, color: '#059669' },
                  { title: 'Pending Dues', value: '₹12,800', badge: 'OVERDUE DUES', desc: 'Across 4 patient treatment cycles', route: '/billing/dues', icon: CreditCard, color: '#d97706' },
                  { title: 'Low Stock Alerts', value: '3 Items', badge: 'INVENTORY', desc: 'Latex Gloves (M), Composite Resin A2', route: '/inventory/alerts', icon: Package, color: '#dc2626' },
                  { title: 'Missed Enquiries', value: '4 Bookings', badge: 'ONLINE ENQUIRIES', desc: 'Follow-ups required on website requests', route: '/appointments/missed-enquiries', icon: MessageSquare, color: '#7c3aed' }
                ].map((card, i) => {
                  const IconC = card.icon
                  return (
                    <div
                      key={i}
                      onClick={() => navigateTo(card.route)}
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--line, #e9e9e5)',
                        borderRadius: '16px',
                        padding: '18px 20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{ fontSize: '10.5px', fontWeight: '800', letterSpacing: '0.04em', color: card.color, background: 'rgba(0, 136, 145, 0.08)', padding: '3px 8px', borderRadius: '4px' }}>
                          {card.badge}
                        </span>
                        <IconC size={18} style={{ color: card.color }} />
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--charcoal-muted, #6e7e7d)', marginBottom: '4px' }}>
                        {card.title}
                      </div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '8px' }}>
                        {card.value}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--charcoal-body, #475554)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{card.desc}</span>
                        <ArrowRight size={13} style={{ color: card.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Quick Navigation Hub to All 10 Practice Areas */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line, #e9e9e5)', borderRadius: '18px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.02)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '14px' }}>
                  Quick Launch by Clinical Area
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {Object.entries(groupedAreas).map(([area, list]) => {
                    const AreaIcon = AREA_ICONS[area] || Calendar
                    return (
                      <button
                        key={area}
                        onClick={() => navigateTo(list[0]?.route || '/dashboard')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: '1px solid var(--line, #e9e9e5)',
                          background: '#fbfbf9',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <AreaIcon size={16} style={{ color: 'var(--teal-primary)' }} />
                        <div>
                          <div style={{ fontSize: '12.5px', fontWeight: '750', color: 'var(--charcoal-title)' }}>{area}</div>
                          <div style={{ fontSize: '11px', color: 'var(--charcoal-muted)' }}>{list.length} launch pages</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : activeRoute === '/appointments/queue' ? (
            /* ===============================================================
               LIVE PATIENT QUEUE SCREEN
               =============================================================== */
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--charcoal-title)' }}>Live Patient Queue</h1>
                  <p style={{ fontSize: '13px', color: 'var(--charcoal-muted)' }}>Real-time waiting room queue with active doctor consultations</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigateTo('/appointments/new')} className="btn-hero-teal" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '999px', cursor: 'pointer' }}>
                    + Add Walk-In Patient
                  </button>
                </div>
              </div>

              {/* Queue Status Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--charcoal-muted)' }}>PATIENTS WAITING</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--teal-primary)' }}>3</div>
                </div>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--charcoal-muted)' }}>IN CONSULTATION</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#059669' }}>1</div>
                </div>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--charcoal-muted)' }}>AVG WAITING TIME</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: '#d97706' }}>11 min</div>
                </div>
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '12px', border: '1px solid var(--line)' }}>
                  <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--charcoal-muted)' }}>COMPLETED TODAY</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--charcoal-title)' }}>12</div>
                </div>
              </div>

              {/* Queue Table */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-alt)', borderBottom: '1px solid var(--line)', color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Token</th>
                      <th style={{ padding: '12px 16px' }}>Patient</th>
                      <th style={{ padding: '12px 16px' }}>Reason</th>
                      <th style={{ padding: '12px 16px' }}>Doctor</th>
                      <th style={{ padding: '12px 16px' }}>Wait Time</th>
                      <th style={{ padding: '12px 16px' }}>Stage</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queueItems.map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '14px 16px', fontWeight: '800', color: 'var(--teal-primary)' }}>{item.token}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <div style={{ fontWeight: '700', color: 'var(--charcoal-title)' }}>{item.patient}</div>
                          <div style={{ fontSize: '11px', color: 'var(--charcoal-muted)' }}>{item.phone}</div>
                        </td>
                        <td style={{ padding: '14px 16px', color: 'var(--charcoal-body)' }}>{item.reason}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--charcoal-body)' }}>{item.doctor}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '999px',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: item.waitMins > 20 ? '#fef2f2' : item.waitMins > 10 ? '#fffbeb' : '#f0fdf4',
                            color: item.waitMins > 20 ? '#dc2626' : item.waitMins > 10 ? '#d97706' : '#16a34a'
                          }}>
                            {item.waitMins} mins
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: item.stage === 'In Consultation' ? '#ddf4ef' : item.stage === 'Waiting' ? '#fef3c7' : '#f1f5f9',
                            color: item.stage === 'In Consultation' ? '#00757d' : item.stage === 'Waiting' ? '#92400e' : '#475554'
                          }}>
                            {item.stage}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          {item.stage === 'Waiting' ? (
                            <button
                              onClick={() => handleStageChange(item.id, 'In Consultation')}
                              style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', background: 'var(--teal-primary)', color: '#ffffff', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Call to Chair
                            </button>
                          ) : item.stage === 'In Consultation' ? (
                            <button
                              onClick={() => handleStageChange(item.id, 'Completed')}
                              style={{ padding: '5px 10px', borderRadius: '6px', border: 'none', background: '#059669', color: '#ffffff', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Finish Visit
                            </button>
                          ) : (
                            <span style={{ fontSize: '11.5px', color: '#16a34a', fontWeight: '700' }}>✓ Completed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeRoute === '/patients' ? (
            /* ===============================================================
               PATIENTS DIRECTORY SCREEN
               =============================================================== */
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--charcoal-title)' }}>Patients Directory</h1>
                  <p style={{ fontSize: '13px', color: 'var(--charcoal-muted)' }}>Longitudinal dental records, allergies, and treatment histories</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigateTo('/patients/new')} className="btn-hero-teal" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '999px', cursor: 'pointer' }}>
                    + New Patient Registration
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--charcoal-muted)' }} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search patients by name, phone or patient ID..."
                    style={{
                      width: '100%',
                      padding: '10px 14px 10px 38px',
                      borderRadius: '10px',
                      border: '1px solid var(--line)',
                      fontSize: '13px',
                      background: '#ffffff'
                    }}
                  />
                </div>
              </div>

              {/* Patients Table */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-alt)', borderBottom: '1px solid var(--line)', color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Patient ID</th>
                      <th style={{ padding: '12px 16px' }}>Name & Demographic</th>
                      <th style={{ padding: '12px 16px' }}>Medical Alerts</th>
                      <th style={{ padding: '12px 16px' }}>Active Treatment</th>
                      <th style={{ padding: '12px 16px' }}>Assigned Doctor</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patientsList
                      .filter(p => !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.phone.includes(searchTerm) || p.id.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((p) => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--line)' }}>
                          <td style={{ padding: '14px 16px', fontWeight: '800', color: 'var(--teal-primary)' }}>{p.id}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ fontWeight: '700', color: 'var(--charcoal-title)' }}>{p.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--charcoal-muted)' }}>{p.age} yrs • {p.gender} • {p.phone}</div>
                          </td>
                          <td style={{ padding: '14px 16px' }}>
                            {p.alerts !== 'None' ? (
                              <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700' }}>
                                ⚠️ {p.alerts}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--charcoal-muted)', fontSize: '11.5px' }}>None recorded</span>
                            )}
                          </td>
                          <td style={{ padding: '14px 16px', color: 'var(--charcoal-body)' }}>{p.treatment}</td>
                          <td style={{ padding: '14px 16px', color: 'var(--charcoal-body)' }}>{p.doctor}</td>
                          <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                            <button
                              onClick={() => navigateTo('/clinical/prescriptions')}
                              style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: '#ffffff', color: 'var(--teal-primary)', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', marginRight: '6px' }}
                            >
                              New Rx
                            </button>
                            <button
                              onClick={() => navigateTo('/billing/invoices')}
                              style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: '#ffffff', color: 'var(--charcoal-body)', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}
                            >
                              Invoice
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeRoute === '/clinical/prescriptions' ? (
            /* ===============================================================
               DIGITAL PRESCRIPTION SCREEN
               =============================================================== */
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--charcoal-title)' }}>Digital Prescriptions</h1>
                  <p style={{ fontSize: '13px', color: 'var(--charcoal-muted)' }}>Generate compliant clinical prescriptions on official clinic letterhead</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => alert('Demo Action: Printing Prescription PDF to Letterhead')} className="btn-hero-outline" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <Printer size={13} /> Print
                  </button>
                  <button onClick={() => alert('Demo Action: Sent via Official WhatsApp API to patient')} className="btn-hero-teal" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '999px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <Share2 size={13} /> Send via WhatsApp
                  </button>
                </div>
              </div>

              {/* Clinic Letterhead Preview */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '16px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                {/* Letterhead Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--teal-primary)', paddingBottom: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MedicalCrossMark />
                    <div>
                      <h2 style={{ fontSize: '18px', fontWeight: '900', color: 'var(--teal-primary)' }}>DOC MATRIX DENTAL CLINIC</h2>
                      <div style={{ fontSize: '11px', color: 'var(--charcoal-muted)' }}>MG Road, Ernakulam, Kerala • Reg: KMC/DEN/48291 • Tel: +91 484 2345678</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--charcoal-title)' }}>Dr. Arun Kumar, BDS, MDS</div>
                    <div style={{ fontSize: '11px', color: 'var(--charcoal-muted)' }}>Consultant Endodontist & Dental Surgeon</div>
                  </div>
                </div>

                {/* Patient Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'var(--surface-alt)', borderRadius: '8px', fontSize: '12px', marginBottom: '24px' }}>
                  <div><strong>Patient:</strong> Meera Nambiar (DM-2026-001)</div>
                  <div><strong>Age / Gender:</strong> 34 / Female</div>
                  <div><strong>Date:</strong> 15 Oct 2026</div>
                  <div><strong style={{ color: '#dc2626' }}>Allergy:</strong> Penicillin</div>
                </div>

                {/* Rx Symbol & Medication Table */}
                <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--teal-primary)', marginBottom: '12px' }}>℞</div>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px', marginBottom: '28px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid var(--line)', color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      <th style={{ padding: '8px 4px' }}>#</th>
                      <th style={{ padding: '8px 4px' }}>Medicine / Brand</th>
                      <th style={{ padding: '8px 4px' }}>Dosage & Frequency</th>
                      <th style={{ padding: '8px 4px' }}>Duration</th>
                      <th style={{ padding: '8px 4px' }}>Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 4px' }}>1</td>
                      <td style={{ padding: '12px 4px', fontWeight: '700' }}>Tab. Cefuroxime 500mg (Ceftum)</td>
                      <td style={{ padding: '12px 4px' }}>1 tablet • Twice daily (1-0-1)</td>
                      <td style={{ padding: '12px 4px' }}>5 Days</td>
                      <td style={{ padding: '12px 4px', color: 'var(--charcoal-muted)' }}>Take after meals</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 4px' }}>2</td>
                      <td style={{ padding: '12px 4px', fontWeight: '700' }}>Tab. Combiflam (Ibuprofen + Paracetamol)</td>
                      <td style={{ padding: '12px 4px' }}>1 tablet • SOS for pain (max 3/day)</td>
                      <td style={{ padding: '12px 4px' }}>3 Days</td>
                      <td style={{ padding: '12px 4px', color: 'var(--charcoal-muted)' }}>Take after food</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 4px' }}>3</td>
                      <td style={{ padding: '12px 4px', fontWeight: '700' }}>Chlorhexidine 0.2% Oral Rinse (Hexidine)</td>
                      <td style={{ padding: '12px 4px' }}>10 ml rinse for 60 secs • Twice daily</td>
                      <td style={{ padding: '12px 4px' }}>7 Days</td>
                      <td style={{ padding: '12px 4px', color: 'var(--charcoal-muted)' }}>Do not swallow, rinse after meals</td>
                    </tr>
                  </tbody>
                </table>

                {/* Advice Notes */}
                <div style={{ padding: '14px', borderRadius: '8px', background: '#fbfbf9', border: '1px solid var(--line)', marginBottom: '36px', fontSize: '12.5px' }}>
                  <div style={{ fontWeight: '800', marginBottom: '4px', color: 'var(--charcoal-title)' }}>Clinical Advice & Follow-Up:</div>
                  <ul style={{ paddingLeft: '18px', color: 'var(--charcoal-body)', lineHeight: '1.6' }}>
                    <li>Avoid chewing hard food on upper right side until permanent crown is seated.</li>
                    <li>Continue warm salt water gargle starting tomorrow morning.</li>
                    <li>Next appointment scheduled for <strong>Tuesday, 20 Oct at 10:30 AM</strong> for crown cementation.</li>
                  </ul>
                </div>

                {/* Signature Bar */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', textAlign: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--teal-primary)', borderBottom: '1px solid var(--line)', paddingBottom: '4px', marginBottom: '4px' }}>
                      Digitally Verified by Dr. Arun Kumar
                    </div>
                    <div style={{ fontSize: '10.5px', color: 'var(--charcoal-muted)' }}>Registered Dental Surgeon #KDC-14920</div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeRoute === '/billing/invoices' ? (
            /* ===============================================================
               ITEMISED BILLING INVOICES SCREEN
               =============================================================== */
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--charcoal-title)' }}>Itemised Invoices</h1>
                  <p style={{ fontSize: '13px', color: 'var(--charcoal-muted)' }}>Manage patient treatment invoices, GST breakdown, and payment status</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => navigateTo('/billing/collection')} className="btn-hero-outline" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '999px', cursor: 'pointer' }}>
                    Daily Collection
                  </button>
                  <button onClick={() => alert('Demo Action: Generated new invoice')} className="btn-hero-teal" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '999px', cursor: 'pointer' }}>
                    + New Invoice
                  </button>
                </div>
              </div>

              {/* Invoices Table */}
              <div style={{ background: '#ffffff', border: '1px solid var(--line)', borderRadius: '14px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
                  <thead>
                    <tr style={{ background: 'var(--surface-alt)', borderBottom: '1px solid var(--line)', color: 'var(--charcoal-muted)', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase' }}>
                      <th style={{ padding: '12px 16px' }}>Invoice #</th>
                      <th style={{ padding: '12px 16px' }}>Patient</th>
                      <th style={{ padding: '12px 16px' }}>Treatment / Procedure</th>
                      <th style={{ padding: '12px 16px' }}>Total Amount</th>
                      <th style={{ padding: '12px 16px' }}>Payment Method</th>
                      <th style={{ padding: '12px 16px' }}>Status</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'INV-2026-089', patient: 'Meera Nambiar', service: 'Root Canal Treatment + Restoration', amount: '₹4,500', method: 'UPI (GPay)', status: 'Paid', date: 'Today' },
                      { id: 'INV-2026-088', patient: 'Rahul Krishnan', service: 'Full Mouth Scaling & Polishing', amount: '₹1,200', method: 'Cash Drawer', status: 'Paid', date: 'Today' },
                      { id: 'INV-2026-087', patient: 'Fatima Zahra', service: 'E-Max Ceramic Crown (Session 1/2)', amount: '₹6,000', method: 'Card POS (₹3,000)', status: 'Partially Paid', date: '12 Oct' },
                      { id: 'INV-2026-086', patient: 'George Mathew', service: 'Surgical Extraction + Antibiotics', amount: '₹1,800', method: 'Pending', status: 'Unpaid Dues', date: '08 Oct' }
                    ].map((inv) => (
                      <tr key={inv.id} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '14px 16px', fontWeight: '800', color: 'var(--teal-primary)' }}>{inv.id}</td>
                        <td style={{ padding: '14px 16px', fontWeight: '700', color: 'var(--charcoal-title)' }}>{inv.patient}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--charcoal-body)' }}>{inv.service}</td>
                        <td style={{ padding: '14px 16px', fontWeight: '800', color: 'var(--charcoal-title)' }}>{inv.amount}</td>
                        <td style={{ padding: '14px 16px', color: 'var(--charcoal-muted)' }}>{inv.method}</td>
                        <td style={{ padding: '14px 16px' }}>
                          <span style={{
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            background: inv.status === 'Paid' ? '#ddf4ef' : inv.status === 'Partially Paid' ? '#fef3c7' : '#fee2e2',
                            color: inv.status === 'Paid' ? '#00757d' : inv.status === 'Partially Paid' ? '#92400e' : '#b91c1c'
                          }}>
                            {inv.status}
                          </span>
                        </td>
                        <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                          <button
                            onClick={() => alert(`Demo Action: Printing PDF for ${inv.id}`)}
                            style={{ padding: '5px 10px', borderRadius: '6px', border: '1px solid var(--line)', background: '#ffffff', color: 'var(--charcoal-body)', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer' }}
                          >
                            PDF Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* ===============================================================
               DEDICATED 55-FEATURE INTERACTIVE WORKSPACE
               =============================================================== */
            <div style={{ maxWidth: '960px', margin: '0 auto' }}>
              <div style={{ marginBottom: '16px' }}>
                <button
                  onClick={() => navigateTo('/dashboard')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: 'var(--charcoal-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}
                >
                  <ArrowLeft size={14} /> Back to Dashboard
                </button>
              </div>

              {/* Feature Header Card */}
              <div style={{
                background: '#ffffff',
                border: '1px solid var(--line, #e9e9e5)',
                borderRadius: '18px',
                padding: '28px',
                boxShadow: '0 4px 20px rgba(0, 136, 145, 0.05)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', background: 'rgba(0, 136, 145, 0.1)', color: 'var(--teal-primary)', padding: '3px 8px', borderRadius: '4px' }}>
                    {activeFeature?.area}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '800', background: '#ddf4ef', color: '#00757d', padding: '3px 8px', borderRadius: '4px' }}>
                    DocMatrix Launch Feature
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--charcoal-muted)' }}>
                    • Ref: {activeFeature?.source}
                  </span>
                </div>

                <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '8px' }}>
                  {activeFeature?.name}
                </h1>
                <p style={{ fontSize: '14px', color: 'var(--charcoal-body, #475554)', lineHeight: '1.6', marginBottom: '20px' }}>
                  {activeFeature?.desc}
                </p>

                {/* Simulated Feature Interface Preview */}
                <div style={{
                  padding: '24px',
                  borderRadius: '14px',
                  background: 'var(--paper, #fbfbf9)',
                  border: '1.5px dashed var(--line, #e9e9e5)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--teal-primary)' }}>
                      CLINICAL WORKSPACE PREVIEW
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--charcoal-muted)' }}>
                      Route: {activeFeature?.route}
                    </div>
                  </div>

                  <div style={{
                    padding: '24px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    border: '1px solid var(--line, #e9e9e5)',
                    textAlign: 'center'
                  }}>
                    <Sparkles size={24} style={{ color: 'var(--teal-primary)', margin: '0 auto 10px auto' }} />
                    <h4 style={{ fontSize: '15px', fontWeight: '750', color: 'var(--charcoal-title)', marginBottom: '6px' }}>
                      {activeFeature?.name} Connected
                    </h4>
                    <p style={{ fontSize: '12.5px', color: 'var(--charcoal-muted)', maxWidth: '480px', margin: '0 auto 16px auto' }}>
                      Ready for practice workflows. All mock clinical records, doctor signatures, and automated event triggers are active.
                    </p>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => alert(`Simulated Action: Triggered test operation for ${activeFeature?.name}`)}
                        className="btn-hero-teal"
                        style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '999px', cursor: 'pointer' }}
                      >
                        Execute Demo Action
                      </button>
                      <button
                        onClick={() => navigateTo('/dashboard')}
                        className="btn-hero-outline"
                        style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '999px', cursor: 'pointer' }}
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Responsive Style Overrides */}
      <style>{`
        @media (max-width: 820px) {
          .staff-sidebar {
            position: fixed !important;
            left: -280px !important;
            top: 0 !important;
            height: 100vh !important;
            z-index: 150 !important;
            transition: left 0.25s ease !important;
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15) !important;
          }
          .staff-sidebar.is-open {
            left: 0 !important;
          }
          .mobile-nav-toggle-btn {
            display: inline-flex !important;
          }
          .desktop-breadcrumb {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
