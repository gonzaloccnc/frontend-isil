'use client'
import { CourseCard } from '@/components/cards/CourseCard'
import { useAdminContext } from '@/hooks/useAdminContext'
import { useEffect } from 'react'

export const ContentCourse = ({ coursesServer }) => {
  const { courses, setStoreCoursesInit } = useAdminContext()

  useEffect(() => {
    setStoreCoursesInit(coursesServer)
  }, [])

  return (
    <>
      {
        courses.data.length !== 0
          ? <section className='w-full grid grid-cols-3 gap-4 mt-5'>
            {
              courses?.data.map(x => (
                <CourseCard
                  key={x.idCourse}
                  id={x.idCourse}
                  title={x.courseName}
                  description={x.description}
                  contents={x.contents ?? 16}
                  syllabus={x.syllabus}
                  credits={x.credits}
                />
              ))
            }
          </section>
          : <h1 className='text-center py-5'>No hay cursos disponibles</h1>
      }
    </>
  )
}
