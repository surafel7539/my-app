import EventCards from '@/components/EventCards'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/contants'
import React from 'react'

const page = () => {
  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className='text-center mt-5'>You Can Find Hackathons, Meetups, and Confereneces, All in One Place</p>

      <ExploreBtn/>

      <div className='mt-20 space-y-2'>
        <h3>Featured Events</h3>

        <ul className='events'>
          {events.map((events) =>(
            <EventCards {...events} />
          ))}
        </ul>
      </div>
    </section>
  )
}

export default page