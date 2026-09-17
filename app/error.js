'use client'

import React from 'react'

const Error = ({ reset }) => {
  return (
    <section id='event'>
      <div className='header'>
        <h1>Something went wrong</h1>
        <p className='mt-2'>We could not load this page. Please try again.</p>
        <button className='button-submit' onClick={() => reset()}>
          Try again
        </button>
      </div>
    </section>
  )
}

export default Error
