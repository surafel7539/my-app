import BookingForm from '@/components/BookingForm'
import EventCards from '@/components/EventCards'
import { getSimilarEventsBySlug } from '@/lib/actions'
import { cacheLife } from 'next/cache'
import { notFound } from 'next/navigation'
import React from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

async function getEvent(slug) {
    'use cache'
    cacheLife('hours')

    const request = await fetch(`${BASE_URL}/api/events/${slug}`)
    return request.json()
}


const EventDetailItem = ({icon, alt, label}) => (
    <div className='flex gap-2 items-center'>
        <img src={icon} alt={alt} height={17} width={17} />
        <p>{label}</p>
    </div>
)
const EventAgenda = ({agendaItems}) => (
    <div className='agenda'>
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item)=>(
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)
const EventTags = ({eventTags}) => (
    <div className='flex flex-row gap-1.5 felx-wrap '>
        {eventTags.map((tags) => (
            <div className='pill' key={tags}>{tags}</div>
        ))}
    </div>
)

const EventDetails = async ({params}) => {
    const {slug} = await params
    
    const {event : {description, time, title, date, image, tags, venue, location, mode, audience, agenda, organizer, overview }} = await getEvent(slug)

    if (!description) return notFound()
    
    let bookings = 10;
    const similarEvents = await getSimilarEventsBySlug(slug)
  return (
    <section id='event'>
      <div className='header'>
        <h1>Event Description</h1>
        <p className='mt-2'>{description}</p>
      </div>
      <div className='details'>
        <div className='content'>
            <img src={image} alt={title} width={800} height={800} />
            <section className='flex-col-gap-2'>
                <h2>OverView</h2>
                <p>{overview}</p>
            </section>
            <section className='flex-col-gap-2'>
                <h2>Event Details</h2>
                <EventDetailItem icon={`/icons/calendar.svg`} alt={`date`} label={date}/>
                <EventDetailItem alt={`time`} label={time} icon={'/icons/clock.svg'} />
                <EventDetailItem alt={'location'} label={location} icon={'/icons/pin.svg'} />
                <EventDetailItem alt={'mode'} label={mode} icon={'/icons/mode.svg'} />
                <EventDetailItem alt={'audience'} label={audience} icon={`/icons/audience.svg`} />
            </section>
            
            <EventAgenda agendaItems={agenda} />

            <section className='flex-col-gap-2'>
                <h2>About the Organizer</h2>
                <li><p>{organizer}</p></li>
            </section>
            <section className='flex-col-gap-2'>
                <h2>About the Setup</h2>
                <li><p>{venue}</p></li>
            </section>
            <EventTags  eventTags={tags} />

        </div>
        <aside className='booking'>
            <div className='signup-card'>
                <h2>Book Your Spot</h2>
                {bookings > 0 ? (
                    <p className='text-sm'>Join {bookings} people who have already booked their spot</p>
                ): (
                    <p className='text-sm'>Be the first to a spot</p>
                )}
                <BookingForm/>
            </div>
        </aside>

      </div>
      <div className='flex w-full flex-col gap-4 pt-20'>
            <h2>Similar Events</h2>
            <div className='events'>
                {similarEvents.map(({time, title, date, image, location, slug}) => (
                    <EventCards key={title} title={title} image={image} slug={slug} time={time} date={date} location={location}/>
                ))}
            </div>
      </div>
    </section>
  )
}

export default EventDetails