'use client'
import { Button, Card, CardBody, CardFooter, Chip, useDisclosure } from '@nextui-org/react'
import React, { useRef } from 'react'
import { PdfModal } from '../modals/PdfModal'
import { FormModal } from '../modals/FormModal'
import { EvaluationForm } from '../forms/EvaluationForm'
import { format } from 'date-fns'
import { axiosClient, axiosClientSameServer } from '@/lib/axios'
import { useParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

const EvaluationCard = ({ idEvaluation, role, type, startDate, endDate, file, isVisible, itsGroup, setEvaluations }) => {
  const { id } = useParams()
  const { data } = useSession()
  const token = data?.user?.accessToken
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenUpload, onOpen: onOpenUpload, onOpenChange: onOpenChageUpload, onClose: onCloseUpload } = useDisclosure()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onOpenChange: onOpenChageUpdate, onClose: onCloseUpdate } = useDisclosure()
  const formRefUpdate = useRef(null)

  const onUpdate = async () => {
    const formData = new FormData(formRefUpdate.current)
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

    body.type = type

    try {
      if (body.linkFile.size === 0) {
        body.linkFile = file
      } else {
        const { data } = await axiosClientSameServer.post('/file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        body.linkFile = data.data
      }

      const { data: evaluation } = await axiosClient.put(`/user/evaluations/${idEvaluation}`, body, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setEvaluations(prev => {
        return [...prev.filter(x => x.idEvaluation !== evaluation.idEvaluation), evaluation]
      })
    } catch (ex) {
      console.log(ex)
    }
  }

  return (
    <>
      <Card>
        <CardBody>
          <div className='flex flex-wrap gap-2'>
            <Chip>
              {type}
            </Chip>
            <Chip>
              Fecha de inicio: {startDate}
            </Chip>
            <Chip>
              Fecha de expiración: {endDate}
            </Chip>

            {
              role === 'PROFESOR'
                ? <Chip>
                  Visibilidad: {isVisible ? 'Visible a los estudiantes' : 'No visible a los estudiantes'}
                </Chip>
                : null
            }

            <Chip>
              Tipo de entrega: {itsGroup ? 'Grupal' : 'Individual'}
            </Chip>
          </div>
        </CardBody>
        <CardFooter className='flex items-center gap-2'>
          <Button color='primary' onPress={onOpen}>
            Ver documento
          </Button>
          {
            role === 'PROFESOR'
              ? <div className='flex items-center justify-center gap-2'>
                <Button color='secondary'>
                  Ver entregas
                </Button>
                <Button
                  color='success'
                  className='text-white'
                  onPress={onOpenUpdate}
                >
                  Actualizar
                </Button>
              </div>
              : <Button color='secondary' onPress={onOpenUpload}>
                Subir entrega
              </Button>
          }
        </CardFooter>
      </Card>

      <PdfModal
        file={file}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <FormModal
        key='update-eval'
        isOpen={isOpenUpdate}
        onOpenChange={onOpenChageUpdate}
        title={`Actualizar evaluacion ${type}`}
        className=''
        size='3xl'
        scroll='inside'
      >
        <EvaluationForm
          isUpdated
          formRef={formRefUpdate}
          onClose={onCloseUpdate}
          onSuccess={onUpdate}
          initForm={
            {
              linkFile: '',
              startDate,
              endDate,
              type,
              isVisible: '' + isVisible,
              itsGroup: '' + itsGroup
            }
          }
        />
      </FormModal>

      <FormModal
        key='upload-eval'
        isOpen={isOpenUpload}
        onOpenChange={onOpenChageUpload}
        title='Subir mi entrega'
      >
        <div onClick={onCloseUpload}>close</div>
      </FormModal>
    </>
  )
}

export default EvaluationCard
