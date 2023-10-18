import { axiosServer } from '@/lib/axios'
import { verifyToken } from '@/lib/jwtUtils'
import { cookies } from 'next/headers'

const CalendarPage = async () => {
  const token = cookies().get('token')
  const payload = await verifyToken(token.value)

  if (payload.role === 'ADMIN') {
    return (
      <>
        <h1>No tienes acceso a este recurso</h1>
        <a href='/dashboard' className='border-b border-blue-800'>Volver</a>
      </>
    )
  }

  const { data } = await axiosServer.get(`/user/course/own/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  return (
    <section>
      page
    </section>
  )
}

export default CalendarPage
