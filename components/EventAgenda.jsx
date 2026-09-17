import React from 'react'

const EventAgenda = ({ agenda }) => {
  const agendaItems = Array.isArray(agenda) ? agenda : []

  if (agendaItems.length === 0) {
    return null
  }

  return (
    <div className='agenda'>
      <h2>Agenda</h2>
      <ul>
        {agendaItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default EventAgenda
