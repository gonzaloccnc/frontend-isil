import { UserCourseCard } from '@/components/cards/UserCourseCard'
import { axiosServer } from '@/lib/axios'
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

  const { data } = await axiosServer.get(`/user/course/own/${payload.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  return (
    <>
      <h1 className='mb-5'>Mis cursos</h1>
      <section className='grid grid-cols-2 gap-5'>
        {
          data.lenght === 0 && <h2>No tienes cursos registrados en el periodo</h2>
        }
        {
          data.map(x => (
            <UserCourseCard
              key={x.idCourse}
              credits={x.credits}
              description={x.description}
              id={x.idCourse}
              idStudent={x.idStudent}
              name={x.courseName}
              syllabus={x.syllabus}
            />
          ))
        }
      </section>
    </>
  )
}

export default CoursePage
