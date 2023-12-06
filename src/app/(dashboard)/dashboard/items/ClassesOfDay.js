import { ClassesOfDayDash } from '@/components/ClassesOfDayDash'
import { axiosServer } from '@/lib/axios'

export const ClassesOfDay = async ({ idStudent, token, isStudent }) => {
  const { data: classesOfDay } = await axiosServer.get(`/dashboard/today/classes/${idStudent}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!isStudent) {
    return (
      <div>
        Solo los alumnos tienen acceso a estos recursos, estamos trabajando para que los profesores puedan visualizarlos
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-5 h-full overflow-auto'>
      {
        classesOfDay.map(c => (
          <ClassesOfDayDash
            key={c.nrc}
            startTime={c.startTime}
            endTime={c.endTime}
            linkMeet={c.linkMeet}
            nrc={c.nrc}
          />
        ))
      }
    </div>
  )
}
