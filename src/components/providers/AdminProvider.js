'use client'
import { axiosCLient } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { LoadingAdmin } from './LoadingAdmin'
import { useState } from 'react'
import { AdminContext } from '@/context/AdminContext'

export const AdminProvider = ({ children }) => {
  const [courses, setCourses] = useState({ data: [], loading: false })
  const [contents, setContents] = useState({ data: [], loading: false })
  const [classes, setClasses] = useState({ data: [], loading: false })
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
    const { data } = await axiosCLient.get(`/user/course/contents/${id}`, { headers: { Authorization: bearer } })
    setContents(prev => ({ ...prev, data: data.data, loading: false }))
  }

  const setStoreCourses = (coursesToSet) => {
    setCourses(prev => ({ ...prev, data: coursesToSet }))
  }

  const setStoreContents = (contentToSet) => {
    setContents(prev => ({ ...prev, data: contentToSet }))
  }

  const getClasses = async (page = 0) => {
    const { data } = await axiosCLient.get(`/user/classes?page=${page}`, { headers: { Authorization: bearer } })
    setClasses(prev => ({ ...data, loading: false }))
  }

  const setStoreClasses = (classesToSet) => {
    setClasses(prev => ({ ...prev, data: classesToSet }))
  }

  return (
    <AdminContext.Provider value={{ courses, classes, contents, getContents, getCourses, getClasses, setStoreCourses, setStoreContents, setStoreClasses }}>
      {children}
    </AdminContext.Provider>
  )
}
