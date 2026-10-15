import React from 'react'
import { AlertCircle } from 'lucide-react'

export function DemoBanner() {
  return (
    <div
      style={{
        background: '#fef3c7',
        borderBottom: '1px solid #fde68a',
        padding: '7px 16px',
        fontSize: '12px',
        fontWeight: '700',
        color: '#92400e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        textAlign: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
      data-testid="demo-banner"
      role="banner"
    >
      <AlertCircle size={15} style={{ color: '#d97706', flexShrink: 0 }} />
      <span>Demo only. Nothing is saved or sent. Do not enter real patient data.</span>
    </div>
  )
}

export default DemoBanner
