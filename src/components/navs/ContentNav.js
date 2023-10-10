'use client'
import { Button, useDisclosure } from '@nextui-org/react'
import Link from 'next/link'
import { FormModal } from '../modals/FormModal'
import { ContentForm } from '../forms/ContenForm'
import { useRef } from 'react'
import { useSession } from 'next-auth/react'
import { axiosClientSameServer } from '@/lib/axios'
import { useAdminContext } from '@/hooks/useAdminContext'

export const ContentNav = ({ id }) => {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure()
  const { data } = useSession()
  const { contents, setStoreContents } = useAdminContext()
  const formRef = useRef(null)

  const onAddCourse = async () => {
    const form = new FormData(formRef.current)
    form.append('token', data.user.accessToken)

    try {
      const { data: contentNew } = await axiosClientSameServer.post('/content', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      setStoreContents([...contents.data, contentNew.data])
    } catch (er) {
      console.log(er)
    }
  }

  return (
    <>
      <header className='flex items-center justify-between mb-5'>
        <nav className='flex items-center gap-2'>
          <Link href='/dashboard/admin/courses'>Regresar</Link>
        </nav>
        <Button
          onPress={onOpen}
          isDisabled={contents?.data.length === 16}
          color='primary'
        >
          {
            contents?.data.length === 16 ? 'Contenido maximo alcanzado' : 'Agregar'
          }
        </Button>
      </header>
      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Agregar nuevo contenido'
      >
        <ContentForm
          idCourse={id}
          onClose={onClose}
          onSuccess={onAddCourse}
          formRef={formRef}
        />
      </FormModal>
    </>
  )
}
