import React, { useState } from 'react'

export default function TaskInput({ onAddTask }) {
  const [text, setText] = useState('')

  const handleAdd = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onAddTask(trimmed)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  return (
    <div className="task-input-section">
      <h2>Add New Task</h2>
      <div className="input-row">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="task-input"
        />
        <button className="btn-add" onClick={handleAdd}>Add Task</button>
      </div>
    </div>
  )
}
