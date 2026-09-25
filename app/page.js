import EventCards from '@/components/EventCards'
import ExploreBtn from '@/components/ExploreBtn'
import { connectToDatabase } from '@/lib/mongoose'
import Event from '@/database/eventModel'
import { cacheLife } from 'next/cache'
import React from 'react'

export const instant = false

const page = async () => {
  'use cache'
  cacheLife('seconds')

  let eventData = []
  
  try {
    await connectToDatabase()
    // Fetch directly from MongoDB
    const events = await Event.find({}).lean()
    
    // Serialize to plain JSON to avoid Mongoose ObjectId errors in Server Components
    eventData = JSON.parse(JSON.stringify(events))
  } catch (error) {
    console.error('Failed to fetch events from database:', error)
    // The build will succeed and render an empty list instead of crashing
  }

  return (
    <section>
      <h1 className='text-center'>The Hub for Every Dev <br/> Event You Can't Miss</h1>
      <p className='text-center mt-5'>You Can Find Hackathons, Meetups, and Conferences, All in One Place</p>

      <ExploreBtn/>

      <div className='mt-20 space-y-3'>
        <h3>Featured Events</h3>

        <ul className='events'>
          {eventData && eventData.length > 0 ? (
            eventData.map(({ time, title, date, image, location, slug, _id }) =>(
              <EventCards 
                key={slug || _id} 
                title={title} 
                image={image} 
                slug={slug} 
                time={time} 
                date={date} 
                location={location}  
              />
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>
      </div>
    </section>
  )
}

export default page