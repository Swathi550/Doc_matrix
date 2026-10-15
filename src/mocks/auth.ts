export type StaffRole =
  | 'ORGANIZATION_ADMIN'
  | 'BRANCH_ADMIN'
  | 'RECEPTIONIST'
  | 'DOCTOR'
  | 'NURSE'
  | 'LAB_TECHNICIAN'
  | 'PHARMACIST'
  | 'ACCOUNTANT'

export interface DemoUser {
  id: string
  name: string
  role: StaffRole
  phone: string
  clinicName: string
  clinicId: string
}

export const MOCK_CLINIC_NAME = 'Demo Dental Clinic'
export const MOCK_CLINIC_ID = 'clinic-demo-001'
export const MOCK_VALID_OTP = '123456'

export const DEMO_USERS: Record<StaffRole, DemoUser> = {
  ORGANIZATION_ADMIN: {
    id: 'usr-101',
    name: 'Dr. Arun Kumar (Owner)',
    role: 'ORGANIZATION_ADMIN',
    phone: '+910000000101',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
  BRANCH_ADMIN: {
    id: 'usr-102',
    name: 'Priya Menon (Branch Mgr)',
    role: 'BRANCH_ADMIN',
    phone: '+910000000102',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
  RECEPTIONIST: {
    id: 'usr-103',
    name: 'Ananya S (Front Desk)',
    role: 'RECEPTIONIST',
    phone: '+910000000103',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
  DOCTOR: {
    id: 'usr-104',
    name: 'Dr. Rajesh Nair (Doctor)',
    role: 'DOCTOR',
    phone: '+910000000104',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
  NURSE: {
    id: 'usr-105',
    name: 'Suma Joseph (Nurse)',
    role: 'NURSE',
    phone: '+910000000105',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
  LAB_TECHNICIAN: {
    id: 'usr-106',
    name: 'Rahul V (Lab Tech)',
    role: 'LAB_TECHNICIAN',
    phone: '+910000000106',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
  PHARMACIST: {
    id: 'usr-107',
    name: 'Deepa K (Pharmacist)',
    role: 'PHARMACIST',
    phone: '+910000000107',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
  ACCOUNTANT: {
    id: 'usr-108',
    name: 'Manoj Pillai (Accountant)',
    role: 'ACCOUNTANT',
    phone: '+910000000108',
    clinicName: MOCK_CLINIC_NAME,
    clinicId: MOCK_CLINIC_ID,
  },
}

export function findDemoUserByPhone(phone: string): DemoUser | undefined {
  const clean = phone.replace(/\D/g, '')
  return Object.values(DEMO_USERS).find((u) => u.phone.replace(/\D/g, '') === clean)
}

export function findDemoUserById(id: string): DemoUser | undefined {
  if (id === 'demo-org-admin') return DEMO_USERS.ORGANIZATION_ADMIN
  if (id === 'demo-doctor') return DEMO_USERS.DOCTOR
  if (id === 'demo-accountant') return DEMO_USERS.ACCOUNTANT
  return Object.values(DEMO_USERS).find((u) => u.id === id)
}
