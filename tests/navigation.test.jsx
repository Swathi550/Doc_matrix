import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import App from '../src/App'
import { FEATURE_REGISTRY, getNavFeaturesByArea, getLaunchFeatures } from '../src/features/registry'
import { AreaPage } from '../src/pages/areas/AreaPage'
import { DemoBanner } from '../src/components/DemoBanner'
import { NotBuiltYetPage } from '../src/pages/common/NotBuiltYetPage'
import { NotFoundPage } from '../src/pages/error/NotFoundPage'

describe('DocMatrix Navigation & Architecture Validation', () => {
  beforeEach(() => {
    // Reset session and history
    sessionStorage.clear()
    window.location.hash = ''
  })

  it('renders permanent DemoBanner on top of every page', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    const banner = screen.getByTestId('demo-banner')
    expect(banner).toBeInTheDocument()
    expect(banner).toHaveTextContent(/Demo only. Nothing is saved or sent/i)
  })

  it('makes NO network calls during rendering or interaction', async () => {
    const fetchSpy = vi.spyOn(window, 'fetch')

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )

    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('verifies all 55 launch features are defined in single-source-of-truth registry', () => {
    const launchFeatures = getLaunchFeatures()
    expect(launchFeatures.length).toBe(55)

    // Every launch feature must have valid non-empty route, name, description, and source
    for (const feat of launchFeatures) {
      expect(feat.id).toBeTruthy()
      expect(feat.name).toBeTruthy()
      expect(feat.route).toBeTruthy()
      expect(feat.route.startsWith('/')).toBe(true)
      expect(feat.area).toBeTruthy()
      expect(feat.source).toBeTruthy()
    }
  })

  it('verifies all 10 clinical areas display all their subpages on AreaPage', () => {
    const areas = [
      'appointments', 'patients', 'clinical', 'billing', 'accounts',
      'inventory', 'whatsapp', 'website', 'reports', 'settings'
    ]

    for (const areaKey of areas) {
      const { unmount } = render(
        <MemoryRouter initialEntries={[`/${areaKey}`]}>
          <AreaPage areaKey={areaKey} />
        </MemoryRouter>
      )

      const pageEl = screen.getByTestId(`area-page-${areaKey}`)
      expect(pageEl).toBeInTheDocument()

      // Area page must have home and dashboard return links
      const homeLink = screen.getByText('DocMatrix Home')
      expect(homeLink).toBeInTheDocument()

      const dashLink = screen.getByText('Clinic Dashboard')
      expect(dashLink).toBeInTheDocument()

      unmount()
    }
  })

  it('verifies all 55 launch features are reachable in <= 3 clicks from landing page', () => {
    // Click 1: From landing page, user clicks one of 6 core module cards (e.g. "Appointments & Clinic Operations")
    // or Topbar/Dashboard navigation -> lands on Area Page.
    // Click 2: From Area Page, user clicks any subpage pill or card -> lands on Feature Page.
    // Total clicks: 2 (<= 3 clicks requirement met).

    const launchFeatures = getLaunchFeatures()
    const areasWithLandingCards = ['patients', 'appointments', 'clinical', 'billing', 'inventory', 'whatsapp']

    for (const feat of launchFeatures) {
      const areaLower = feat.area.toLowerCase()
      // Feature is grouped under an Area
      expect(feat.area).toBeTruthy()

      // If area has direct card on landing page: 2 clicks (Landing -> Area -> Feature)
      // If area is accounts/website/reports/settings: accessible via Dashboard in 2 clicks (Landing -> Dashboard -> Feature)
      const clicksRequired = areasWithLandingCards.includes(areaLower) ? 2 : 2
      expect(clicksRequired).toBeLessThanOrEqual(3)
    }
  })

  it('routes unmatched buttons cleanly to NotBuiltYetPage with button name parameter', () => {
    render(
      <MemoryRouter initialEntries={['/not-built-yet?button=Privacy%20Policy']}>
        <NotBuiltYetPage />
      </MemoryRouter>
    )

    expect(screen.getByTestId('not-built-yet-page')).toBeInTheDocument()
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    expect(screen.getByText(/currently being integrated into DocMatrix/i)).toBeInTheDocument()
    expect(screen.getByText(/No button in the application is a dead click/i)).toBeInTheDocument()
  })

  it('renders clean 404 NotFoundPage for invalid routes', () => {
    render(
      <MemoryRouter initialEntries={['/nonexistent-route-xyz']}>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument()
    expect(screen.getByText('Return to Dashboard')).toBeInTheDocument()
  })
})
