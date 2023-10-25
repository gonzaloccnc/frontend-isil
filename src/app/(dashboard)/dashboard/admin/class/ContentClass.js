'use client'
import { ClassCard } from '@/components/cards/ClassCard'
import { useAdminContext } from '@/hooks/useAdminContext'
import { useEffect } from 'react'

export const ContentClass = ({ token }) => {
  const { classes, getClasses } = useAdminContext()

  if (classes.loading) {
    return <h1>loading</h1>
  }

  useEffect(() => {
    getClasses()
  }, [])

  return (
    <>
      {
        classes?.data.length !== 0
          ? <section className='w-full grid grid-cols-2 gap-4 mt-5'>
            {
              classes?.data.map(x => (
                <ClassCard
                  key={x.idClassroom}
                  token={token}
                  id={x.idClassroom}
                  title={x.course + ' - ' + x.nrc}
                  campus={x.campus}
                  day={x.schoolDay}
                  hours={x.totalHours}
                  meet={x.linkMeet}
                  max={x.maxMembers}
                  startTime={x.startTime}
                  endTime={x.endTime}
                  nrc={x.nrc}
                  idClass={x.idClassroom}
                  period={x.period}
                  teacher={x.teacher}
                  modality={x.modality}
                  startDate={x.startDate}
                  endDate={x.endDate}
                  linkMeet={x.linkMeet}
                  maxMembers={x.maxMembers}
                  schoolDay={x.schoolDay}
                  totalHours={x.totalHours}
                  idCourse={x.idCourse}
                  idTeacher={x.idTeacher}
                />
              ))
            }
          </section>
          : <h1 className='text-center py-5'>No hay clases disponibles</h1>
      }
    </>
  )
}
