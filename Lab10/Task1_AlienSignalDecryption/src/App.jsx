import React, { useState, useEffect } from 'react'
import Card from './Card'

const SIGNALS = ['👾', '🛸', '🌀', '⚡', '🔮', '💫', '🌌', '🤖']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function createCards() {
  return shuffle([...SIGNALS, ...SIGNALS].map((signal, index) => ({
    id: index,
    signal,
    isFlipped: false,
    isMatched: false,
  })))
}

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: (Math.random() * 100).toFixed(1),
  left: (Math.random() * 100).toFixed(1),
  dur: (1.5 + Math.random() * 3).toFixed(1) + 's',
  delay: (Math.random() * 3).toFixed(1) + 's',
}))

export default function App() {
  const [cards, setCards] = useState(createCards)
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [pendingMismatch, setPendingMismatch] = useState(null)

  // Timer via useEffect
  useEffect(() => {
    if (!timerActive) return
    const id = setInterval(() => setTime(t => t + 1), 1000)
    return () => clearInterval(id)
  }, [timerActive])

  // Completion check via useEffect
  useEffect(() => {
    if (matchedCards.length === SIGNALS.length * 2 && matchedCards.length > 0) {
      setTimerActive(false)
      setIsComplete(true)
    }
  }, [matchedCards])

  // Mismatch delay via useEffect
  useEffect(() => {
    if (pendingMismatch === null) return
    const { first, second } = pendingMismatch
    const timer = setTimeout(() => {
      setCards(prev => prev.map((c, i) =>
        i === first || i === second ? { ...c, isFlipped: false } : c
      ))
      setFlippedCards([])
      setIsLocked(false)
      setPendingMismatch(null)
    }, 1000)
    return () => clearTimeout(timer)
  }, [pendingMismatch])

  const handleCardClick = (index) => {
    if (isLocked) return
    const card = cards[index]
    if (card.isFlipped || card.isMatched) return
    if (flippedCards.length === 1 && flippedCards[0] === index) return

    if (!timerActive && flippedCards.length === 0 && matchedCards.length === 0) {
      setTimerActive(true)
    }

    const updatedCards = cards.map((c, i) =>
      i === index ? { ...c, isFlipped: true } : c
    )
    setCards(updatedCards)

    if (flippedCards.length === 0) {
      setFlippedCards([index])
    } else {
      const firstIndex = flippedCards[0]
      setAttempts(a => a + 1)
      setIsLocked(true)

      if (updatedCards[firstIndex].signal === updatedCards[index].signal) {
        setScore(s => s + 100)
        const matched = updatedCards.map((c, i) =>
          i === firstIndex || i === index ? { ...c, isMatched: true, isFlipped: true } : c
        )
        setCards(matched)
        setMatchedCards(prev => [...prev, firstIndex, index])
        setFlippedCards([])
        setIsLocked(false)
      } else {
        setScore(s => s - 10)
        setPendingMismatch({ first: firstIndex, second: index })
      }
    }
  }

  const handleRestart = () => {
    setCards(createCards())
    setFlippedCards([])
    setMatchedCards([])
    setScore(0)
    setTime(0)
    setTimerActive(false)
    setIsLocked(false)
    setAttempts(0)
    setIsComplete(false)
    setPendingMismatch(null)
  }

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const timeBonus = Math.max(0, 500 - time * 2)
  const finalScore = score + timeBonus

  return (
    <div className="app">
      <div className="stars">
        {STARS.map(s => (
          <div key={s.id} className="star" style={{
            top: `${s.top}%`, left: `${s.left}%`,
            '--dur': s.dur, '--delay': s.delay
          }} />
        ))}
      </div>

      <div className="header">
        <h1>ALIEN SIGNAL DECRYPTION</h1>
        <p>Match all signal pairs to complete decryption</p>
      </div>

      <div className="hud">
        <div className="hud-panel">
          <span className="label">Score</span>
          <span className={`value ${score < 0 ? 'danger' : ''}`}>{score}</span>
        </div>
        <div className="hud-panel">
          <span className="label">Time</span>
          <span className="value">{formatTime(time)}</span>
        </div>
        <div className="hud-panel">
          <span className="label">Matched</span>
          <span className="value success">{matchedCards.length / 2} / {SIGNALS.length}</span>
        </div>
        <div className="hud-panel">
          <span className="label">Attempts</span>
          <span className="value">{attempts}</span>
        </div>
      </div>

      <div className="grid">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} onClick={() => handleCardClick(index)} />
        ))}
      </div>

      <button className="btn-restart-small" onClick={handleRestart}>↺ RESTART</button>

      {isComplete && (
        <div className="overlay">
          <div className="modal">
            <h2>DECRYPTION COMPLETE ✓</h2>
            <div className="final-score">{finalScore}</div>
            <div className="stats">
              <div className="stat">Base Score <strong>{score}</strong></div>
              <div className="stat">Time Bonus <strong>+{timeBonus}</strong></div>
              <div className="stat">Time <strong>{formatTime(time)}</strong></div>
              <div className="stat">Attempts <strong>{attempts}</strong></div>
            </div>
            <button className="btn-restart" onClick={handleRestart}>DECRYPT AGAIN</button>
          </div>
        </div>
      )}
    </div>
  )
}
