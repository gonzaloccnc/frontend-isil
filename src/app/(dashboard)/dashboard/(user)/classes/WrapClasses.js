'use client'
import { ClassPreviewCard } from '@/components/cards/ClassPreviewCard'
import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'

export const WrapClasses = () => {
  const { classes } = useContext(UserContext)

  return (
    <section className='grid grid-cols-2 gap-4'>
      {
        classes.map(x => (
          <ClassPreviewCard
            key={x.idClassroom}
            course={x.courseName}
            hour={x.startTime.slice(0, -3)}
            endHour={x.endTime.slice(0, -3)}
            schoolDay={x.schoolDay}
            linkMeet={x.linkMeet}
            nrc={x.nrc}
            campus={x.campus}
            id={x.idClassroom}
            teacher={x.teacherFirstname + ', ' + x.teacherSurnames}
          />
        ))
      }
    </section>
  )
}
