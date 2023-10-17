'use client'

import { useForm } from '@/hooks/useForm'
import { axiosClientSameServer } from '@/lib/axios'
import { validEmail, validPhone } from '@/lib/formValid'
import { Input, ModalBody, ModalFooter, Button } from '@nextui-org/react'
import { useMemo, useRef, useState } from 'react'

export const ProfileForm = ({ onClose, initForm, token, setProfile }) => {
  const { fields, clearAll, clearInput, changeFields } = useForm({ ...initForm, file: { file: null, error: null } })
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const isInvalidEmail = useMemo(() => {
    return validEmail(fields.email)
  }, [fields])

  const isInvalidPhone = useMemo(() => {
    return validPhone(fields.phone ?? '')
  }, [fields])

  const isInvalidAll = [isInvalidEmail, isInvalidPhone].some(x => x)
  const IsEmptyAll = !Object.values({ email: fields.email, address: fields.address }).every(x => x)

  const onSuccess = async () => {
    const formData = new FormData(formRef.current)
    formData.append('token', token)
    formData.append('birthday', fields.birthday)
    formData.append('docId', fields.docId)
    formData.append('firstname', fields.firstname)
    formData.append('surnames', fields.surnames)

    try {
      const { data } = await axiosClientSameServer.patch(`/profile/${fields.idUser}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(data)
      setProfile(data.data)
    } catch (ex) {
      console.error(ex)
    }
  }

  return (
    <>
      <ModalBody>
        <form className='flex flex-col w-[500px] [&>*]:max-w-[500px] gap-6 mb-8' ref={formRef}>
          <div>
            <Input
              id='email'
              type='email'
              name='email'
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
              name='address'
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
              name='phone'
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

          <div>
            <Input
              id='file'
              name='file'
              type='file'
              key='inside-file'
              variant='bordered'
              accept='.jpg, .png, .jpeg'
              className='w-full'
              size='lg'
              onChange={changeFields}
              errorMessage={fields.file.error || ''}
              isInvalid={fields.file.error != null}
            />
          </div>

        </form>
      </ModalBody>
      <ModalFooter>
        <Button color='danger' variant='light'
          onPress={() => {
            clearAll({ ...initForm, file: { file: null, error: null } })
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
            clearAll({ ...initForm, file: { file: null, error: null } })
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
