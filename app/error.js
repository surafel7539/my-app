'use client'

import React from 'react'

const Error = ({ error, reset }) => {
  return (
    <section className="flex flex-col items-center gap-5 text-center">
      <h1>Something went wrong</h1>
      <p>We could not load this page. Please try again.</p>
      <button type="button" className="pill" onClick={() => reset()}>
        Try again
      </button>
    </section>
  )
}

export default Error
