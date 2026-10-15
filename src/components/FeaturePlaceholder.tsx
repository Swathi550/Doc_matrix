import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FEATURE_REGISTRY, getFeatureById } from '@/features/registry'
import { Sparkles, Compass, AlertCircle, ArrowLeft, ArrowRight, Home, CheckCircle2 } from 'lucide-react'

interface FeaturePlaceholderProps {
  id: string
}

export const FeaturePlaceholder: React.FC<FeaturePlaceholderProps> = ({ id }) => {
  const params = useParams()
  const feature = getFeatureById(id)
  const [simulatedAction, setSimulatedAction] = useState(false)

  if (!feature) {
    return (
      <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: '800', marginBottom: '6px' }}>
            <AlertCircle size={20} />
            <span>Feature Not Found</span>
          </div>
          <p style={{ fontSize: '13px', color: '#7f1d1d' }}>
            No registry entry found for feature identifier: {id}
          </p>
        </div>
      </div>
    )
  }

  const isUnknownRecord = params?.id && (params.id.startsWith('unknown') || params.id === 'invalid' || params.id === 'notfound')

  if (isUnknownRecord) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--paper, #fbfbf9)', display: 'flex', flexDirection: 'column' }} data-testid={`record-not-found-${params.id}`}>
        <header style={{
          background: '#ffffff',
          borderBottom: '1px solid var(--line, #e9e9e5)',
          padding: '12px clamp(16px, 3vw, 32px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Link
            to={`/${feature.area.toLowerCase()}`}
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
            <ArrowLeft size={13} style={{ color: 'var(--teal-primary, #008891)' }} />
            <span>Back to {feature.area} Hub</span>
          </Link>
          <Link
            to="/dashboard"
            style={{
              fontSize: '12px',
              fontWeight: '700',
              color: 'var(--charcoal-dark, #111a1a)',
              textDecoration: 'none'
            }}
          >
            Dashboard
          </Link>
        </header>

        <main style={{ flex: 1, padding: '40px 24px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
          <div style={{
            background: '#ffffff',
            border: '1px solid #fee2e2',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(220, 38, 38, 0.05)'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#fef2f2',
              color: '#dc2626',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px'
            }}>
              <AlertCircle size={24} />
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '8px' }}>
              Record Not Found
            </h1>
            <p style={{ fontSize: '13.5px', color: 'var(--charcoal-body, #475554)', lineHeight: '1.5', marginBottom: '20px' }}>
              The record identifier <code style={{ background: '#f4f6f5', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace' }}>{params.id}</code> does not exist in the clinic demo database.
            </p>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '24px',
              fontSize: '12.5px',
              textAlign: 'left'
            }}>
              <div style={{ fontWeight: '700', color: '#334155', marginBottom: '4px' }}>Demo ID Hints:</div>
              <ul style={{ margin: 0, paddingLeft: '18px', color: '#64748b' }}>
                <li>Patients: <Link to="/patients/pt-1001" style={{ color: 'var(--teal-primary, #008891)', fontWeight: '700' }}>pt-1001</Link></li>
                <li>Appointments: <Link to="/appointments/apt-101" style={{ color: 'var(--teal-primary, #008891)', fontWeight: '700' }}>apt-101</Link></li>
              </ul>
            </div>
            <Link
              to={`/${feature.area.toLowerCase()}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 18px',
                borderRadius: '999px',
                background: 'var(--teal-primary, #008891)',
                color: '#ffffff',
                fontSize: '12.5px',
                fontWeight: '700',
                textDecoration: 'none'
              }}
            >
              Return to {feature.area} Hub
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const paramEntries = Object.entries(params || {}).filter(([_, v]) => v !== undefined)
  const siblingFeatures = FEATURE_REGISTRY.filter(
    (f) => f.area.toLowerCase() === feature.area.toLowerCase() && f.phase === 'launch'
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper, #fbfbf9)', display: 'flex', flexDirection: 'column' }} data-testid={`feature-page-${id}`}>
      {/* Topbar Navigation Header */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
          <Link
            to={`/${feature.area.toLowerCase()}`}
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
            <ArrowLeft size={13} style={{ color: 'var(--teal-primary, #008891)' }} />
            <span>{feature.area} Area</span>
          </Link>
          <span style={{ color: 'var(--line, #e9e9e5)' }}>/</span>
          <span style={{ fontWeight: '800', color: 'var(--charcoal-title, #1a2626)' }}>
            {feature.name}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '999px',
              background: '#f4f6f5',
              color: 'var(--charcoal-dark, #111a1a)',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            <Home size={13} style={{ color: 'var(--teal-primary, #008891)' }} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/"
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
            <span>DocMatrix Home</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main style={{ flex: 1, padding: '32px clamp(16px, 4vw, 40px)', maxWidth: '960px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Sibling Tabs Navigation Bar */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '12px 16px',
          border: '1px solid var(--line, #e9e9e5)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--charcoal-muted, #6e7e7d)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {feature.area} Pages:
          </span>
          {siblingFeatures.map((sib) => {
            const isCurrent = sib.id === feature.id
            const targetUrl = sib.route.replace(':id', sib.area === 'Patients' ? 'pt-1001' : 'apt-101')
            return (
              <Link
                key={sib.id}
                to={targetUrl}
                style={{
                  fontSize: '11.5px',
                  fontWeight: isCurrent ? '800' : '650',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  background: isCurrent ? 'var(--teal-primary, #008891)' : '#f4f6f5',
                  color: isCurrent ? '#ffffff' : 'var(--charcoal-dark, #111a1a)',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {sib.name}
              </Link>
            )
          })}
        </div>

        {/* Feature Header Card */}
        <div style={{
          background: '#ffffff',
          border: '1px solid var(--line, #e9e9e5)',
          borderRadius: '16px',
          padding: '28px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: '800', background: 'rgba(0, 136, 145, 0.1)', color: 'var(--teal-primary, #008891)', padding: '3px 8px', borderRadius: '4px' }}>
              {feature.area}
            </span>
            <span style={{ fontSize: '11px', fontWeight: '800', background: '#fef3c7', color: '#92400e', padding: '3px 8px', borderRadius: '4px' }}>
              Planned for: Launch
            </span>
            <span style={{ fontSize: '11px', fontWeight: '700', background: '#f4f6f5', color: '#6e7e7d', padding: '3px 8px', borderRadius: '4px' }}>
              Status: not built yet
            </span>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--charcoal-title, #1a2626)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            {feature.name}
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--charcoal-body, #475554)', lineHeight: '1.6', marginBottom: '20px' }}>
            {feature.description}
          </p>

          {/* Specification and Route Card */}
          <div style={{
            padding: '20px',
            borderRadius: '12px',
            background: 'var(--paper, #fbfbf9)',
            border: '1.5px dashed var(--line, #e9e9e5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: '750', color: 'var(--teal-primary, #008891)' }}>
                <Compass size={15} />
                <span>Feature Plan Ref: {feature.source}</span>
              </div>
              <div style={{ fontSize: '11.5px', color: 'var(--charcoal-muted, #6e7e7d)', fontFamily: 'monospace' }}>
                ID: {feature.id} • Route: {feature.route}
              </div>
            </div>

            {paramEntries.length > 0 && (
              <div style={{ padding: '12px', background: '#ffffff', border: '1px solid var(--line, #e9e9e5)', borderRadius: '8px', marginBottom: '12px' }} data-testid="route-parameters">
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--charcoal-muted, #6e7e7d)', marginBottom: '6px', textTransform: 'uppercase' }}>
                  Route Parameters:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                  {paramEntries.map(([k, v]) => (
                    <div key={k} style={{ fontFamily: 'monospace', fontSize: '12px', background: '#f4f6f5', padding: '6px 10px', borderRadius: '6px' }}>
                      <span style={{ color: 'var(--charcoal-muted, #6e7e7d)' }}>{k}:</span> {v}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px', background: '#ffffff', borderRadius: '8px', border: '1px solid var(--line, #e9e9e5)', fontSize: '12.5px', color: 'var(--charcoal-muted, #6e7e7d)', marginBottom: '16px' }}>
              <Sparkles size={16} style={{ color: 'var(--teal-primary, #008891)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontWeight: '750', color: 'var(--charcoal-title, #1a2626)', marginBottom: '2px' }}>
                  Clinical Workflow Architecture
                </div>
                <div>
                  This module is specified for DocMatrix Launch Phase. Clinical actions and data contracts are mapped cleanly under the single-source-of-truth registry.
                </div>
              </div>
            </div>

            {/* Interactive Demo Action Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setSimulatedAction(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  background: 'var(--teal-primary, #008891)',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '750',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={13} />
                <span>Simulate Demo Action</span>
              </button>
              {simulatedAction && (
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#15803d', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> Action verified (mock environment)
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default FeaturePlaceholder
