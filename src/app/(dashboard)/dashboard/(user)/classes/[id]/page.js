import { TabClient } from '@/components/tabs/TabClient'
import { ContentsClass } from './ContentsClass'
import { ComplementariesWrap } from './ComplementariesWrap'
import GroupsWrap from './GroupsWrap'
import { axiosServer } from '@/lib/axios'
import { cookies } from 'next/headers'
import AboutClass from './AboutClass'
import { EvaluationsWrap } from './EvaluationsWrap'

const OneClassPage = async ({ params }) => {
  const token = cookies().get('token')
  const { data: members } = await axiosServer.get(`/user/classroom/members/${params.id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  const tabs = [{
    label: 'Sobre esta clase',
    content: <AboutClass />
  }, {
    label: 'Clases grabadas',
    content: <p>Clase grabadas</p>
  }, {
    label: 'Contenidos',
    content: <ContentsClass />
  }, {
    label: 'Complementarios',
    content: <ComplementariesWrap />
  }, {
    label: 'Grupos',
    content: <GroupsWrap members={members} />
  }, {
    label: 'Evaluaciones',
    content: <EvaluationsWrap />
  }]

  return (
    <section>
      <TabClient items={tabs} />
    </section>
  )
}

export default OneClassPage
