import React, { useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth, signInWithGoogle } from "../firebase";

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login, loginWithGoogle } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  async function handleGoogleSubmit() {

    try {
      setError("")
      setLoading(true)
      await loginWithGoogle()
      history.push("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
    <h2>Log In</h2>
    {error && {error}}
    <form onSubmit={handleSubmit}>
      <div>
        Email : <input type="email" ref={emailRef} required />
      </div>
      <div>
        Password : <input type="password" ref={passwordRef} required />
      </div>
      <div>
        <button type="submit" disabled={loading}>Sign In</button>
      </div>
    </form>
    <div>
      <button type="button" disabled={loading} onClick={ handleGoogleSubmit }>Sign In Using Google</button>
    </div>

    <div className="w-100 text-center mt-3">
      <Link to="/forgot-password">Forgot Password?</Link>
    </div>
    <div className="w-100 text-center mt-2">
      Need an account? <Link to="/signup">Sign Up</Link>
    </div>


    </>
  )
}
