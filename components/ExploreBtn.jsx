"use client"

import posthog from 'posthog-js'
import React from 'react'

const ExploreBtn = () => {
  const handleExploreClick = () => {
    console.log('Click')

    if (process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN && process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      posthog.capture('explore_events_clicked', {
        source: 'hero',
      })
    }
  }

  return (
    <button type='button' id='explore-btn' className='mt-7 mx-auto' onClick={handleExploreClick} >
        <a href="#events">
            Explore Events
            <img src='/icons/arrow-down.svg' alt='arrow=down' width={24} height={24} />
        </a>
    </button>
  )
}

export default ExploreBtn