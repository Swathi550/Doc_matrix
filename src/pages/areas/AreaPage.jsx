import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FEATURE_REGISTRY, getRoadmapFeatures } from '@/features/registry'
import { DemoBanner } from '@/components/DemoBanner'
import { findDemoUserById } from '@/mocks/auth'
import {
  Calendar, Users, Stethoscope, Receipt, BookOpen, Package, MessageSquare,
  Globe, BarChart3, Settings, Milestone, ArrowRight, ArrowLeft, Home,
  Lock, CheckCircle2, Sparkles, Compass
} from 'lucide-react'

const AREA_META = {
  appointments: {
    title: 'Appointments & Clinic Operations',
    icon: Calendar,
    desc: 'Smart scheduling, live queue tracking, doctor rosters, and waiting-room management.'
  },
  patients: {
    title: 'Patients & Dental Records',
    icon: Users,
    desc: 'Permanent patient profiles, medical alerts, visit timeline, and interactive tooth charts.'
  },
  clinical: {
    title: 'Clinical Workflows & Prescriptions',
    icon: Stethoscope,
    desc: 'Letterhead digital prescriptions, clinical notes, master lists, and diagnostic orders.'
  },
  billing: {
    title: 'Billing, Invoices & Daily Collection',
    icon: Receipt,
    desc: 'Itemised treatment invoices, part payments, daily collections, and GST price lists.'
  },
  accounts: {
    title: 'Accounts, Ledgers & Tally Export',
    icon: BookOpen,
    desc: 'Double-entry accounting, day book, profit and loss, balance sheets, and Tally export.'
  },
  inventory: {
    title: 'Inventory & Dental Lab Supplies',
    icon: Package,
    desc: 'Real-time stock quantities, reorder alerts, expiry tracking, and dental lab orders.'
  },
  whatsapp: {
    title: 'WhatsApp Automation & Reminders',
    icon: MessageSquare,
    desc: 'Automated 24h & 2h appointment alerts, prescription delivery, and recall campaigns.'
  },
  website: {
    title: 'Clinic Website & Online Booking',
    icon: Globe,
    desc: 'Online patient booking on real slots, reviews showcase, and booking approval inbox.'
  },
  reports: {
    title: 'Reports & Clinical Practice Analytics',
    icon: BarChart3,
    desc: 'Revenue insights, doctor performance metrics, dues ageing, and booking conversion tracking.'
  },
  settings: {
    title: 'Clinic Settings & Administration',
    icon: Settings,
    desc: 'Clinic profile configuration, staff permissions, activity audit logs, and data exports.'
  },
  roadmap: {
    title: 'Product Roadmap (Version 2 & Later)',
    icon: Milestone,
    desc: 'Upcoming advanced features planned for Version 2 and future expansion releases.'
  }
}

