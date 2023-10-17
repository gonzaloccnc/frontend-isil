import { verifyToken } from '@/lib/jwtUtils'
import { cookies } from 'next/headers'

const CoursePage = async () => {
  const token = cookies().get('token')
  const payload = await verifyToken(token.value)

  if (payload.role !== 'ALUMNO') {
    return (
      <>
        <h1>No tienes acceso a este recurso</h1>
        <a href='/dashboard' className='border-b border-blue-800'>Volver</a>
      </>
    )
  }

  return (
    <div>Course page</div>
  )
}

export default CoursePage
