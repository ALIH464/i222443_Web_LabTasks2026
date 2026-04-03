import React, { useState, useEffect } from 'react'
import ProgressBar from './components/ProgressBar'
import Step1 from './components/Step1'
import Step2 from './components/Step2'
import Step3 from './components/Step3'
import Step4 from './components/Step4'

const TOTAL_STEPS = 4

const INITIAL_FORM = {
  // Step 1
  firstName: '', lastName: '', email: '', dob: '', passportPhoto: null,
  // Step 2
  phone: '', phone2: '', address1: '', address2: '', city: '', country: '', state: '', postalCode: '',
  // Step 3
  profession: '', professionOther: '', travelExp: '', languages: [], linkedin: '', website: '',
  // Step 4
  username: '', password: '', confirmPassword: '', notifications: [], termsAgreed: false, privacyConsent: false,
}

const INITIAL_ERRORS = Object.keys(INITIAL_FORM).reduce((acc, k) => ({ ...acc, [k]: '' }), {})

// Fields per step used for progress calculation
const STEP_REQUIRED_FIELDS = {
  1: ['firstName', 'lastName', 'email', 'dob'],
  2: ['phone', 'address1', 'city', 'country', 'state', 'postalCode'],
  3: ['profession', 'travelExp', 'languages'],
  4: ['username', 'password', 'confirmPassword', 'termsAgreed', 'privacyConsent'],
}

function loadFromStorage() {
  try {
    const saved = localStorage.getItem('traveler_form')
    if (saved) {
      const parsed = JSON.parse(saved)
      // passportPhoto cannot be serialized
      return { ...INITIAL_FORM, ...parsed, passportPhoto: null }
    }
  } catch (_) {}
  return null
}

export default function App() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(() => loadFromStorage() || INITIAL_FORM)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [notification, setNotification] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Persist to localStorage on form change
  useEffect(() => {
    const toSave = { ...form, passportPhoto: null }
    localStorage.setItem('traveler_form', JSON.stringify(toSave))
  }, [form])

  const onChange = (name, value) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onError = (field, err) => {
    setErrors(prev => ({ ...prev, [field]: err }))
  }

  const showNotif = (msg, type = 'success') => {
    setNotification({ msg, type })
    setTimeout(() => setNotification(null), 3500)
  }

  // Calculate valid fields for current step for progress bar
  const validFieldCount = STEP_REQUIRED_FIELDS[step].filter(f => {
    const v = form[f]
    if (Array.isArray(v)) return v.length >= (f === 'languages' ? 2 : 1)
    if (typeof v === 'boolean') return v
    return v && !errors[f]
  }).length
  const totalFieldCount = STEP_REQUIRED_FIELDS[step].length

  const hasStepErrors = () => {
    const fields = STEP_REQUIRED_FIELDS[step]
    return fields.some(f => {
      const v = form[f]
      if (Array.isArray(v)) return v.length < (f === 'languages' ? 2 : 1)
      if (typeof v === 'boolean') return !v && (f === 'termsAgreed' || f === 'privacyConsent')
      if (!v) return true
      return !!errors[f]
    })
  }

  const handleNext = () => {
    if (hasStepErrors()) {
      showNotif('Please fix all errors before proceeding.', 'error')
      return
    }
    if (step < TOTAL_STEPS) setStep(s => s + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(s => s - 1)
  }

  const handleSubmit = async () => {
    if (hasStepErrors()) { showNotif('Please complete all required fields.', 'error'); return }
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsLoading(false)
    setIsSubmitted(true)
    localStorage.removeItem('traveler_form')
    showNotif('Registration successful! Welcome aboard 🎉', 'success')
  }

  const handleClear = () => {
    setForm(INITIAL_FORM)
    setErrors(INITIAL_ERRORS)
    setStep(1)
    localStorage.removeItem('traveler_form')
    setShowClearConfirm(false)
    showNotif('Form cleared.', 'info')
  }

  const stepProps = { data: form, errors, onChange, onError }

  if (isSubmitted) {
    return (
      <div className="app">
        <div className="success-screen">
          <div className="success-icon">✈️</div>
          <h1>Registration Complete!</h1>
          <p>Welcome, {form.firstName} {form.lastName}!</p>
          <p className="sub">Your traveler portal account <strong>{form.username}</strong> has been created.</p>
          <button className="btn-primary" onClick={() => { setIsSubmitted(false); setForm(INITIAL_FORM); setStep(1) }}>
            Register Another Traveler
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {notification && (
        <div className={`notification ${notification.type}`}>{notification.msg}</div>
      )}
      {showExitConfirm && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Leave form?</h3>
            <p>You have unsaved changes. Are you sure you want to exit?</p>
            <div className="confirm-btns">
              <button className="btn-danger" onClick={() => { setForm(INITIAL_FORM); setShowExitConfirm(false) }}>Yes, Exit</button>
              <button className="btn-secondary" onClick={() => setShowExitConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {showClearConfirm && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Clear all data?</h3>
            <p>This will reset all fields. This cannot be undone.</p>
            <div className="confirm-btns">
              <button className="btn-danger" onClick={handleClear}>Yes, Clear</button>
              <button className="btn-secondary" onClick={() => setShowClearConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="form-header">
          <h1>🌍 Traveler Onboarding System</h1>
          <p>Complete your international travel registration</p>
        </div>

        <ProgressBar
          currentStep={step}
          totalSteps={TOTAL_STEPS}
          validFieldCount={validFieldCount}
          totalFieldCount={totalFieldCount}
        />

        <div className="form-card">
          {step === 1 && <Step1 {...stepProps} />}
          {step === 2 && <Step2 {...stepProps} />}
          {step === 3 && <Step3 {...stepProps} />}
          {step === 4 && <Step4 {...stepProps} />}

          <div className="form-actions">
            <button className="btn-secondary" onClick={handlePrev} disabled={step === 1}>
              ← Previous
            </button>
            <div className="right-actions">
              <button className="btn-clear" onClick={() => setShowClearConfirm(true)}>Clear Form</button>
              {step < TOTAL_STEPS ? (
                <button className="btn-primary" onClick={handleNext} disabled={hasStepErrors()}>
                  Next →
                </button>
              ) : (
                <button className="btn-primary" onClick={handleSubmit} disabled={isLoading || hasStepErrors()}>
                  {isLoading ? <span className="spinner" /> : 'Submit Registration'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
