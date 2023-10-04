'use client'
import { Card, CardHeader, CardBody, CardFooter, Button, Chip, Tooltip, useDisclosure } from '@nextui-org/react'
import { IcoArrowRight } from '../icons/IcoArrowRight'
import { useRouter } from 'next/navigation'
import { PdfModal } from '../modals/PdfModal'
import { WarningModal } from '../modals/WarningModal'
import { axiosCLient } from '@/lib/axios'
import { useSession } from 'next-auth/react'

export const CourseCard = ({ id, title, description, syllabus, contents, credits }) => {
  const { data } = useSession()
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure()
  const bearer = 'Bearer ' + data.user.accessToken

  const handleDelete = async () => {
    await axiosCLient.post('/admin/courses', null, {
      headers: { Authorization: bearer }
    })
  }

  return (
    <>
      <Card className='py-4 bg-dark-secondary'>
        <CardHeader className='pb-0 pt-2 px-4 flex-col items-start gap-2'>
          <Tooltip
            content='Ir al curso'
            key='right-end-ver'
            placement='right-end'
            offset={6}
            color='primary'
          >
            <p
              className='text-tiny uppercase font-bold flex items-center gap-2 cursor-pointer'
              onClick={() => { router.push(`/dashboard/admin/courses/${id}`) }}
            >
              {title} <IcoArrowRight />
            </p>
          </Tooltip>
          <div className='flex items-center gap-2'>
            <Chip>
              {contents} / 16 contenidos
            </Chip>
            <Chip>
              {credits} creditos
            </Chip>
          </div>
        </CardHeader>
        <CardBody className='overflow-visible py-2'>
          <p>{description}</p>
        </CardBody>
        <CardFooter className='flex gap-2 items-center'>
          <Button color='primary' onPress={onOpen}>
            Ver documento
          </Button>
          <Button color='success' className='text-white' >
            Actualizar
          </Button>
          <Button color='danger' onPress={onOpenDelete}>
            Eliminar
          </Button>
        </CardFooter>
      </Card>
      <PdfModal
        file={syllabus}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <WarningModal
        isOpen={isOpenDelete}
        onOpenChange={onOpenChangeDelete}
        onDelete={handleDelete}
        title={`Estas seguro de eliminar "${title}"`}
      />
    </>
  )
}
