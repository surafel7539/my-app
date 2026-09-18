import React from 'react'
import { cacheLife } from 'next/cache'
import EventCards from '@/components/EventCards'
export const instant = false
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const page = async () => {
'use cache'
cacheLife('seconds')
const response = await fetch(`${BASE_URL}/api/events`)
const {event} = await response.json()
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