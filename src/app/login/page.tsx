"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { axios } from "axios"

export default function Login(params:type) {
  const [ user, setUser ] = useState({
    email: "",
    password:"",
  })

  const onLogin = async () => {

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-white text-center text-2xl">Login</h1>
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
          className="p-2 border text-white border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
          onClick={onLogin}
        >
          Login here
        </button>
        <Link href="/signup" className="text-white">Visit Sign up</Link>
    </div>
  )
}