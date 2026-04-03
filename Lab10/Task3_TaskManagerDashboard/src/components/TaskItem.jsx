import React from 'react'

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggle(task.id)}
        className="task-checkbox"
      />
      <span className={`task-text ${task.isCompleted ? 'strikethrough' : ''}`}>
        {task.text}
      </span>
      <button
        className="btn-delete"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  )
}
