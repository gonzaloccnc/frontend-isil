import { EvaluationCardDash } from '@/components/EvaluationCardDash'
import { axiosServer } from '@/lib/axios'

export const Evaluations = async ({ idStudent, token, isStudent }) => {
  const { data: evaluations } = await axiosServer.get(`/dashboard/evaluations/${idStudent}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (!isStudent) {
    return (
      <div>
        Solo los alumnos tienen acceso a estos recursos, estamos trabajando para que los profesores puedan visualizarlos
      </div>
    )
  }

  return (
    <div className='flex gap-4 h-full overflow-auto'>
      {
        evaluations.map(ev => (
          <EvaluationCardDash key={ev.idEvaluation + ev.type}
            endDate={ev.endDate}
            file={ev.linkFile}
            startDate={ev.startDate}
            type={ev.type}
          />
        ))
      }
    </div>
  )
}
