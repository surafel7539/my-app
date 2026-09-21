import React from 'react'

const EventsGridSkeleton = ({ count = 4 }) => (
  <ul className="events">
    {Array.from({ length: count }, (_, item) => (
      <li key={item} className="space-y-3">
        <div className="h-[300px] w-full animate-pulse rounded bg-gray-300" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-300" />
      </li>
    ))}
  </ul>
)

export default EventsGridSkeleton
