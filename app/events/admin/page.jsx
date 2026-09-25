'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { verifyPassword } from '@/lib/actions/verifyPassword'



const page = () => {
  const route = useRouter()
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(!password){
      setError('Password is required')
    }
    try {
      const {success, error} = await verifyPassword(password)

      if(!success){
        setError(error)
      }
      if(success){
        route.push('/events/admin/admindashboard')
      }
      
    } finally{
      setLoading(false)
    }
     
  }
  return (
    <div id='book-event' className='flex h-screen w-full  items-center justify-center '>
  <form onSubmit={handleSubmit} className='flex w-200 max-w-sm flex-col gap-4 rounded-xl  bg-[#182830] border border-[#59deca] p-6 shadow-md'>
    <div className='flex flex-col gap-2'>
      <label htmlFor='password' className='text-sm font-medium'>
        Password
      </label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id='password'
        placeholder='Enter your assigned password'
        className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
              error
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
      />
    </div>
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    <button type='submit' disabled={loading} className='button-submit w-full'>
      {loading ? 'Checking...' : 'Submit'}
    </button>
  </form>
</div>
    
  )
}

export default page