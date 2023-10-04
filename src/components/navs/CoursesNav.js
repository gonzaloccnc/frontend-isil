'use client'
import { Button, Divider, useDisclosure, Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from '@nextui-org/react'
import { AddCourseModal } from '../modals/AddCourseModal'
import { PaginationWrap } from '../pagination/PaginationWrap'
import { useAdminContext } from '@/hooks/useAdminContext'

export const CoursesNav = () => {
  const { courses } = useAdminContext()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

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
      <AddCourseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
