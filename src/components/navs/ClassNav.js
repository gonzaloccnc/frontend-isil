'use client'
import { PaginationWrap } from '@/components/pagination/PaginationWrap'
import { useAdminContext } from '@/hooks/useAdminContext'
import { Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react'
import { useRef } from 'react'
import { FormModal } from '../modals/FormModal'
import { axiosClient } from '@/lib/axios'
import { ClassForm } from '../forms/ClassForm'

export const ClassNav = ({ token }) => {
  const { classes, getClasses, setStoreClasses } = useAdminContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const formRef = useRef(null)

  const onAddClass = async () => {
    const form = new FormData(formRef.current)
    const classEntity = {}
    form.forEach((x, y) => {
      if (y === 'idClassroom') return
      classEntity[y] = x
    })

    try {
      const { data: classNew } = await axiosClient.post('/admin/classes', classEntity, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })

      setStoreClasses([classNew.data, ...classes.data])
    } catch (er) {
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
            <PaginationWrap
              total={classes?.totalPages ?? 1}
              initialPage={1}
              changePage={(page) => getClasses(page - 1)}
            />
          </div>
        </div>
        <div className='flex items-center gap-5'>
          <Button
            color='primary'
            onPress={onOpen}
          >
            Agregar clase
          </Button>
        </div>
      </nav >
      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Agregar clase'
        scroll='inside'
        size='3xl'
        className=''
      >
        <ClassForm
          formRef={formRef}
          onClose={onClose}
          onSuccess={onAddClass}
        />
      </FormModal>
    </>
  )
}
