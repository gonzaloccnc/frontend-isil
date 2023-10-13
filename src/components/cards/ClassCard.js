'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, useDisclosure } from '@nextui-org/react'
import { useRef } from 'react'
import { useAdminContext } from '@/hooks/useAdminContext'
import { FormModal } from '../modals/FormModal'
import { axiosClient } from '@/lib/axios'
import { ClassForm } from '../forms/ClassForm'
import { IconGroup } from '../icons/IconGroup'
import { IconClock } from '../icons/IconClock'
import Home from '../icons/Home'
import { IconTeach } from '../icons/IconTeach'
import IconCode from '../icons/IconCode'
import { IconBookmark } from '../icons/IconBookmark'
import { IconCalendarDue } from '../icons/IconCalendarDue'

const modalities = [{
  text: 'VIRTUAL',
  value: 1
}, {
  text: 'REMOTO',
  value: 2
}, {
  text: 'SEMIREMOTO',
  value: 3
}, {
  text: 'PRESENCIAL',
  value: 4
}]

export const ClassCard = ({ token, title, schoolDay, linkMeet, startDate, endDate, idTeacher, idCourse, maxMembers, nrc, startTime, endTime, modality, day, meet, totalHours, campus, period, teacher, max, idClass }) => {
  const { setStoreClasses, classes } = useAdminContext()
  const formRef = useRef(null)
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const bearer = token
  const modalityTo = modalities.find(x => x.text === modality) ?? { value: 1 }

  const handleUpdate = async () => {
    const form = new FormData(formRef.current)
    const classEntity = {}
    form.forEach((x, y) => {
      if (y === 'idClassroom') return
      classEntity[y] = x
    })

    try {
      const { data: classUpdate } = await axiosClient.patch(`/admin/classes/${idClass}`, classEntity, {
        headers: {
          Authorization: 'Bearer ' + bearer
        }
      })

      const lessThis = classes.data.filter(x => x.idClassroom !== idClass)
      setStoreClasses([classUpdate.data, ...lessThis])
    } catch (er) {
    }
  }

  return (
    <>
      <Card className='py-4 bg-dark-secondary'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start gap-2'>
          <p
            className='text-tiny uppercase font-bold flex items-center gap-2 cursor-pointer text-primary-500'
          >
            {title}
          </p>
        </CardHeader>
        <CardBody className='overflow-visible py-2'>
          <div className='flex items-center flex-wrap gap-2'>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <IconClock /> Hora de inicio: {startTime} - {day}
            </Chip>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <IconClock /> Hora final: {endTime} - {day}
            </Chip>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <IconCode /> NRC: {nrc}
            </Chip>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <IconGroup /> Incripción maxima: {max}
            </Chip>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <IconTeach /> Profesor: {teacher}
            </Chip>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <IconBookmark /> Modalidad: {modality}
            </Chip>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <Home /> Campus: {campus}
            </Chip>
            <Chip classNames={{ content: 'flex items-center gap-1' }}>
              <IconCalendarDue /> Periodo: {period}
            </Chip>
          </div>
        </CardBody>
        <CardFooter className='flex gap-2 items-center'>
          <Button
            variant='bordered'
            color='primary'
            className='text-white'
            onPress={onOpen}
          >
            Actualizar
          </Button>
          <a
            href={meet}
            target='_blank'
            rel='noreferrer'
          >
            <Button
              variant='bordered'
              color='secondary'
              className='text-white'
            >
              Ir a reunion
            </Button>
          </a>
        </CardFooter>
      </Card>
      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={`Actualizar clase "${title}"`}
        className=''
        size='3xl'
        scroll='inside'
      >
        <ClassForm
          formRef={formRef}
          idClass={idClass}
          onClose={onClose}
          isUpdatable
          initForm={{
            nrc,
            schoolDay,
            startTime,
            endTime,
            linkMeet,
            campus,
            period,
            startDate,
            endDate,
            idTeacher,
            idCourse,
            totalHours: totalHours + '',
            modality: modalityTo.value + '',
            maxMembers
          }}
          onSuccess={handleUpdate}
        />
      </FormModal>
    </>)
}
