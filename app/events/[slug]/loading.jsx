
import React from 'react'

const Loading = () => {
  return (
    <section id="event">
      <div className="header">
        <div className="h-10 w-3/4 animate-pulse rounded bg-gray-300" />
        <div className="mt-4 h-5 w-full animate-pulse rounded bg-gray-300" />
        <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-gray-300" />
      </div>

      <div className="details">
        <div className="content">
          <div className="h-[500px] w-full animate-pulse rounded bg-gray-300" />

          <div className="mt-8 space-y-3">
            <div className="h-7 w-32 animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-full animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-gray-300" />
          </div>

          <div className="mt-8 space-y-4">
            <div className="h-7 w-40 animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-48 animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-48 animate-pulse rounded bg-gray-300" />
            <div className="h-5 w-64 animate-pulse rounded bg-gray-300" />
          </div>
        </div>

        <aside className="booking">
          <div className="signup-card">
            <div className="h-7 w-40 animate-pulse rounded bg-gray-300" />
            <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-300" />
            <div className="mt-6 h-12 w-full animate-pulse rounded bg-gray-300" />
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Loading
