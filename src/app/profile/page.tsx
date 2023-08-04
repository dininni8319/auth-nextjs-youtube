"use client"
import axios from "axios"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ProfilePage() {
  const router = useRouter()
  const [data, setData ] = useState('nothing')
  const onLogout = async () => {
     try {
      await axios.get('/api/users/logout')
      toast.success('Logout success')
      router.push('/login')
     } catch (error) {
      toast.error(error.message)
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/profile')
    setData(res.data.data._id)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-center text-2xl">Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className="rounded p-3 bg-green-500">{data === 'nothing' ? "Nothing" :  
        <Link
        href={`/profile/${data}`}
        >
          {data}
          </Link>
        }</h2>
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       onClick={onLogout}
      >Logout</button>
       <button
      className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       onClick={getUserDetails}
      >Get user detail</button>
      <Toaster />
    </div>
  )
}