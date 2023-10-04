import { CoursesNav } from '@/components/navs/CoursesNav'
import { ContentCourse } from './ContentCourse'

const CoursePage = async () => {
  return (
    <section>
      <CoursesNav />
      <ContentCourse />
    </section>
  )
}

export default CoursePage
