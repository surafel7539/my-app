"use client"

import React, { useState } from 'react'

const PLACEHOLDER = '/images/event-placeholder.svg'

const EventPoster = ({ src, alt, width, height, className }) => {
  const [failed, setFailed] = useState(false)

  return (
    <img
      src={failed || !src ? PLACEHOLDER : src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

export default EventPoster