export function AreaPage({ areaKey }) {
  const meta = AREA_META[areaKey] || {
    title: `${areaKey.charAt(0).toUpperCase() + areaKey.slice(1)} Area`,
    icon: Compass,
    desc: 'Operational management area for DocMatrix clinic features.'
  }

  const Icon = meta.icon
  const isRoadmap = areaKey === 'roadmap'

  const sessionUserId = typeof window !== 'undefined' ? sessionStorage.getItem('docmatrix-demo-session') : null
  const currentUser = sessionUserId ? findDemoUserById(sessionUserId) : null
  const userRole = currentUser?.role || 'ORGANIZATION_ADMIN'

  // Features belonging to this area
  const features = isRoadmap
    ? getRoadmapFeatures()
    : FEATURE_REGISTRY.filter((f) => f.area.toLowerCase() === areaKey.toLowerCase() && f.phase === 'launch')

  // Accounts features for billing cross-navigation (Problem P5)
  const accountsFeatures = areaKey === 'billing'
    ? FEATURE_REGISTRY.filter((f) => f.area.toLowerCase() === 'accounts' && f.phase === 'launch')
    : []

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper, #fbfbf9)', display: 'flex', flexDirection: 'column' }} data-testid={`area-page-${areaKey}`}>
      {/* Top Header */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid var(--line, #e9e9e5)',
        padding: '12px clamp(16px, 3vw, 32px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid var(--line, #e9e9e5)',
              background: '#ffffff',
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--charcoal-dark, #111a1a)',
              textDecoration: 'none'
            }}
          >
            <Home size={13} style={{ color: 'var(--teal-primary, #008891)' }} />
            <span>Clinic Dashboard</span>
          </Link>
          <span style={{ color: 'var(--line, #e9e9e5)' }}>|</span>
          <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)' }}>
            {meta.title}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(0, 136, 145, 0.08)',
              color: 'var(--teal-primary, #008891)',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            <span>DocMatrix Home</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '32px clamp(16px, 4vw, 40px)', maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* Area Header Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid var(--line, #e9e9e5)',
          padding: '28px clamp(20px, 3vw, 36px)',
          marginBottom: '28px',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'rgba(0, 136, 145, 0.1)',
              color: 'var(--teal-primary, #008891)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--charcoal-muted, #6e7e7d)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Operational Area
              </div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', margin: 0 }}>
                {meta.title}
              </h1>
            </div>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--charcoal-body, #475554)', lineHeight: '1.6', maxWidth: '720px', marginTop: '6px' }}>
            {meta.desc}
          </p>

          {/* Sub-pages Pills Quick Bar */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--line, #e9e9e5)' }}>
            <span style={{ fontSize: '11.5px', fontWeight: '800', color: 'var(--charcoal-muted, #6e7e7d)', alignSelf: 'center', marginRight: '6px' }}>
              Sub-Pages:
            </span>
            {features.map((feat) => {
              const targetUrl = isRoadmap
                ? `/coming-soon/${feat.id}`
                : feat.route.replace(':id', feat.area === 'Patients' ? 'pt-1001' : 'apt-101')
              return (
                <Link
                  key={feat.id}
                  to={targetUrl}
                  style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '5px 12px',
                    borderRadius: '999px',
                    background: '#f4f6f5',
                    color: 'var(--charcoal-dark, #111a1a)',
                    textDecoration: 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {feat.name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Sub-pages Cards Grid */}
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)' }}>
            All Pages in this Area ({features.length})
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--charcoal-muted, #6e7e7d)' }}>
            Single source of truth registry
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px'
        }}>
          {features.map((feat) => {
            const targetUrl = isRoadmap
              ? `/coming-soon/${feat.id}`
              : feat.route.replace(':id', feat.area === 'Patients' ? 'pt-1001' : 'apt-101')
            return (
              <Link
                key={feat.id}
                to={targetUrl}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--line, #e9e9e5)',
                  borderRadius: '14px',
                  padding: '20px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{
                      fontSize: '10.5px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: feat.phase === 'launch' ? 'rgba(0, 136, 145, 0.08)' : '#e0e7ff',
                      color: feat.phase === 'launch' ? 'var(--teal-primary, #008891)' : '#3730a3'
                    }}>
                      {feat.phase === 'launch' ? 'Launch' : feat.phase.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--charcoal-muted, #6e7e7d)', fontFamily: 'monospace' }}>
                      {feat.source}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '6px' }}>
                    {feat.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--charcoal-body, #475554)', lineHeight: '1.5', marginBottom: '16px' }}>
                    {feat.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--line, #e9e9e5)',
                  fontSize: '11.5px',
                  color: 'var(--teal-primary, #008891)',
                  fontWeight: '700'
                }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--charcoal-muted, #6e7e7d)' }}>
                    {targetUrl}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Open Page <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Cross-linking for Accounts from Billing Area Hub (Problem P5) */}
        {accountsFeatures.length > 0 && (
          <div style={{ marginTop: '36px' }}>
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)' }}>
                  Accounts & Financial Ledgers ({accountsFeatures.length})
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--charcoal-muted, #6e7e7d)', margin: '2px 0 0 0' }}>
                  Double-entry accounting, day book, GST reports, and Tally export
                </p>
              </div>
              <Link
                to="/accounts"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'rgba(0, 136, 145, 0.08)',
                  color: 'var(--teal-primary, #008891)',
                  fontSize: '12px',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                <span>Accounts Hub</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {accountsFeatures.map((feat) => {
                const isRestricted = !['ORGANIZATION_ADMIN', 'ACCOUNTANT'].includes(userRole)
                return (
                  <Link
                    key={feat.id}
                    to={feat.route}
                    style={{
                      background: '#ffffff',
                      border: '1px solid var(--line, #e9e9e5)',
                      borderRadius: '14px',
                      padding: '20px',
                      textDecoration: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.02)',
                      opacity: isRestricted ? 0.8 : 1
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{
                          fontSize: '10.5px',
                          fontWeight: '800',
                          padding: '3px 8px',
                          borderRadius: '4px',
                          background: isRestricted ? '#fee2e2' : 'rgba(0, 136, 145, 0.08)',
                          color: isRestricted ? '#dc2626' : 'var(--teal-primary, #008891)'
                        }}>
                          {isRestricted ? 'Restricted (Admin & Accountant only)' : 'Launch'}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--charcoal-muted, #6e7e7d)', fontFamily: 'monospace' }}>
                          {feat.source}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '6px' }}>
                        {feat.name}
                      </h3>
                      <p style={{ fontSize: '12.5px', color: 'var(--charcoal-body, #475554)', lineHeight: '1.5', marginBottom: '16px' }}>
                        {feat.description}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--line, #e9e9e5)',
                      fontSize: '11.5px',
                      color: 'var(--teal-primary, #008891)',
                      fontWeight: '700'
                    }}>
                      <span style={{ fontFamily: 'monospace', color: 'var(--charcoal-muted, #6e7e7d)' }}>
                        {feat.route}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        Open Page <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AreaPage
