import React from 'react'

const Card = ({ card, onClick }) => {
  const isFlipped = card.isFlipped || card.isMatched

  return (
    <div
      className={`card-wrapper ${isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front" />
        <div className="card-back">
          <span role="img" aria-label="signal">{card.signal}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
