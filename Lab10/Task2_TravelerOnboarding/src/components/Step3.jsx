import React, { useState } from 'react'
import { PROFESSIONS, LANGUAGES, validators } from '../data'

export default function Step3({ data, errors, onChange, onError }) {
  const [langInput, setLangInput] = useState('')

  const validate = (field, value) => {
    let err = ''
    if (field === 'profession') err = value ? '' : 'Required'
    else if (field === 'professionOther') err = value ? '' : 'Please specify'
    else if (field === 'travelExp') err = validators.travelExp(value, data.dobRef)
    else if (field === 'languages') err = value.length < 2 ? 'Minimum 2 languages required' : ''
    else if (field === 'linkedin') err = validators.linkedin(value)
    else if (field === 'website') err = validators.url(value)
    onError(field, err)
  }

  const handle = (e) => {
    const { name, value } = e.target
    onChange(name, value)
    validate(name, value)
  }

  const addLanguage = (lang) => {
    if (!lang.trim()) return
    if (data.languages.length >= 10) { onError('languages', 'Maximum 10 languages'); return }
    if (!data.languages.includes(lang)) {
      const updated = [...data.languages, lang]
      onChange('languages', updated)
      validate('languages', updated)
    }
    setLangInput('')
  }

  const removeLanguage = (lang) => {
    const updated = data.languages.filter(l => l !== lang)
    onChange('languages', updated)
    validate('languages', updated)
  }

  return (
    <div className="step-content">
      <h2 className="step-title">Travel Background Information</h2>
      <div className="form-row">
        <div className="field">
          <label>Profession *</label>
          <select name="profession" value={data.profession} onChange={handle}>
            <option value="">Select Profession</option>
            {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.profession && <span className="error">{errors.profession}</span>}
        </div>
        {data.profession === 'Other' && (
          <div className="field">
            <label>Specify Profession *</label>
            <input name="professionOther" value={data.professionOther} onChange={handle} placeholder="Enter your profession" />
            {errors.professionOther && <span className="error">{errors.professionOther}</span>}
          </div>
        )}
      </div>
      <div className="field">
        <label>International Travel Experience (years) *</label>
        <input name="travelExp" type="number" min="0" value={data.travelExp} onChange={handle} placeholder="0" />
        {errors.travelExp && <span className="error">{errors.travelExp}</span>}
      </div>
      <div className="field">
        <label>Languages Known * <small>(min 2, max 10)</small></label>
        <div className="tags-input">
          <div className="tags">
            {data.languages.map(l => (
              <span key={l} className="tag">
                {l}
                <button type="button" onClick={() => removeLanguage(l)}>×</button>
              </span>
            ))}
          </div>
          <div className="tag-controls">
            <select value="" onChange={e => addLanguage(e.target.value)}>
              <option value="">Add from list...</option>
              {LANGUAGES.filter(l => !data.languages.includes(l)).map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <input
              value={langInput}
              onChange={e => setLangInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addLanguage(langInput))}
              placeholder="Or type custom..."
            />
            <button type="button" className="btn-add" onClick={() => addLanguage(langInput)}>Add</button>
          </div>
        </div>
        {errors.languages && <span className="error">{errors.languages}</span>}
      </div>
      <div className="field">
        <label>LinkedIn Profile <small>(optional)</small></label>
        <input name="linkedin" type="url" value={data.linkedin} onChange={handle} placeholder="https://linkedin.com/in/yourname" />
        {errors.linkedin && <span className="error">{errors.linkedin}</span>}
      </div>
      <div className="field">
        <label>Travel Blog / Website <small>(optional)</small></label>
        <input name="website" type="url" value={data.website} onChange={handle} placeholder="https://yourblog.com" />
        {errors.website && <span className="error">{errors.website}</span>}
      </div>
    </div>
  )
}
