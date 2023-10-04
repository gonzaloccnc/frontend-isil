'use client'
import { useSession } from 'next-auth/react'
import { UserNav } from './UserNav'
import { AdminNav } from './AdminNav'
import { LoadingNav } from './LoadingNav'

export const AsideNav = () => {
  const { data } = useSession()
  const role = data?.user.role

  return (
    <aside className='w-20 h-screen fixed top-0 left-0 bg-dark-primary p-[15px] z-50 border-r border-[rgba(255,255,255,0.3)]'>
      <a href='/dashboard'>
        <img src='/favicon.ico' className='w-[50px] aspect-square rounded-lg' />
      </a>
      {
        data == null
          ? <LoadingNav />
          : role === 'ADMIN'
            ? <AdminNav />
            : <UserNav role={role} />
      }
    </aside>
  )
}
