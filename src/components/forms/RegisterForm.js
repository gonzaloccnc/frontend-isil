'use client'

import { useForm } from '@/hooks/useForm'
import { axiosClient } from '@/lib/axios'
import { validDNI, validEmail, validNames, validPassword } from '@/lib/formValid'
import { Button, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useMemo, useRef, useState } from 'react'

export const RegisterForm = () => {
  const router = useRouter()
  const { fields, changeFields, clearInput } = useForm({
    names: '',
    surnames: '',
    dni: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const registerError = useRef(null)

  const isValidEmail = useMemo(() => {
    return validEmail(fields.email)
  }, [fields])

  const isValidPassword = useMemo(() => {
    return validPassword(fields.password)
  }, [fields])

  const isValidNames = useMemo(() => {
    return validNames(fields.names)
  }, [fields])

  const isValidSurnames = useMemo(() => {
    return validNames(fields.surnames)
  }, [fields])

  const isValidDni = useMemo(() => {
    return validDNI(fields.dni)
  }, [fields])

  const isInvalidAll = [isValidDni, isValidEmail, isValidNames, isValidPassword, isValidSurnames].some(x => x)
  const allIsEmpty = !Object.values(fields).every(x => x)

  const handleClick = async () => {
    try {
      setLoading(true)
      const email = fields.email.toLowerCase()
      const firstname = fields.names.split(' ').reduce((ac, n) => {
        return ac + n.at(0).toUpperCase() + n.substring(1).toLowerCase() + ' '
      }, '').trim()

      const surnames = fields.surnames.split(' ').reduce((ac, n) => {
        return ac + n.at(0).toUpperCase() + n.substring(1).toLowerCase() + ' '
      }, '').trim()
      const { password, dni: docId } = fields

      await axiosClient.post('/auth/register', { email, firstname, surnames, password, docId, typeDoc: 0 })
      const res = await signIn('credentials', {
        email, password, redirect: false, callbackUrl: '/dashboard'
      })

      if (res.error !== null) throw new Error('Ups! verifica tus credenciales o intentalo más tarde')

      router.push('/dashboard')
    } catch (ex) {
      registerError.current.textContent = ex.response == null ? 'Ups algo inesperado paso' : ex.response.data.message
      setTimeout(function () {
        if (registerError.current === null) return
        registerError.current.textContent = ''
      }, 4000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className='flex flex-col gap-6 justify-center items-center mb-8'>

      <div className='w-[70%]'>
        <Input
          id='names'
          type='text'
          key='inside-names'
          labelPlacement='inside'
          label='Nombres'
          variant='bordered'
          errorMessage={isValidNames && 'Este campo debe ser mayor a 8 caracteres, contener un espacio y no deben ser numeros'}
          isInvalid={isValidNames}
          isClearable
          onClear={() => { clearInput('names') }}
          className='w-full'
          size='lg'
          value={fields.names}
          onChange={changeFields}
        />
      </div>

      <div className='w-[70%]'>
        <Input
          id='surnames'
          type='text'
          key='inside-surnames'
          labelPlacement='inside'
          label='Apellidos'
          variant='bordered'
          errorMessage={isValidSurnames && 'Este campo debe ser mayor a 8 caracteres, contener un espacio y no deben ser numeros'}
          isInvalid={isValidSurnames}
          isClearable
          onClear={() => { clearInput('surnames') }}
          className='w-full'
          size='lg'
          value={fields.surnames}
          onChange={changeFields}
        />
      </div>

      <div className='w-[70%]'>
        <Input
          id='dni'
          type='text'
          key='inside-dni'
          labelPlacement='inside'
          label='DNI'
          variant='bordered'
          errorMessage={isValidDni && 'Este campo debe ser igual a 8 caracteres, ser numeros y no debe haber espacios'}
          isInvalid={isValidDni}
          isClearable
          onClear={() => { clearInput('dni') }}
          className='w-full'
          size='lg'
          value={fields.dni}
          onChange={changeFields}
        />
      </div>

      <div className='w-[70%]'>
        <Input
          id='email'
          type='email'
          key='inside-email'
          labelPlacement='inside'
          label='Email'
          variant='bordered'
          errorMessage={isValidEmail && 'Ingresa un correo valido'}
          isInvalid={isValidEmail}
          isClearable
          onClear={() => { clearInput('email') }}
          className='w-full'
          size='lg'
          value={fields.email}
          onChange={changeFields}
        />
      </div>

      <div className='w-[70%]'>
        <Input
          id='password'
          type='password'
          key='inside-password'
          labelPlacement='inside'
          label='Contraseña'
          variant='bordered'
          errorMessage={isValidPassword && 'La contraseña debe ser mayor a 8 caracteres'}
          isInvalid={isValidPassword}
          isClearable
          onClear={() => { clearInput('password') }}
          className='w-full'
          size='lg'
          value={fields.password}
          onChange={changeFields}
        />
      </div>

      <div className='w-[70%] flex flex-col'>
        <Button
          isLoading={loading}
          isDisabled={isInvalidAll || allIsEmpty}
          onPress={handleClick}
          color='primary'
          size='lg'
          className='py-7'
        >
          Ingresar
        </Button>
      </div>

      <div className='w-[70%] flex flex-col gap-3'>
        <p className='text-red-700 text-center' ref={registerError}></p>
      </div>
    </form>
  )
}
