'use client'
import { CourseCard } from '@/components/cards/CourseCard'
import { useAdminContext } from '@/hooks/useAdminContext'
import { useEffect } from 'react'

export const ContentCourse = () => {
  const { courses, getCourses } = useAdminContext()

  if (courses.loading) {
    return <h1>loading</h1>
  }

  useEffect(() => {
    getCourses()
  }, [])

  return (
    <section className='w-full grid grid-cols-3 gap-4 mt-5'>
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
  )
}
