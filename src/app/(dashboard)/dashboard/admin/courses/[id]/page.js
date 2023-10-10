import { AccordionW } from '@/components/accordion/AccordionW'
import { ContentNav } from '@/components/navs/ContentNav'

const CourseIdPage = ({ params }) => {
  return (
    <section>
      <ContentNav id={params.id} />
      <AccordionW id={params.id} />
    </section>
  )
}

export default CourseIdPage
