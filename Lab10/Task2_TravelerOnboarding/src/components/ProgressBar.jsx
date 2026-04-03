import React from 'react'

const STEP_LABELS = ['Identity', 'Contact', 'Background', 'Account']

function getColor(pct) {
  if (pct <= 25) return '#ef4444'
  if (pct <= 50) return '#eab308'
  if (pct <= 75) return '#3b82f6'
  return '#22c55e'
}

export default function ProgressBar({ currentStep, totalSteps, validFieldCount, totalFieldCount }) {
  const stepPct = ((currentStep - 1) / totalSteps) * 100
  const fieldPct = totalFieldCount > 0 ? (validFieldCount / totalFieldCount) * 100 : 0
  const pct = Math.round((stepPct + fieldPct / totalSteps))
  const color = getColor(pct)

  return (
    <div className="progress-wrapper">
      <div className="progress-header">
        <span className="progress-label">Journey Completion</span>
        <span className="progress-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill"
          style={{ width: `${pct}%`, background: color, transition: 'width 0.4s ease, background 0.4s ease' }}
        />
      </div>
      <div className="step-indicators">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className={`step-dot ${i + 1 < currentStep ? 'done' : ''} ${i + 1 === currentStep ? 'active' : ''}`}>
            <div className="dot">{i + 1 < currentStep ? '✓' : i + 1}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
