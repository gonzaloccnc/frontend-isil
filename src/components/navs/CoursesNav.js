'use client'
import { Button, Divider, useDisclosure } from '@nextui-org/react'
import { FormModal } from '../modals/FormModal'
import { PaginationWrap } from '../pagination/PaginationWrap'
import { useAdminContext } from '@/hooks/useAdminContext'
import { CourseForm } from '../forms/CourseForm'
import { useEffect, useRef, useState } from 'react'
import { axiosClient, axiosClientSameServer } from '@/lib/axios'
import debounce from 'just-debounce-it'
import { SearchInput } from '../search/Search'

export const CoursesNav = ({ token }) => {
  const { courses, getCourses, setStoreCourses, setStoreCoursesInit } = useAdminContext()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
  const [courseName, setCourseName] = useState('')
  const formRef = useRef(null)

  const onAddCourse = async () => {
    const form = new FormData(formRef.current)
    form.append('token', token)

    try {
      const { data: courseNew } = await axiosClientSameServer.post('/course', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setStoreCourses([...courses.data, courseNew.data])
    } catch (er) {
    }
  }

  const getCoursesFilter = async () => {
    const { data } = await axiosClient.get(`/admin/courses/name/${courseName}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setStoreCoursesInit(data)
  }

  const searchCourse = (e) => {
    const setting = debounce(() => {
      setCourseName(e.target.value)
    }, 1000)

    setting()
  }

  useEffect(() => {
    if (courseName === '') {
      getCourses()
      return
    }

    getCoursesFilter()
  }, [courseName])

  return (
    <>
      <nav className='w-full flex items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <SearchInput onInput={searchCourse} onClear={getCourses} />
          <Divider orientation='vertical' className='h-5' />
          <div>
            <PaginationWrap
              total={courses.totalPages}
              initialPage={1}
              changePage={(page) => getCourses(page - 1)}
            />
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
          onSuccess={onAddCourse}
        />
      </FormModal>
    </>
  )
}
