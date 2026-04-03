export const COUNTRIES = [
  { code: 'US', name: 'United States', phone: '+1 (555) 000-0000', postal: /^\d{5}(-\d{4})?$/ },
  { code: 'GB', name: 'United Kingdom', phone: '+44 7911 123456', postal: /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i },
  { code: 'PK', name: 'Pakistan', phone: '+92 300 1234567', postal: /^\d{5}$/ },
  { code: 'IN', name: 'India', phone: '+91 98765 43210', postal: /^\d{6}$/ },
  { code: 'CA', name: 'Canada', phone: '+1 (416) 000-0000', postal: /^[A-Z]\d[A-Z] \d[A-Z]\d$/i },
  { code: 'AU', name: 'Australia', phone: '+61 400 000 000', postal: /^\d{4}$/ },
  { code: 'DE', name: 'Germany', phone: '+49 151 12345678', postal: /^\d{5}$/ },
  { code: 'FR', name: 'France', phone: '+33 6 12 34 56 78', postal: /^\d{5}$/ },
  { code: 'JP', name: 'Japan', phone: '+81 90 1234 5678', postal: /^\d{3}-\d{4}$/ },
  { code: 'AE', name: 'UAE', phone: '+971 50 123 4567', postal: /^\d{5,6}$/ },
]

export const STATES = {
  US: ['Alabama','Alaska','Arizona','California','Colorado','Florida','Georgia','Illinois','New York','Texas'],
  GB: ['England','Scotland','Wales','Northern Ireland'],
  PK: ['Punjab','Sindh','KPK','Balochistan','Islamabad'],
  IN: ['Maharashtra','Delhi','Karnataka','Tamil Nadu','Uttar Pradesh'],
  CA: ['Ontario','Quebec','British Columbia','Alberta','Manitoba'],
  AU: ['NSW','Victoria','Queensland','WA','SA'],
  DE: ['Bavaria','Berlin','Hamburg','Hesse','NRW'],
  FR: ['Île-de-France','Provence','Normandy','Bretagne','Alsace'],
  JP: ['Tokyo','Osaka','Kanagawa','Aichi','Hokkaido'],
  AE: ['Dubai','Abu Dhabi','Sharjah','Ajman','Fujairah'],
}

export const LANGUAGES = [
  'English','Arabic','Chinese','French','German','Hindi','Japanese',
  'Korean','Portuguese','Russian','Spanish','Urdu','Turkish','Italian',
]

export const PROFESSIONS = [
  'Software Engineer','Doctor','Teacher','Lawyer','Accountant',
  'Designer','Manager','Consultant','Researcher','Student','Other',
]

export const TEMP_EMAIL_DOMAINS = ['mailinator.com','trashmail.com','guerrillamail.com','tempmail.com','throwaway.email']

// Validation helpers
export const validators = {
  name: (v) => {
    if (!v) return 'Required'
    if (v.length < 2) return 'Min 2 characters'
    if (v.length > 50) return 'Max 50 characters'
    if (/[0-9!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?]/.test(v)) return 'No numbers or special characters'
    return ''
  },
  email: (v) => {
    if (!v) return 'Required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Invalid email format'
    const domain = v.split('@')[1]?.toLowerCase()
    if (TEMP_EMAIL_DOMAINS.includes(domain)) return 'Temporary email domains not allowed'
    return ''
  },
  dob: (v) => {
    if (!v) return 'Required'
    const d = new Date(v)
    if (d > new Date()) return 'Cannot be a future date'
    const age = (new Date() - d) / (365.25 * 24 * 60 * 60 * 1000)
    if (age < 18) return 'Must be at least 18 years old'
    return ''
  },
  phone: (v) => {
    if (!v) return 'Required'
    if (!/^[+\d\s\-().]{7,20}$/.test(v)) return 'Invalid phone number format'
    return ''
  },
  address: (v, min = 5) => {
    if (!v) return 'Required'
    if (v.length < min) return `Min ${min} characters`
    return ''
  },
  city: (v) => {
    if (!v) return 'Required'
    if (/\d/.test(v)) return 'No numeric values allowed'
    return ''
  },
  postalCode: (v, countryCode) => {
    if (!v) return 'Required'
    const country = COUNTRIES.find(c => c.code === countryCode)
    if (country && !country.postal.test(v)) return `Invalid postal code for ${country.name}`
    return ''
  },
  travelExp: (v, dob) => {
    if (v === '' || v === undefined) return 'Required'
    const n = Number(v)
    if (n < 0) return 'Must be non-negative'
    if (dob) {
      const birthYear = new Date(dob).getFullYear()
      const maxExp = new Date().getFullYear() - birthYear - 18
      if (n > maxExp) return `Cannot exceed ${maxExp} years (age - 18)`
    }
    return ''
  },
  linkedin: (v) => {
    if (!v) return ''
    if (!/^https?:\/\/(www\.)?linkedin\.com\//.test(v)) return 'Must be a valid LinkedIn URL'
    return ''
  },
  url: (v) => {
    if (!v) return ''
    try { new URL(v); return '' } catch { return 'Must be a valid URL' }
  },
  username: (v) => {
    if (!v) return 'Required'
    if (v.length < 5 || v.length > 20) return '5–20 characters required'
    if (!/^[a-zA-Z0-9_]+$/.test(v)) return 'Alphanumeric and underscores only'
    // Mock unique check
    if (['admin', 'user', 'test', 'traveler'].includes(v.toLowerCase())) return 'Username already taken'
    return ''
  },
  password: (v) => {
    if (!v) return 'Required'
    if (v.length < 8) return 'Minimum 8 characters'
    if (!/[A-Z]/.test(v)) return 'Must include uppercase letter'
    if (!/[a-z]/.test(v)) return 'Must include lowercase letter'
    if (!/[0-9]/.test(v)) return 'Must include a number'
    if (!/[^A-Za-z0-9]/.test(v)) return 'Must include a special character'
    return ''
  },
  confirmPassword: (v, pass) => {
    if (!v) return 'Required'
    if (v !== pass) return 'Passwords do not match'
    return ''
  },
}
