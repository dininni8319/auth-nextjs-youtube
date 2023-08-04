"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const [ loading, setLoading ] = useState(false)
  const [ buttonDisabled, setButtonDisabled ] = useState(false)
  const [ user, setUser ] = useState({
    email: "",
    password:"",
  })

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 6) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const onLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', user)
      if (response.status === 200) {
        console.log("🚀 ~ file: page.tsx:31 ~ onLogin ~ response:", response.data)
        toast.success('Login Success')
        router.push('/profile') 
      }
      toast.custom(response.data.error || 'Login failed')
    } catch (error: unknown) {
      const errMessage = error.message || 'Login failed'
       toast.error(errMessage)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-center text-2xl">{loading ? "Processing": "Login"}</h1>
       <hr />
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
          disabled={buttonDisabled}
          className="p-2 border text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={onLogin}
        >
          {buttonDisabled ? 'Provide credentials' : "Login" }
        </button>
        <Link href="/signup" className="text-white">Visit Sign up</Link>
        <Toaster />
    </div>
  )
}