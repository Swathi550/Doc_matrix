import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { FEATURE_REGISTRY } from '@/features/registry'
import { LAUNCH_PAGE_MAP } from '@/features/pageMap'
import AreaPage from '@/pages/areas/AreaPage'
import NotBuiltYetPage from '@/pages/common/NotBuiltYetPage'
import NotFoundPage from '@/pages/error/NotFoundPage'
import ComingSoonPage from '@/pages/roadmap/ComingSoonPage'
import StaffPortal from '@/StaffPortal'

// Lazy-load all launch feature components
const lazyComponents = {}
for (const page of LAUNCH_PAGE_MAP) {
  lazyComponents[page.id] = lazy(page.importFn)
}

const PageFallback = () => (
  <div style={{ maxWidth: '800px', margin: '40px auto', padding: '24px' }} role="status">
    <div style={{ height: '24px', width: '120px', background: '#e9e9e5', borderRadius: '4px', marginBottom: '16px' }} />
    <div style={{ height: '36px', width: '280px', background: '#e9e9e5', borderRadius: '6px', marginBottom: '24px' }} />
    <div style={{ height: '140px', width: '100%', background: '#f4f6f5', borderRadius: '12px' }} />
  </div>
)

export function AppRoutes({
  currentUser,
  onLoginSuccess,
  onLogout,
  renderLandingPage
}) {
  const showRoadmap = import.meta.env.VITE_SHOW_ROADMAP === 'true'

  return (
    <Routes>
      {/* 1. Main Landing Page */}
      <Route path="/" element={renderLandingPage()} />

      {/* 2. Authentication & Solutions Views */}
      <Route path="/login" element={renderLandingPage('login')} />
      <Route path="/signup" element={renderLandingPage('signup')} />
      <Route path="/solutions/:id" element={renderLandingPage('solution')} />

      {/* 3. Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <StaffPortal
            user={currentUser || { id: 'usr-104', name: 'Dr. Arun Kumar', role: 'DOCTOR', clinicName: 'Demo Dental Clinic' }}
            onLogout={onLogout}
          />
        }
      />

      {/* 4. Area Hub Pages */}
      <Route path="/appointments" element={<AreaPage areaKey="appointments" />} />
      <Route path="/patients" element={<AreaPage areaKey="patients" />} />
      <Route path="/clinical" element={<AreaPage areaKey="clinical" />} />
      <Route path="/billing" element={<AreaPage areaKey="billing" />} />
      <Route path="/accounts" element={<AreaPage areaKey="accounts" />} />
      <Route path="/inventory" element={<AreaPage areaKey="inventory" />} />
      <Route path="/whatsapp" element={<AreaPage areaKey="whatsapp" />} />
      <Route path="/website" element={<AreaPage areaKey="website" />} />
      <Route path="/reports" element={<AreaPage areaKey="reports" />} />
      <Route path="/settings" element={<AreaPage areaKey="settings" />} />
      <Route path="/roadmap" element={<AreaPage areaKey="roadmap" />} />

      {/* 5. All 55 Launch Feature Sub-Pages (Lazy-Loaded) */}
      {FEATURE_REGISTRY.filter((f) => f.phase === 'launch').map((feature) => {
        const Component = lazyComponents[feature.id]
        if (!Component) return null

        return (
          <Route
            key={feature.id}
            path={feature.route}
            element={
              <Suspense fallback={<PageFallback />}>
                <Component />
              </Suspense>
            }
          />
        )
      })}

      {/* 6. Coming Soon for Roadmap Items */}
      <Route
        path="/coming-soon/:id"
        element={
          <Suspense fallback={<PageFallback />}>
            <ComingSoonPage />
          </Suspense>
        }
      />

      {/* 7. Shared Not Built Yet for unmatched buttons */}
      <Route path="/not-built-yet" element={<NotBuiltYetPage />} />

      {/* 8. 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
