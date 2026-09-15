import Link from 'next/link'
import React from 'react'

const EventCards = ({title, image, slug, location, date, time}) => {
  return (
    <Link href={`/events/${slug}`} id='event-card'>
        <img src={image} alt={title} height={300} width={410} className='poster'  />
        <div className='flex flex-row gap-2'>
            <img src="/icons/pin.svg" alt='location' width={14} height={14} />
            <p>{location}</p>
        </div>
        <p className='title'>{title}</p>

        <div className='date-time flex flex-col gap-2'>
            <div className='flex gap-2'>
                <img src="/icons/calendar.svg" alt='date' width={14} height={14} />
                <p>{date}</p>
            </div>
            <div className='flex gap-2'>
                <img src="/icons/clock.svg" alt='time' width={14} height={14} />
                <p>{time}</p>
            </div>
        </div>
    </Link>
  )
}

export default EventCards