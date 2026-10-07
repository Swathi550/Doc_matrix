import React, { useEffect } from 'react'
import {
  UserRound, Stethoscope, Building2, FlaskConical, Pill, MessagesSquare,
  X, Check, ArrowRight
} from 'lucide-react'

export const NODE_DATA = {
  Patient: {
    name: 'Patient Management',
    shortName: 'Patient',
    icon: UserRound,
    color: '#1D6FE8',
    summary: 'One continuous digital record for every patient from initial appointment to follow-up.',
    points: [
      'Self-service digital registration & check-in',
      'Lifetime digital health records & prescriptions',
      'Live queue updates and wait-time tracking',
      'Direct mobile access to lab reports'
    ]
  },
  Doctor: {
    name: 'Doctor Management',
    shortName: 'Doctor',
    icon: Stethoscope,
    color: '#0FA3A3',
    summary: 'Organized clinical workspace built around each doctor’s daily consultations and workflow.',
    points: [
      'Daily outpatient schedule & smart queue triage',
      'Fast electronic prescriptions with dosage alerts',
      'One-click diagnostic test ordering',
      'Complete patient medical history timeline'
    ]
  },
  Management: {
    name: 'Hospital Management',
    shortName: 'Management',
    icon: Building2,
    color: '#4C9AFF',
    summary: 'Centralized operations, billing, queues, and staff access from a single unified view.',
    points: [
      'Live clinic & department capacity dashboard',
      'Unified billing, invoicing, and insurance tracking',
      'Smart queue balancing across departments',
      'Role-based access control and audit trails'
    ]
  },
  Lab: {
    name: 'Diagnostics & Laboratory',
    shortName: 'Lab',
    icon: FlaskConical,
    color: '#2E9E6B',
    summary: 'Automated sample tracking and verified digital test reports flowing straight back to doctors.',
    points: [
      'Barcode-based sample collection & tracking',
      'Direct analyzer machine-to-system interfacing',
      'Pathologist review and digital report sign-off',
      'Instant critical value alerts to care teams'
    ]
  },
  Pharmacy: {
    name: 'Pharmacy Management',
    shortName: 'Pharmacy',
    icon: Pill,
    color: '#1D6FE8',
    summary: 'Digital prescriptions reach the dispensary immediately, keeping medicine stock in step.',
    points: [
      'Queue-free digital prescription dispensing',
      'Barcode verification to prevent medication errors',
      'Real-time batch & expiry (FEFO) stock alerts',
      'Automated re-order triggers for essential drugs'
    ]
  },
  Omnichannel: {
    name: 'Omnichannel Communication',
    shortName: 'Omnichannel',
    icon: MessagesSquare,
    color: '#0FA3A3',
    summary: 'Automated notifications and reminders reaching patients on the channels they actually use.',
    points: [
      'Official WhatsApp Business integration',
      'Automated 2-way appointment reminders',
      'Instant lab report and prescription delivery',
      'Post-visit follow-up and feedback collection'
    ]
  }
}

const nodeOrder = ['Patient', 'Doctor', 'Management', 'Lab', 'Pharmacy', 'Omnichannel']

export default function NodeModal({ activeNode, onClose, onSelectNode }) {
  useEffect(() => {
    if (!activeNode) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeNode, onClose])

  if (!activeNode) return null

  const data = NODE_DATA[activeNode] || NODE_DATA.Patient
  const Icon = data.icon

  return (
    <div className="simple-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="simple-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ '--node-color': data.color }}
      >
        {/* Top bar with quick tabs and close button */}
        <div className="simple-modal-top">
          <div className="simple-modal-tabs" role="tablist">
            {nodeOrder.map((key) => {
              const item = NODE_DATA[key]
              const isActive = activeNode === key
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  className={`simple-tab-pill ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectNode(key)}
                >
                  {item.shortName}
                </button>
              )
            })}
          </div>
          <button className="simple-close-btn" onClick={onClose} aria-label="Close box">
            <X size={18} />
          </button>
        </div>

        {/* Header with Icon and Title */}
        <div className="simple-modal-header">
          <div className="simple-icon-box" style={{ background: data.color }}>
            <Icon size={22} color="#fff" />
          </div>
          <div>
            <h3 className="simple-modal-title">{data.name}</h3>
            <span className="simple-modal-tag">Doc Matrix Ecosystem</span>
          </div>
        </div>

        {/* Short Summary */}
        <p className="simple-modal-desc">{data.summary}</p>

        {/* Clean concise bullet points */}
        <div className="simple-points-list">
          {data.points.map((pt, i) => (
            <div key={i} className="simple-point-item">
              <span className="simple-check-icon" style={{ color: data.color }}>
                <Check size={15} strokeWidth={2.8} />
              </span>
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Simple Footer Actions */}
        <div className="simple-modal-footer">
          <a
            href="#solutions"
            className="simple-link-btn"
            onClick={() => onClose()}
          >
            <span>Learn more</span>
            <ArrowRight size={14} />
          </a>
          <button className="btn sm simple-done-btn" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
