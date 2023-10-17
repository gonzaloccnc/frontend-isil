'use client'
import { ProfileForm } from '@/components/forms/ProfileForm'
import { FormModal } from '@/components/modals/FormModal'
import { useProfile } from '@/components/providers/ProfileProvider'
import { Button, useDisclosure } from '@nextui-org/react'

export const Details = ({ IsMyProfile, token }) => {
  const { profile, setProfile } = useProfile()
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()

  return (
    <>
      <div className='flex justify-between w-full px-4'>
        <h1 className='mb-5'>Detalles de contacto</h1>
        {
          IsMyProfile
            ? <Button
              onPress={onOpen}
              color='primary'
            >
              Actualizar
            </Button>
            : null
        }

      </div>
      <div className='w-full flex flex-col [&>*]:py-4'>
        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black'>
          <h3>Nombres</h3>
          <p>
            <b>{profile.firstname}</b>
          </p>
        </div>

        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black'>
          <h3>Apellidos</h3>
          <p>
            <b>{profile.surnames}</b>
          </p>
        </div>

        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black'>
          <h3>Fecha de nacimiento</h3>
          <p>
            <b>{profile.birthday}</b>
          </p>
        </div>

        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black'>
          <h3>Dirección</h3>
          <p>
            <b>{profile.address}</b>
          </p>
        </div>

        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black'>
          <h3>DNI</h3>
          <p>
            <b>{profile.docId}</b>
          </p>
        </div>

        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black'>
          <h3>Télefono</h3>
          <p>
            <b>{profile.phone ?? 'No se ha registrado un número'}</b>
          </p>
        </div>

        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black'>
          <h3>Carrera</h3>
          <p>
            <b>{profile.career ?? 'Ninguna'}</b>
          </p>
        </div>

        <div className='flex px-4 justify-between hover:bg-primary-500 [&>*]:hover:text-black rounded-bl-xl rounde-br-xl'>
          <h3>Email</h3>
          <p>
            <b>{profile.email}</b>
          </p>
        </div>

      </div>
      <FormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title='Actualizar mis datos'
        className=''
      >
        <ProfileForm
          onClose={onClose}
          initForm={profile}
          setProfile={setProfile}
          token={token}
        />
      </FormModal>
    </>
  )
}
