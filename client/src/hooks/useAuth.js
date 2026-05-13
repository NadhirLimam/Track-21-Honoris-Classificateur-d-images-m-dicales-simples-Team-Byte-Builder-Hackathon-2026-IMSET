// src/hooks/useAuth.js
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import API from '../lib/api'

export function useAuth() {
  const navigate  = useNavigate()
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const { data } = await API.post('/api/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const demoLogin = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await API.post('/api/auth/demo-login')
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      toast.success('Demo mode activated!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Demo login failed')
    } finally {
      setLoading(false)
    }
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
    toast('Logged out')
  }, [navigate])

  const isAuthenticated = () => !!localStorage.getItem('token')

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem('user'))
    } catch {
      return null
    }
  }

  return { login, demoLogin, logout, loading, isAuthenticated, getUser }
}
