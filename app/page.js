import EventCards from '@/components/EventCards'
import ExploreBtn from '@/components/ExploreBtn'
import { getAllEvents } from '@/lib/actions/events'
import { cacheLife } from 'next/cache'
import React from 'react'

const page = async () => {
  'use cache'
  cacheLife('seconds')
  const event = await getAllEvents()

  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className='text-center mt-5'>You Can Find Hackathons, Meetups, and Confereneces, All in One Place</p>

      <ExploreBtn/>

      <div className='mt-20 space-y-3'>
        <h3>Featured Events</h3>

        <ul className='events'>
          {event && event.length > 0 && event.map(({time, title, date, image, location, slug}) =>(
            <EventCards key={slug}  title={title} image={image} slug={slug} time={time} date={date} location={location}  />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page