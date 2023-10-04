'use client'
import { axiosCLient } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { LoadingAdmin } from './LoadingAdmin'
import { useState } from 'react'
import { AdminContext } from '@/context/AdminContext'

export const AdminProvider = ({ children }) => {
  const [courses, setCourses] = useState({ data: [], loading: false })
  const { data } = useSession()

  if (!data) {
    return <LoadingAdmin />
  }

  if (data.user.role !== 'ADMIN') {
    return <h1>No tienes accesso a estos recursos</h1>
  }

  const bearer = `Bearer ${data.user.accessToken}`

  const getCourses = async (page = 0) => {
    const { data } = await axiosCLient.get(`/admin/courses?page=${page}`, { headers: { Authorization: bearer } })
    setCourses(prev => ({ ...data, loading: false }))
  }

  const getContents = async (id) => {
    return await axiosCLient.get(`/admin/courses/contents/${id}`, { headers: { Authorization: bearer } })
  }

  return (
    <AdminContext.Provider value={{ courses, getContents, getCourses }}>
      {children}
    </AdminContext.Provider>
  )
}
