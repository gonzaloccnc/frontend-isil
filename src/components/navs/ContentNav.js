'use client'
import { Button } from '@nextui-org/react'

export const ContentNav = ({ courseName }) => {
  return (
    <header className='flex items-center justify-between mb-5'>
      <nav className='flex items-center gap-2'>
        <h3>{courseName}</h3>
        <span>{'>'}</span>
        <h3>contenidos</h3>
      </nav>
      <Button
        color='primary'
      >
        Agregar
      </Button>
    </header>
  )
}
