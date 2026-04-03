import React from 'react'
import { validators } from '../data'

export default function Step1({ data, errors, onChange, onError }) {
  const validate = (field, value) => {
    let err = ''
    if (field === 'firstName' || field === 'lastName') err = validators.name(value)
    else if (field === 'email') err = validators.email(value)
    else if (field === 'dob') err = validators.dob(value)
    else if (field === 'passportPhoto') {
      if (!value) { err = ''; }
      else {
        const allowed = ['image/jpeg', 'image/png', 'image/jpg']
        if (!allowed.includes(value.type)) err = 'Only JPG/PNG images allowed'
        else if (value.size > 5 * 1024 * 1024) err = 'Max file size is 5MB'
      }
    }
    onError(field, err)
  }

  const handle = (e) => {
    const { name, value, files } = e.target
    const val = files ? files[0] : value
    onChange(name, val)
    validate(name, val)
  }

  return (
    <div className="step-content">
      <h2 className="step-title">Traveler Identity Details</h2>
      <div className="form-row">
        <div className="field">
          <label>First Name *</label>
          <input name="firstName" value={data.firstName} onChange={handle} placeholder="John" />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="field">
          <label>Last Name *</label>
          <input name="lastName" value={data.lastName} onChange={handle} placeholder="Doe" />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
      </div>
      <div className="field">
        <label>Contact Email *</label>
        <input name="email" type="email" value={data.email} onChange={handle} placeholder="john@example.com" />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="field">
        <label>Date of Birth * <small>(must be 18+)</small></label>
        <input name="dob" type="date" value={data.dob} onChange={handle} />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>
      <div className="field">
        <label>Passport Photo * <small>(JPG/PNG, max 5MB)</small></label>
        <input name="passportPhoto" type="file" accept=".jpg,.jpeg,.png" onChange={handle} />
        {errors.passportPhoto && <span className="error">{errors.passportPhoto}</span>}
        {data.passportPhoto && !errors.passportPhoto && (
          <span className="success-msg">✓ {data.passportPhoto.name}</span>
        )}
      </div>
    </div>
  )
}
