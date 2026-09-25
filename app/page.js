import EventCards from '@/components/EventCards'
import ExploreBtn from '@/components/ExploreBtn'
import { events } from '@/lib/contants'
import { cacheLife } from 'next/cache'
import React from 'react'

export const instant = false
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
async function getCachedEvents() {
  'use cache';
  cacheLife('seconds');

  const response = await fetch(`${BASE_URL}/api/events`);
  
  if (!response.ok) {
    console.log('Failed to fetch events');
  }

  return response.json();
}

const page = async () => {
  

  const {event} = await getCachedEvents()

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