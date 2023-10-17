'use client'
import { Button, Card, CardBody, CardFooter, CardHeader, Tooltip } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { IcoArrowRight } from '../icons/IcoArrowRight'

export const ClassPreviewCard = ({ id, teacher, nrc, hour, endHour, schoolDay, course, linkMeet, campus }) => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader>
        <Tooltip
          content='Ver clase'
          size='sm'
          offset={6}
          color='primary'
          placement='right-end'
        >
          <p
            className='cursor-pointer flex gap-2 items-center text-primary-400'
            onClick={() => { router.push(`/dashboard/classes/${id}`) }}
          >
            {course} - {nrc} ({campus}) <IcoArrowRight />
          </p>
        </Tooltip>
      </CardHeader>
      <CardBody className='flex'>
        <h2>Profesor: {teacher}</h2>
        <h3>Fecha: {schoolDay}, {hour} - {endHour}</h3>
      </CardBody>
      <CardFooter className='flex justify-end'>
        <a
          href={linkMeet}
          target='_blank'
          rel='noreferrer'
        >
          <Button
            color='secondary'
          >
            Ir a la reunión
          </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
