'use client'

const ErrorProfile = ({ error, reset }) => {
  return (
    <div>
      Algo inesperado paso!
      <p>
        {error.message} <a href='/dashboard'>Volver</a>
      </p>
    </div>
  )
}

export default ErrorProfile
