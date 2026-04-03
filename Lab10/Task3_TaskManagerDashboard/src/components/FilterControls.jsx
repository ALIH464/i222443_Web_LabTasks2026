import React from 'react'

const FILTERS = ['all', 'active', 'completed']

export default function FilterControls({ currentFilter, onFilterChange }) {
  return (
    <div className="filter-controls">
      {FILTERS.map(f => (
        <button
          key={f}
          className={`filter-btn ${currentFilter === f ? 'active' : ''}`}
          onClick={() => onFilterChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  )
}
