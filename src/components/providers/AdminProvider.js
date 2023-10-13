'use client'
import { axiosClient } from '@/lib/axios'
import { useState } from 'react'
import { AdminContext } from '@/context/AdminContext'

export const AdminProvider = ({ children, token }) => {
  const [courses, setCourses] = useState({ data: [], loading: false })
  const [contents, setContents] = useState({ data: [], loading: false })
  const [classes, setClasses] = useState({ data: [], loading: false })

  const bearer = `Bearer ${token}`

  const getCourses = async (page = 0) => {
    const { data } = await axiosClient.get(`/admin/courses?page=${page}`, { headers: { Authorization: bearer } })
    setCourses(prev => ({ ...data, loading: false }))
  }

  const getContents = async (id) => {
    const { data } = await axiosClient.get(`/user/course/contents/${id}`, { headers: { Authorization: bearer } })
    setContents(prev => ({ ...prev, data: data.data, loading: false }))
  }

  const setStoreCourses = (coursesToSet) => {
    setCourses(prev => ({ ...prev, data: coursesToSet }))
  }

  const setStoreContents = (contentToSet) => {
    setContents(prev => ({ ...prev, data: contentToSet }))
  }

  const getClasses = async (page = 0) => {
    const { data } = await axiosClient.get(`/user/classes?page=${page}`, { headers: { Authorization: bearer } })
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
