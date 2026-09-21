import EventsGridSkeleton from '@/components/EventsGridSkeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="mt-20 space-y-3">
      <div className="h-7 w-44 animate-pulse rounded bg-gray-300" />
      <EventsGridSkeleton />
    </div>
  )
}

export default Loading
