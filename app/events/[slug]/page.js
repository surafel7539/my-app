import EventAgenda from '@/components/EventAgenda'
import { events } from '@/lib/contants'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'

async function EventDetails({ params }) {
  const { slug } = await params
  const event = events.find((event) => event.slug === slug)

  if (!event) {
    notFound()
  }

  return (
    <section id='event'>
      <div className='header'>
        <h1>{event.title}</h1>
        <div className='flex-row-gap-2'>
          <img src="/icons/pin.svg" alt='location' width={14} height={14} />
          <p>{event.location}</p>
        </div>
        <div className='flex-row-gap-2'>
          <span className='pill'>{event.date}</span>
          <span className='pill'>{event.time}</span>
        </div>
      </div>

      <div className='details'>
        <div className='content'>
          <img src={event.image} alt={event.title} className='banner' />
          <EventAgenda agenda={event.agenda} />
        </div>
      </div>
    </section>
  )
}

const EventPage = ({ params }) => {
  return (
    <Suspense fallback={<p>Loading event…</p>}>
      <EventDetails params={params} />
    </Suspense>
  )
}

export default EventPage
