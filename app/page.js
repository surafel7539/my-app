import EventCards from '@/components/EventCards'
import ExploreBtn from '@/components/ExploreBtn'
import React, { Suspense } from 'react'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

async function fetchEvents() {
  try {
    const response = await fetch(`${BASE_URL}/api/events`)
    const data = await response.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function FeaturedEvents() {
  const events = await fetchEvents()

  return (
    <ul className='events'>
      {events.map((event) => (
        <EventCards key={event.slug} {...event} />
      ))}
    </ul>
  )
}

const page = () => {
  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className='text-center mt-5'>You Can Find Hackathons, Meetups, and Confereneces, All in One Place</p>

      <ExploreBtn/>

      <div className='mt-20 space-y-2'>
        <h3>Featured Events</h3>

        <Suspense fallback={<p>Loading events…</p>}>
          <FeaturedEvents/>
        </Suspense>
      </div>
    </section>
  )
}

export default page
