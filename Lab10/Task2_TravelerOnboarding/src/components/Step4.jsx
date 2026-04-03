import React from 'react'
import { validators } from '../data'

export default function Step4({ data, errors, onChange, onError }) {
  const validate = (field, value) => {
    let err = ''
    if (field === 'username') err = validators.username(value)
    else if (field === 'password') err = validators.password(value)
    else if (field === 'confirmPassword') err = validators.confirmPassword(value, data.password)
    else if (field === 'termsAgreed') err = value ? '' : 'You must accept the terms'
    else if (field === 'privacyConsent') err = value ? '' : 'You must accept the privacy policy'
    onError(field, err)
  }

  const handle = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    onChange(name, val)
    validate(name, val)
  }

  const handleNotifChange = (e) => {
    const { value, checked } = e.target
    const updated = checked
      ? [...data.notifications, value]
      : data.notifications.filter(n => n !== value)
    onChange('notifications', updated)
  }

  const NOTIFICATIONS = [
    { value: 'flight', label: '✈️ Flight Updates' },
    { value: 'visa', label: '🛂 Visa Updates' },
    { value: 'promo', label: '🎁 Promotional Offers' },
  ]

  return (
    <div className="step-content">
      <h2 className="step-title">Travel Account Setup</h2>
      <div className="field">
        <label>Portal Username *</label>
        <input
          name="username"
          value={data.username}
          onChange={handle}
          placeholder="5–20 chars, letters/numbers/underscore"
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <div className="form-row">
        <div className="field">
          <label>Password *</label>
          <input name="password" type="password" value={data.password} onChange={handle} placeholder="Min 8 chars" />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="field">
          <label>Confirm Password *</label>
          <input name="confirmPassword" type="password" value={data.confirmPassword} onChange={handle} placeholder="Repeat password" />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>
      </div>
      <div className="field">
        <label>Travel Notification Preferences</label>
        <div className="checkbox-group">
          {NOTIFICATIONS.map(n => (
            <label key={n.value} className="checkbox-label">
              <input
                type="checkbox"
                value={n.value}
                checked={data.notifications.includes(n.value)}
                onChange={handleNotifChange}
              />
              {n.label}
            </label>
          ))}
        </div>
      </div>
      <div className="field">
        <label className="checkbox-label required-check">
          <input
            name="termsAgreed"
            type="checkbox"
            checked={data.termsAgreed}
            onChange={handle}
          />
          I agree to the Travel Terms &amp; Conditions *
        </label>
        {errors.termsAgreed && <span className="error">{errors.termsAgreed}</span>}
      </div>
      <div className="field">
        <label className="checkbox-label required-check">
          <input
            name="privacyConsent"
            type="checkbox"
            checked={data.privacyConsent}
            onChange={handle}
          />
          I consent to the Data Privacy Policy *
        </label>
        {errors.privacyConsent && <span className="error">{errors.privacyConsent}</span>}
      </div>
    </div>
  )
}
