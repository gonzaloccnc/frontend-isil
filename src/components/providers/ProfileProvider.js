'use client'
import { ProfileContext } from '@/context/ProfileContext'
import { useContext, useState } from 'react'

export const ProfileProvider = ({ children, init }) => {
  const [profile, setProfile] = useState(init)
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)
