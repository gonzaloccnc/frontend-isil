import { ClassNav } from '@/components/navs/ClassNav'
import { ContentClass } from './ContentClass'
import { cookies } from 'next/headers'

const ClassPage = async () => {
  const token = cookies().get('token')

  return (
    <>
      <ClassNav token={token.value} />
      <ContentClass token={token.value} />
    </>
  )
}

export default ClassPage
