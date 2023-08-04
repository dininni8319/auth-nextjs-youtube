"use client"

import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from 'react'

export default function VerifyEmailPage() {
  const [token, setToken] = useState('')
  const [verify, setVerify] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerify(true)
    } catch (error) {
      setError(true)
      console.log('Error', error.response.data);
    }
  }
  
  useEffect(() => { 
    const urlToken = window.location.search.split("=")[1];
    setToken(
      urlToken || ''
    )
  },[])

  useEffect(() => { 
  if (token.length > 0) {
    verifyUserEmail()
  }},[token])

  // If the user is already logged in then redirect to the home page
   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-4xl">Verify Email</h1>
          <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

          {verify && (
              <div>
                  <h2 className="text-2xl text-white">Email Verified</h2>
                  <Link className="text-white" href="/login">
                      Login
                  </Link>
              </div>
          )}
          {error && (
              <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>   
              </div>
          )}
      </div>
  )
}