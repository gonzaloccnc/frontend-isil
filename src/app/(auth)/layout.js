import { getServerSession } from 'next-auth'
import { provider } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }) => {
  const session = await getServerSession(provider)
  if (session) return redirect('/dashboard')

  return (
    <main className='flex h-screen w-full'>
      <section className='flex h-screen w-3/5 bg-auth-image bg-center bg-cover bg-no-repeat' />
      <section className='w-2/5 h-full px-10 py-[60px] bg-auth overflow-y-auto'>
        {children}
      </section>
    </main>
  )
}

export default AuthLayout
