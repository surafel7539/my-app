import React from 'react'

const Loading = () => {
  return (
    <section>
      <div className="mx-auto h-10 w-3/4 animate-pulse rounded bg-gray-300" />
      <div className="mx-auto mt-5 h-5 w-2/3 animate-pulse rounded bg-gray-300" />

      <div className="mt-20 space-y-3">
        <div className="h-7 w-40 animate-pulse rounded bg-gray-300" />

        <ul className="events">
          {[0, 1, 2, 3].map((item) => (
            <li key={item} className="space-y-3">
              <div className="h-[300px] w-full animate-pulse rounded bg-gray-300" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-300" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-gray-300" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Loading
