import { TabClient } from '@/components/tabs/TabClient'
import { ContentsClass } from './ContentsClass'
import { ComplementariesWrap } from './ComplementariesWrap'

const OneClassPage = ({ params }) => {
  const tabs = [{
    label: 'Sobre esta clase',
    content: <p>Clase grabadas</p>
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
    label: 'Evaluaciones',
    content: <p>Evaluaciones</p>
  }]

  return (
    <section>
      <TabClient items={tabs} />
    </section>
  )
}

export default OneClassPage
