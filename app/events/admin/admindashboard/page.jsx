import React from 'react'
import EventCards from '@/components/EventCards'
import DeleteButton from '@/components/DeleteButton'

export const instant = false
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const page = async () => {
  const response = await fetch(`${BASE_URL}/api/events`)
  const {event} = await response.json()

  
    return (
      <div className='mt-20 space-y-3'>
              <h3>Created Events</h3>
      
              <ul className='events'>
                {event && event.length > 0 && event.map(({_id,time, title, date, image, location, slug}) =>(
                    <div key={slug} className='flex flex-col   gap-3  p-4 rounded-lg'>
                  <EventCards   title={title} image={image} slug={slug} time={time} date={date} location={location}  />
                  <DeleteButton slug={slug}/>
                    </div>
                ))}
              </ul>
            </div>
    )
}

export default page