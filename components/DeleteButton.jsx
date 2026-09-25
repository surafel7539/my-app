'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const DeleteButton = ({slug}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const route = useRouter()
    
  
  const handleDelete = async (e) => {
        e.preventDefault()
        setLoading(true)
       const res = await fetch(`/api/events/${slug}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      
      route.refresh();
    } else {
      const data = await res.json();
      setError(data.error)
    }
        setLoading(false)
    
      }
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={handleDelete}
        disabled={loading}
        className="rounded-md bg-red-600 px-3 cursor-pointer py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50 transition"
      >
        {loading ? 'Deleting...' : 'Delete Event'}
      </button>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}

export default DeleteButton