import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { FEATURE_REGISTRY } from '@/features/registry'
import { LAUNCH_PAGE_MAP } from '@/features/pageMap'
import AreaPage from '@/pages/areas/AreaPage'
import NotBuiltYetPage from '@/pages/common/NotBuiltYetPage'
import NotFoundPage from '@/pages/error/NotFoundPage'
import ForbiddenPage from '@/pages/error/ForbiddenPage'
import TermsPage from '@/pages/legal/TermsPage'
import PrivacyPage from '@/pages/legal/PrivacyPage'
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

// Protected Route Guard (Problem P2 & Decision D4)
function ProtectedRoute({ currentUser, allowedRoles, children }) {
  const location = useLocation()

  if (!currentUser) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/login?next=${next}`} replace />
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/forbidden" replace />
  }

  return children
}

export function AppRoutes({
  currentUser,
  onLoginSuccess,
  onLogout,
  renderLandingPage
}) {
  return (
    <Routes>
      {/* 1. Public Landing Page */}
      <Route path="/" element={renderLandingPage()} />

      {/* 2. Public Authentication Views (Logged-in users redirect to /dashboard) */}
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/dashboard" replace /> : renderLandingPage('login')}
      />
      <Route
        path="/signup"
        element={currentUser ? <Navigate to="/dashboard" replace /> : renderLandingPage('signup')}
      />
      <Route path="/solutions/:id" element={renderLandingPage('solution')} />

      {/* 3. Public Legal & Error Pages */}
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/forbidden" element={<ForbiddenPage />} />

      {/* 4. Protected Clinic Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <StaffPortal user={currentUser} onLogout={onLogout} />
          </ProtectedRoute>
        }
      />

      {/* 5. Protected Area Hub Pages (Decision D4: Accounts and Settings role-limited) */}
      <Route
        path="/appointments"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="appointments" /></ProtectedRoute>}
      />
      <Route
        path="/patients"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="patients" /></ProtectedRoute>}
      />
      <Route
        path="/clinical"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="clinical" /></ProtectedRoute>}
      />
      <Route
        path="/billing"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="billing" /></ProtectedRoute>}
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute currentUser={currentUser} allowedRoles={['ORGANIZATION_ADMIN', 'ACCOUNTANT']}>
            <AreaPage areaKey="accounts" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="inventory" /></ProtectedRoute>}
      />
      <Route
        path="/whatsapp"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="whatsapp" /></ProtectedRoute>}
      />
      <Route
        path="/website"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="website" /></ProtectedRoute>}
      />
      <Route
        path="/reports"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="reports" /></ProtectedRoute>}
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute currentUser={currentUser} allowedRoles={['ORGANIZATION_ADMIN', 'BRANCH_ADMIN']}>
            <AreaPage areaKey="settings" />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={<ProtectedRoute currentUser={currentUser}><AreaPage areaKey="roadmap" /></ProtectedRoute>}
      />

      {/* 6. Protected 55 Launch Feature Sub-Pages */}
      {FEATURE_REGISTRY.filter((f) => f.phase === 'launch').map((feature) => {
        const Component = lazyComponents[feature.id]
        if (!Component) return null

        return (
          <Route
            key={feature.id}
            path={feature.route}
            element={
              <ProtectedRoute currentUser={currentUser} allowedRoles={feature.roles}>
                <Suspense fallback={<PageFallback />}>
                  <Component />
                </Suspense>
              </ProtectedRoute>
            }
          />
        )
      })}

      {/* 7. Protected Coming Soon for Roadmap Items */}
      <Route
        path="/coming-soon/:id"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <Suspense fallback={<PageFallback />}>
              <ComingSoonPage />
            </Suspense>
          </ProtectedRoute>
        }
      />

      {/* 8. Shared Not Built Yet for unmatched marketing buttons */}
      <Route path="/not-built-yet" element={<NotBuiltYetPage />} />

      {/* 9. 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
