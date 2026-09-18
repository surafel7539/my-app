"use client"
import React, { useState } from 'react'
import posthog from 'posthog-js'

const BookingForm = ({ eventId }) => {
    const [email, setEmail] =useState('')
    const [submitted, setSubmitted] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError('')

        posthog.capture('booking_attempted', { eventId })

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId, email }),
            })

            const data = await response.json().catch(() => ({}))

            if (!response.ok) {
                throw new Error(data.message || 'Booking creation failed')
            }

            posthog.capture('booking_succeeded', { eventId })
            setSubmitted(true)
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Booking creation failed'
            posthog.capture('booking_failed', { eventId, error: message })
            setError(message)
        } finally {
            setSubmitting(false)
        }
    }
  return (
    <div id='book-event'>
            {submitted ? (
                <p className='text-sm'>Thank you for signing up</p>
            ):(
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id='email' placeholder='Enter your email address' required />
                    </div>
                    {error && <p className='text-sm text-red-500'>{error}</p>}
                    <button type='submit' className='button-submit' disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</button>
                </form>
            )}
    </div>
  )
}

export default BookingForm
