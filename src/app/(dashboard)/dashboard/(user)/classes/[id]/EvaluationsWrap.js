'use client'

import EvaluationCard from '@/components/cards/EvaluationCard'
import { EvaluationForm } from '@/components/forms/EvaluationForm'
import { FormModal } from '@/components/modals/FormModal'
import { axiosClient, axiosClientSameServer } from '@/lib/axios'
import { Button, useDisclosure } from '@nextui-org/react'
import { format } from 'date-fns'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const EvaluationsWrap = () => {
  const { id } = useParams()
  const { data } = useSession()
  const { onClose, onOpen, isOpen, onOpenChange } = useDisclosure()
  const formRef = useRef(null)
  const [evaluations, setEvaluations] = useState([])

  const token = data?.user?.accessToken
  const role = data?.user?.role
  const renderEvaluations = role === 'ALUMNO' ? evaluations.filter(x => x.isVisible) : evaluations

  const onSuccess = async () => {
    const formData = new FormData(formRef.current)
    const body = {
      idClassroom: id
    }

    formData.forEach((x, y) => {
      body[y] = x
      if (y.includes('Date')) {
        const datetime = new Date(x)
        body[y] = format(datetime, 'yyyy-MM-dd HH:mm:ss')
      }
      if (y === 'isVisible' || y === 'itsGroup') body[y] = parseInt(x)
    })

    try {
      const { data } = await axiosClientSameServer.post('/file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      body.linkFile = data.data

      const { data: evaluation } = await axiosClient.post('/user/evaluations', body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setEvaluations(prev => ([...prev, evaluation]))
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    axiosClient.get(`/user/evaluations/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(({ data }) => {
      setEvaluations(data)
    }).catch(() => { })
  }, [])

  return (
    <>
      <section>
        <div className='flex justify-end mb-4'>
          {
            role === 'PROFESOR' &&
            <Button color='primary' onPress={onOpen}>
              Crear examen
            </Button>
          }
        </div>
        <div className='grid grid-cols-3 gap-2'>
          {
            !renderEvaluations.length
              ? <p>No hay evaluaciones asignadas aún!</p>
              : renderEvaluations.map(x => {
                return (
                  <EvaluationCard
                    role={role}
                    key={x.idEvaluation}
                    startDate={x.startDate}
                    endDate={x.endDate}
                    file={x.linkFile}
                    isVisible={x.isVisible}
                    itsGroup={x.itsGroup}
                    type={x.type}
                  />
                )
              })
          }
        </div>
      </section>

      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Crear examen'
        size='3xl'
        className=''
        scroll='inside'
      >
        <EvaluationForm
          evals={evaluations}
          onClose={onClose}
          formRef={formRef}
          onSuccess={onSuccess}
        />
      </FormModal>
    </>
  )
}

export { EvaluationsWrap }
