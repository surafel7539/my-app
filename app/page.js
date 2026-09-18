import EventCards from '@/components/EventCards'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/contants'
import React from 'react'


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const page = async () => {
  const response = await fetch(`${BASE_URL}/api/events`, {
  cache: "force-cache",
})
  const {event} = await response.json()

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