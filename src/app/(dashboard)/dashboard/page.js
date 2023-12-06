import { provider } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { ClassesOfDay } from './items/ClassesOfDay'
import { Suspense } from 'react'
import { Calendar } from './items/Calendar'
import { Evaluations } from './items/Evaluations'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwtUtils'

const DashboardHomePage = async () => {
  const token = cookies().get('token')
  const [payload, session] = await Promise.all([
    verifyToken(token.value),
    getServerSession(provider)
  ])

  const username = session.user.name.split(' ')[0] + ' ' + session.user.name.split(' ')[2]

  return (
    <section className='grid grid-cols-3 grid-rows-[200px_350px_350px] gap-4'>
      <section className='bg-dark-secondary row-dash-greeting col-dash-greeting rounded-lg p-3 flex gap-3'>
        <div className='grid place-content-center'>
          <img
            src='/images/insight.png'
            alt='Idea'
            className='w-[150px]'
          />
        </div>

        <div className='flex flex-col justify-center'>
          <h1 className='mb-5' >Hola {username} 🤩</h1>
          <p>
            Bienvenido a ISIL+! Estudia en cualquier momento y en cualquier lugar con nosotros y descubre
            lo desconocido.
          </p>
        </div>

        <div className='grid place-content-center'>
          <img
            src='/images/astronaut.png'
            alt='Astronauta'
            className='w-[150px] translate-y-0 animate-float'
          />
        </div>
      </section>

      <section className='bg-dark-secondary rounded-lg p-4'>
        <div>
          Estamos trabajando para que pueda ver esta funcionalizadad en su dashboard
        </div>
      </section>

      <section className='bg-dark-secondary rounded-lg p-4 row-dash-statistics col-dash-statistics'>
        <Suspense fallback={<div>loading</div>}>
          <Evaluations
            idStudent={payload.id}
            token={token.value}
            isStudent={payload.role === 'ALUMNO'}
          />
        </Suspense>
      </section>

      <section className='bg-dark-secondary rounded-lg p-4'>
        <Suspense fallback={<div>loading</div>}>
          <ClassesOfDay
            idStudent={payload.id}
            token={token.value}
            isStudent={payload.role === 'ALUMNO'}
          />
        </Suspense>
      </section>

      <section className='bg-dark-secondary rounded-lg p-4'>
        <Suspense fallback={<div>loading</div>}>
          <Calendar />
        </Suspense>
      </section>

      <section className='bg-dark-secondary rounded-lg p-4'>
        <div>
          Estamos trabajando para que pueda ver esta funcionalizadad en su dashboard
        </div>
      </section>

      <section className='bg-dark-secondary rounded-lg p-4'>
        <div>
          Estamos trabajando para que pueda ver esta funcionalizadad en su dashboard
        </div>
      </section>
    </section>
  )
}

export default DashboardHomePage
