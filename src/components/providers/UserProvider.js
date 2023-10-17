'use client'
import { UserContext } from '@/context/UserContext'
import { axiosClient } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { LoadingAdmin } from './LoadingAdmin'

export const UserProvider = ({ children, initClasses }) => {
  const [classes, setClasses] = useState(initClasses.data)
  const [complementaries, setComplementaries] = useState([])
  const { data } = useSession()

  if (!data) {
    return <LoadingAdmin />
  }

  if (data?.user.role === 'ADMIN') {
    return <h1>No tienes acceso a este recurso</h1>
  }

  const token = data?.user?.accessToken
  const path = data?.user?.role === 'PROFESOR' ? 'teacher' : 'student'
  const id = data?.user?.id
  const role = data?.user?.role

  const fetchClasses = async () => {
    const { data: classes } = await axiosClient.get(`/user/classroom/${path}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setClasses(classes)
  }

  const fetchComplementaries = async (idClass) => {
    const { data: complementariesData } = await axiosClient.get(`/user/course/complementaries/${idClass}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setComplementaries(complementariesData)
  }

  const settingComplementaries = (compl) => {
    setComplementaries(prev => ([...prev, compl]))
  }

  const setAllComplementaries = (complementariesList) => {
    setComplementaries(complementariesList)
  }

  return (
    <UserContext.Provider value={{ role, classes, complementaries, fetchClasses, fetchComplementaries, settingComplementaries, setAllComplementaries }}>
      {children}
    </UserContext.Provider>
  )
}
