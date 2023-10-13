import { CoursesNav } from '@/components/navs/CoursesNav'
import { cookies } from 'next/headers'
import { axiosServer } from '@/lib/axios'
import { ContentCourse } from '@/app/(dashboard)/dashboard/admin/courses/ContentCourse'

const CoursePage = async () => {
  const token = cookies().get('token')

  const { data: courses } = await axiosServer.get('/admin/courses?page=0', {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  return (
    <section>
      <CoursesNav pageable={courses} token={token.value}/>
      <ContentCourse coursesServer={courses} />
    </section>
  )
}

export default CoursePage
