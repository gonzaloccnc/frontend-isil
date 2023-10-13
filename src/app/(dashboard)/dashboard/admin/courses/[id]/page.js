import { AccordionW } from '@/components/accordion/AccordionW'
import { ContentNav } from '@/components/navs/ContentNav'
import { axiosServer } from '@/lib/axios'
import { cookies } from 'next/headers'

const CourseIdPage = async ({ params }) => {
  const token = cookies().get('token')
  const { data: course } = await axiosServer.get(`/admin/courses/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  return (
    <section>
      <ContentNav id={params.id} course={course.data} />
      <AccordionW id={params.id} />
    </section>
  )
}

export default CourseIdPage
