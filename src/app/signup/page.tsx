"use client"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'

export default function SignupPage() {
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
  const [ user, setUser ] = useState({
    email: "",
    password:"",
    username: "",
  })

  const [ buttonDisabled, setButtonDisabled ] = useState(false)

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 6 && user.username.length > 0) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])
  const onSignup = async () => {
    setLoading(true)
    try {
      toast.success('Sign Up Success')
      const response = await axios.post('/api/users/signup', user)
      console.log("🚀 ~ file: page.tsx:31 ~ onSignup ~ response:", response.data)
      setLoading(false)
      router.push('/login')
    } catch (error) {
      const errMessage = error.message || 'Sign up failed'
       toast.error(errMessage)
       setLoading(false)
    } finally {
      setLoading(false)
    }
  } 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-center text-2xl">{loading ? "Processing" : 'Sign Up'}</h1>
       <hr />
      <label htmlFor="username">Username</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder="Username"
       />
       <label htmlFor="email">Email</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder="email"
       />
       <label htmlFor="password">Password</label>
      <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder="password"
       />
        <button
          className="p-2 border text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Sign up" : "Signup"}
        </button>
        <Link href="/login" className="text-white">Visit login</Link>
        <Toaster />
    </div>
  )
}