'use client'

import { useSession } from 'next-auth/react'
import { UserNav } from './UserNav'
import { AdminNav } from './AdminNav'

export const AsideNav = () => {
  const { data } = useSession()
  const role = data?.user.role

  return (
    <aside className='w-20 h-screen fixed top-0 left-0 bg-dark-secondary p-[15px] z-50'>
      <a href='/dashboard'>
        <img src='../favicon.ico' className='w-[50px] aspect-square rounded-lg' />
      </a>
      {
        role === 'ADMIN'
          ? <AdminNav />
          : <UserNav role={role} />
      }
    </aside>
  )
}
