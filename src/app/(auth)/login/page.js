import { LoginForm } from '@/components/forms/LoginForm'
import Link from 'next/link'

const LoginPage = async () => {
  return (
    <>
      <div className='text-center mb-8'>
        <h1>Bienvenido</h1>
        <h2>Ingresa con tu cuenta</h2>
      </div>

      <LoginForm />

      <div className='text-center'>
        <p>¿Olvidaste tu contraseña?,
          <Link href='/forget-password' className='text-attention-primary'>
            {' '}Recuperar mi contraseña
          </Link>
        </p>
        <p>¿No tienes cuenta?,
          <Link href='/register' className='text-attention-primary'>
            {' '}Registrarse
          </Link>
        </p>
      </div>
    </>
  )
}

export default LoginPage
