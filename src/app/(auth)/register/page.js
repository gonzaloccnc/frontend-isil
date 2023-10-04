import { RegisterForm } from '@/components/forms/RegisterForm'
import Link from 'next/link'

const RegisterPage = () => {
  return (
    <>
      <div className='text-center mb-8'>
        <h1>Registrarse</h1>
        <h2>Ingresa tus datos personales</h2>
      </div>

      <RegisterForm />

      <div className='text-center'>
        <p>¿Ya tienes una cuenta?,
          <Link href='/login' className='text-primary'>
            {' '}Iniciar sesión
          </Link>
        </p>
      </div>
    </>
  )
}

export default RegisterPage
