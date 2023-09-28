import { provider } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const DashboardHomePage = async () => {
  const session = await getServerSession(provider)
  const username = session.user.name.split(' ')[0] + ' ' + session.user.name.split(' ')[2]

  return (
    <>
      <section className='bg-dark-third row-dash-greeting col-dash-greeting rounded-lg p-3 flex gap-3'>
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

      <section className='bg-dark-third rounded-lg p-4'>
        progreso
      </section>

      <section className='bg-dark-third rounded-lg p-4 row-dash-statistics col-dash-statistics'>
        estadisticas
      </section>

      <section className='bg-dark-third rounded-lg p-4'>
        clases del dia
      </section>

      <section className='bg-dark-third rounded-lg p-4'>
        calendario
      </section>

      <section className='bg-dark-third rounded-lg p-4'>
        to do list
      </section>

      <section className='bg-dark-third rounded-lg p-4'>
        foros
      </section>
    </>
  )
}

export default DashboardHomePage
