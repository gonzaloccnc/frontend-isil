import { TopNav } from '@/components/navs/TopNav'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwtUtils'
import { AdminNav } from '@/components/navs/AdminNav'
import { UserNav } from '@/components/navs/UserNav'

const DashboardLayout = async ({ children }) => {
  const token = cookies().get('token')
  const data = await verifyToken(token.value)

  return (
    <>
      <aside className='w-20 h-screen fixed top-0 left-0 bg-dark-primary p-[15px] z-50 border-r border-[rgba(255,255,255,0.3)]'>
        <a href='/dashboard'>
          <img src='/favicon.ico' className='w-[50px] aspect-square rounded-lg' />
        </a>
        {
          data.role === 'ADMIN'
            ? <AdminNav />
            : <UserNav role={data.role} />
        }
      </aside>
      <TopNav data={data} />
      <main className='absolute top-20 left-20 w-[calc(100%_-_80px)] h-auto py-5 px-8'>
        {children}
      </main>
    </>
  )
}

export default DashboardLayout
