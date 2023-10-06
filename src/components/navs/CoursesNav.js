'use client'
import { Button, Divider, useDisclosure, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from '@nextui-org/react'
import { FormModal } from '../modals/FormModal'
import { PaginationWrap } from '../pagination/PaginationWrap'
import { useAdminContext } from '@/hooks/useAdminContext'
import { CourseForm } from '../forms/CourseForm'
import { useRef } from 'react'
import { axiosClientSameServer } from '@/lib/axios'

export const CoursesNav = () => {
  const { courses } = useAdminContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const formRef = useRef(null)

  const onUploadFile = async () => {
    const form = new FormData(formRef.current)

    try {
      const resp = await axiosClientSameServer.post('/course', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(resp)
    } catch (er) {
      console.log(er)
    }
  }
  return (
    <>
      <nav className='w-full flex items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <Dropdown classNames={{ base: 'bg-dark-third' }}>
            <DropdownTrigger>
              <Button
                color='primary'
              >
                Ordenar
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label='Static Actions'>
              <DropdownItem key='new'>Fecha</DropdownItem>
              <DropdownItem key='copy'>Nombre A-Z</DropdownItem>
              <DropdownItem key='copy'>Nombre Z-A</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Divider orientation='vertical' className='h-5' />
          <div>
            <PaginationWrap total={courses?.totalPages ?? 1} initialPage={1} />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <Button
            color='primary'
            onPress={onOpen}
          >
            Agregar curso
          </Button>
        </div>
      </nav>
      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Agregar curso'
      >
        <CourseForm
          onClose={onClose}
          formRef={formRef}
          onSuccess={onUploadFile}
        />
      </FormModal>
    </>
  )
}
