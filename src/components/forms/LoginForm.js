'use client'

import { useForm } from '@/hooks/useForm'
import { useRouter } from 'next/navigation'
import { useRef, useState, useMemo } from 'react'
import { Button, Input } from '@nextui-org/react'
import { signIn } from 'next-auth/react'
import { validEmail, validPassword } from '@/lib/formValid'

export const LoginForm = () => {
  const router = useRouter()
  const { fields, changeFields, clearInput } = useForm({
    email: '',
    password: '',
    checked: true
  })

  const isInvalidEmail = useMemo(() => {
    return validEmail(fields.email)
  }, [fields])

  const isInvalidPassword = useMemo(() => {
    return validPassword(fields.password)
  }, [fields])

  const authError = useRef(null)
  const [loading, setLoding] = useState(false)

  const handleClick = async () => {
    try {
      setLoding(true)
      const res = await signIn('credentials', {
        email: fields.email.trim(),
        password: fields.password.trim(),
        redirect: false,
        callbackUrl: '/dashboard'
      })

      if (res.error !== null) throw new Error('Credenciales invalidas')

      router.push('/dashboard')
    } catch (ex) {
      authError.current.textContent = ex.message
      setTimeout(() => {
        authError.current.textContent = ''
      }, 4000)
    } finally {
      setLoding(false)
    }
  }

  return (
    <form className='flex flex-col gap-6 justify-center items-center mb-8'>
      <div className='w-[70%]'>
        <Input
          id='email'
          type='email'
          key='inside-email'
          labelPlacement='inside'
          label='Email'
          variant='bordered'
          errorMessage={isInvalidEmail && 'Ingresa un correo valido'}
          isInvalid={isInvalidEmail}
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
          errorMessage={isInvalidPassword && 'La contraseña debe ser mayor a 8 caracteres'}
          isInvalid={isInvalidPassword}
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
          isDisabled={isInvalidEmail || isInvalidPassword || fields.email === '' || fields.password === ''}
          onClick={handleClick}
          color='primary'
          size='lg'
          className='py-7'
        >
          Ingresar
        </Button>
      </div>

      <div className='w-[70%] flex flex-col gap-3'>
        <p className='text-red-700 text-center' ref={authError}></p>
      </div>
    </form>
  )
}
