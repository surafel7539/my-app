import React from 'react'
import { cacheLife } from 'next/cache'
import EventCards from '@/components/EventCards'
import { getAllEvents } from '@/lib/actions/events'

const page = async () => {
'use cache'
cacheLife('seconds')
const event = await getAllEvents()
  return (
    <div className='mt-20 space-y-3'>
            <h3>Available Events</h3>

            <ul className='events'>
              {event && event.length > 0 && event.map(({time, title, date, image, location, slug}) =>(
                <EventCards key={slug}  title={title} image={image} slug={slug} time={time} date={date} location={location}  />
              ))}
            </ul>
          </div>
  )
}

export default page
