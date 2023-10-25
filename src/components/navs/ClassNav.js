'use client'
import { PaginationWrap } from '@/components/pagination/PaginationWrap'
import { useAdminContext } from '@/hooks/useAdminContext'
import { Button, Divider, useDisclosure } from '@nextui-org/react'
import { useEffect, useRef, useState } from 'react'
import { FormModal } from '../modals/FormModal'
import { axiosClient } from '@/lib/axios'
import { ClassForm } from '../forms/ClassForm'
import { SearchInput } from '../search/Search'
import debounce from 'just-debounce-it'

export const ClassNav = ({ token }) => {
  const { classes, getClasses, setStoreClasses, setStoreClassesInit } = useAdminContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const formRef = useRef(null)
  const [courseName, setCourseName] = useState('')

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

  const getCoursesFilter = async () => {
    const { data } = await axiosClient.get(`/admin/classes/name/${courseName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setStoreClassesInit(data)
  }

  const searchCourse = (e) => {
    const setting = debounce(() => {
      setCourseName(e.target.value)
    }, 1000)

    setting()
  }

  useEffect(() => {
    if (courseName === '') {
      getClasses()
      return
    }

    getCoursesFilter()
  }, [courseName])

  return (
    <>
      <nav className='w-full flex items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <SearchInput onInput={searchCourse} onClear={getClasses} />
          <Divider orientation='vertical' className='h-5' />
          <div>
            <PaginationWrap
              total={classes?.totalPages || 1}
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
