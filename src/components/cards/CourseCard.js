'use client'
import { Card, CardHeader, CardBody, CardFooter, Chip, Tooltip, useDisclosure } from '@nextui-org/react'
import { IcoArrowRight } from '../icons/IcoArrowRight'
import { useRouter } from 'next/navigation'
import { PdfModal } from '../modals/PdfModal'
import { WarningModal } from '../modals/WarningModal'
import { axiosClient, axiosClientSameServer } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { DropDown } from '../dropdown/DropDown'
import { useMemo, useRef } from 'react'
import { FormModal } from '../modals/FormModal'
import { CourseForm } from '../forms/CourseForm'
import { useAdminContext } from '@/hooks/useAdminContext'

export const CourseCard = ({ id, title, description, syllabus, contents, credits }) => {
  const { setStoreCourses, courses } = useAdminContext()
  const { data } = useSession()
  const formRef = useRef(null)
  const router = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate, onOpenChange: onOpenChangeUpdate } = useDisclosure()
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure()
  const bearer = data?.user.accessToken
  const courseActions = useMemo(() => {
    return [{
      label: 'Ver documento',
      color: 'primary',
      onClick: onOpen
    }, {
      label: 'Actualizar',
      color: 'success',
      onClick: onOpenUpdate
    }, {
      label: 'Eliminar',
      color: 'danger',
      onClick: onOpenDelete
    }]
  }, [])

  const handleUpdate = async () => {
    const form = new FormData(formRef.current)
    form.set('token', bearer)
    form.set('url', syllabus)

    try {
      const { data } = await axiosClientSameServer.patch(`/course/${id}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      const lessThis = courses.data.filter(x => x.idCourse !== id)
      setStoreCourses([...lessThis, data.data])
    } catch (er) {
    }
  }

  const handleDelete = async () => {
    await axiosClient.delete('/admin/course/delete/' + id, {
      headers: { Authorization: 'Bearer ' + bearer }
    })

    const lessThis = courses.data.filter(x => x.idCourse !== id)
    setStoreCourses(lessThis)
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
              className='text-tiny uppercase font-bold flex items-center gap-2 cursor-pointer text-primary-500'
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
          <DropDown items={courseActions} />
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
      <FormModal
        isOpen={isOpenUpdate}
        onOpenChange={onOpenChangeUpdate}
        title='Actualizar curso'
      >
        <CourseForm
          onClose={onCloseUpdate}
          initForm={{
            courseName: title, description, contents, credits, fileSyllabus: { file: null, error: null }
          }}
          formRef={formRef}
          onSuccess={handleUpdate}
          isUpdatable
        />
      </FormModal>
    </>
  )
}
