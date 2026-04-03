import React from 'react'
import { COUNTRIES, STATES, validators } from '../data'

export default function Step2({ data, errors, onChange, onError }) {
  const validate = (field, value) => {
    let err = ''
    if (field === 'phone') err = validators.phone(value)
    else if (field === 'address1') err = validators.address(value, 5)
    else if (field === 'city') err = validators.city(value)
    else if (field === 'country') err = value ? '' : 'Required'
    else if (field === 'state') err = value ? '' : 'Required'
    else if (field === 'postalCode') err = validators.postalCode(value, data.country)
    onError(field, err)
  }

  const handle = (e) => {
    const { name, value } = e.target
    onChange(name, value)
    if (name === 'country') { onChange('state', ''); onError('state', '') }
    validate(name, value)
  }

  const selectedCountry = COUNTRIES.find(c => c.code === data.country)
  const states = data.country ? STATES[data.country] || [] : []

  return (
    <div className="step-content">
      <h2 className="step-title">Travel Contact & Origin Details</h2>
      <div className="form-row">
        <div className="field">
          <label>Emergency Contact Number *
            {selectedCountry && <small> e.g. {selectedCountry.phone}</small>}
          </label>
          <input name="phone" type="tel" value={data.phone} onChange={handle} placeholder="+1 555 000 0000" />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="field">
          <label>Secondary Contact <small>(optional)</small></label>
          <input name="phone2" type="tel" value={data.phone2} onChange={handle} placeholder="+1 555 000 0001" />
        </div>
      </div>
      <div className="field">
        <label>Residential Address Line 1 *</label>
        <input name="address1" value={data.address1} onChange={handle} placeholder="123 Main Street" />
        {errors.address1 && <span className="error">{errors.address1}</span>}
      </div>
      <div className="field">
        <label>Address Line 2 <small>(optional)</small></label>
        <input name="address2" value={data.address2} onChange={handle} placeholder="Apt 4B" />
      </div>
      <div className="form-row">
        <div className="field">
          <label>City *</label>
          <input name="city" value={data.city} onChange={handle} placeholder="New York" />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="field">
          <label>Country *</label>
          <select name="country" value={data.country} onChange={handle}>
            <option value="">Select Country</option>
            {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <label>State / Province *</label>
          <select name="state" value={data.state} onChange={handle} disabled={!data.country}>
            <option value="">Select State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        <div className="field">
          <label>Postal Code *</label>
          <input name="postalCode" value={data.postalCode} onChange={handle} placeholder="12345" />
          {errors.postalCode && <span className="error">{errors.postalCode}</span>}
        </div>
      </div>
    </div>
  )
}
