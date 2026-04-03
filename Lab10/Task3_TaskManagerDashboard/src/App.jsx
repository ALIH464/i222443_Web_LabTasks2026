import React, { useState, useEffect } from 'react'
import TaskInput from './components/TaskInput'
import FilterControls from './components/FilterControls'
import TaskList from './components/TaskList'

const INITIAL_TASKS = [
  { id: 1, text: 'Read React documentation', isCompleted: false },
  { id: 2, text: 'Build a small project', isCompleted: true },
  { id: 3, text: 'Write lab report', isCompleted: false },
]

export default function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [newTaskText, setNewTaskText] = useState('')

  // Simulate loading initial tasks from API using useEffect + setTimeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(INITIAL_TASKS)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Log task count changes (demonstrates useEffect reacting to state)
  useEffect(() => {
    if (!loading) {
      document.title = `Tasks (${tasks.filter(t => !t.isCompleted).length} active)`
    }
  }, [tasks, loading])

  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
      isCompleted: false,
    }
    setTasks(prev => [...prev, newTask])
  }

  const handleToggleTask = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    )
  }

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted
    if (filter === 'completed') return task.isCompleted
    return true
  })

  const completedCount = tasks.filter(t => t.isCompleted).length
  const activeCount = tasks.filter(t => !t.isCompleted).length

  return (
    <div className="app">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>📋 Personal Task Manager</h1>
          <p className="subtitle">Stay organized, stay productive</p>
          {!loading && (
            <div className="stats-row">
              <span className="stat-badge total">{tasks.length} Total</span>
              <span className="stat-badge active">{activeCount} Active</span>
              <span className="stat-badge done">{completedCount} Done</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <p>Loading tasks...</p>
          </div>
        ) : (
          <>
            <TaskInput onAddTask={handleAddTask} newTaskText={newTaskText} setNewTaskText={setNewTaskText} />

            <div className="list-section">
              <div className="list-header">
                <h2>Your Tasks</h2>
                <FilterControls currentFilter={filter} onFilterChange={setFilter} />
              </div>
              <TaskList
                tasks={filteredTasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
