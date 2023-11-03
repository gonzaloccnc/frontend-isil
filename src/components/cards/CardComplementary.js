'use client'
import { Button, Card, CardHeader, useDisclosure } from '@nextui-org/react'
import { PdfModal } from '../modals/PdfModal'
import { FormModal } from '../modals/FormModal'
import { ComplementaryForm } from '../forms/ComplementaryForm'
import { useContext, useRef } from 'react'
import { axiosClientSameServer } from '@/lib/axios'
import { useSession } from 'next-auth/react'
import { UserContext } from '@/context/UserContext'

export const CardComplementary = ({ id, linkFile, title, idClassroom, role }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSession()
  const { isOpen: isOpenUpdate, onOpen: onOpenUpdate, onClose: onCloseUpdate, onOpenChange: onOpenChangeUpdate } = useDisclosure()
  const formRef = useRef(null)
  const { complementaries, setAllComplementaries } = useContext(UserContext)

  const updateComplementary = async () => {
    const formData = new FormData(formRef.current)
    formData.append('token', data?.user?.accessToken)
    formData.append('link', linkFile)
    formData.append('idClassroom', idClassroom)

    const { data: updatedComplementary } = await axiosClientSameServer.patch(`/complementaries/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const filterLess = complementaries.filter(x => x.idComplementary !== id)

    setAllComplementaries([...filterLess, updatedComplementary.data])
  }

  return (
    <>
      <Card>
        <CardHeader className='text-primary-500 flex justify-between items-center'>
          {title}
          <div className='flex items-center gap-4'>
            <Button
              onPress={onOpen}
              variant='bordered'
              color='primary'
              className='text-white'
            >
              Ir al documento
            </Button>
            {
              role === 'PROFESOR' &&
              <Button
                onPress={onOpenUpdate}
                variant='bordered'
                color='primary'
                className='text-white'
              >
                Actualizar
              </Button>
            }
          </div>
        </CardHeader>
      </Card>

      <FormModal
        isOpen={isOpenUpdate}
        onOpenChange={onOpenChangeUpdate}
        title={`Actualizar "${title}"`}
        className=''
      >
        <ComplementaryForm
          formRef={formRef}
          onClose={onCloseUpdate}
          onSuccess={updateComplementary}
          initForm={{ file: { file: null, error: null }, title, idClassroom }}
          isUpdatable
        />
      </FormModal>

      <PdfModal
        key={title + id}
        file={linkFile}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  )
}
