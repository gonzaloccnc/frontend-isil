'use client'
import { CardComplementary } from '@/components/cards/CardComplementary'
import { ComplementaryForm } from '@/components/forms/ComplementaryForm'
import { FormModal } from '@/components/modals/FormModal'
import { UserContext } from '@/context/UserContext'
import { axiosClientSameServer } from '@/lib/axios'
import { Button, useDisclosure } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useRef } from 'react'

export const ComplementariesWrap = () => {
  const { id } = useParams()
  const { data } = useSession()
  const { complementaries, fetchComplementaries, role, settingComplementaries } = useContext(UserContext)
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()
  const formRef = useRef(null)

  const onSuccess = async () => {
    const form = new FormData(formRef.current)
    form.append('token', data?.user?.accessToken)
    form.append('idClassroom', id)

    const { data: comple } = await axiosClientSameServer.post('/complementaries', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    settingComplementaries(comple.data)
  }

  useEffect(() => {
    fetchComplementaries(id)
  }, [id])

  return (
    <>
      <section>
        {
          role === 'PROFESOR' &&
          <div className='flex justify-end mb-4'>
            <Button
              color='primary'
              onPress={onOpen}
              isDisabled={complementaries.length === 16}
            >
              Agregar Nuevo contenido
            </Button>
          </div>
        }
        <div className='flex flex-col gap-4'>
          {
            complementaries.length
              ? complementaries.map(x => (
                <CardComplementary
                  key={x.idComplementary}
                  id={x.idComplementary}
                  linkFile={x.linkFile}
                  title={x.title}
                  idClassroom={id}
                  role={role}
                />
              ))
              : <p>No hay complementarios</p>
          }
        </div>
      </section>
      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Agregar contenido complementario'
        className=''
      >
        <ComplementaryForm
          formRef={formRef}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </FormModal>
    </>
  )
}
