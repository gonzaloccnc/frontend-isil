'use client'

import { useForm } from '@/hooks/useForm'
import { axiosClient } from '@/lib/axios'
import { validEmail, validPhone } from '@/lib/formValid'
import { Input, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { useMemo, useState } from 'react'

export const ProfileForm = ({ onClose, formRef, initForm, token }) => {
  const { fields, clearAll, clearInput, changeFields } = useForm(initForm)
  const [loading, setLoading] = useState(false)

  const isInvalidEmail = useMemo(() => {
    return validEmail(fields.email)
  }, [fields])

  const isInvalidPhone = useMemo(() => {
    return validPhone(fields.phone ?? '')
  }, [fields])

  const isInvalidAll = [isInvalidEmail, isInvalidPhone].some(x => x)
  const IsEmptyAll = !Object.values({ email: fields.email, address: fields.address }).every(x => x)

  const onSuccess = async () => {
    const { data } = await axiosClient.post(`/user/me/${fields.idUser}`, fields, {
      headers: { Authorization: `Bearer ${token}` }
    })
    console.log(data)
  }

  return (
    <>
      <ModalBody>
        <form className='flex flex-col w-[500px] [&>*]:max-w-[500px] gap-6 mb-8' ref={formRef}>
          <div>
            <Input
              id='email'
              type='email'
              key='inside-email'
              labelPlacement='inside'
              label='Email'
              variant='bordered'
              isClearable
              errorMessage={isInvalidEmail && 'Ingresa un correo valido'}
              isInvalid={isInvalidEmail}
              onClear={() => { clearInput('email') }}
              value={fields.email}
              onChange={changeFields}
              className='w-full'
              size='lg'
            />
          </div>

          <div>
            <Input
              id='address'
              type='text'
              key='inside-address'
              labelPlacement='inside'
              label='Dirección'
              variant='bordered'
              isClearable
              errorMessage={fields.address === '' && 'Ingrese un dato'}
              isInvalid={fields.address === ''}
              onClear={() => { clearInput('address') }}
              value={fields.address}
              onChange={changeFields}
              className='w-full'
              size='lg'
            />
          </div>

          <div>
            <Input
              id='phone'
              type='number'
              key='inside-phone'
              labelPlacement='inside'
              label='Télefono'
              variant='bordered'
              isClearable
              errorMessage={isInvalidPhone && 'El telefono debe tener 9 caracteres'}
              isInvalid={isInvalidPhone}
              onClear={() => { clearInput('phone') }}
              value={fields.phone ?? ''}
              onChange={changeFields}
              className='w-full'
              size='lg'
            />
          </div>

        </form>
      </ModalBody>
      <ModalFooter>
        <Button color='danger' variant='light'
          onPress={() => {
            clearAll(initForm)
            onClose()
          }}
          isDisabled={loading}
        >
          Cancelar
        </Button>
        <Button
          isLoading={loading}
          isDisabled={loading || isInvalidAll || IsEmptyAll || fields.address === ''}
          onPress={async () => {
            setLoading(true)
            await onSuccess()
            setLoading(false)
            clearAll(initForm)
            onClose()
          }}
          color='primary'
        >
          Actualizar
        </Button>
      </ModalFooter>
    </>
  )
}
