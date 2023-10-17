import { UserProvider } from '@/components/providers/UserProvider'
import { axiosServer } from '@/lib/axios'
import { verifyToken } from '@/lib/jwtUtils'
import { cookies } from 'next/headers'

const UserLayout = async ({ children }) => {
  const token = cookies().get('token')
  const payload = await verifyToken(token.value)
  const path = payload.role === 'PROFESOR' ? 'teacher' : 'student'
  const { data } = await axiosServer.get(`/user/classroom/${path}/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  return (
    <UserProvider initClasses={{ data }}>
      {children}
    </UserProvider>
  )
}

export default UserLayout
