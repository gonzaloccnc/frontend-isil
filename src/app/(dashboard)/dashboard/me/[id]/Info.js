'use client'

import { Image } from '@nextui-org/react'

export const Info = ({ image, email, address, fullname }) => {
  return (
    <>
      <div className='flex justify-center items-center flex-col gap-3'>
        <Image
          width={150}
          alt={email}
          src={image ?? '/images/astronaut.png'}
          className='aspect-square'
          fallbackSrc='/images/astronaut.png'
          classNames={{ wrapper: 'rounded-full border border-white', img: 'rounded-full' }}
        />
        <p><b>{fullname}</b></p>
      </div>
      <div className='w-full px-5 mt-5'>
        <p className='flex flex-col mb-5'>
          <span>Email</span>
          <b>{email}</b>
        </p>
        <p className='flex flex-col'>
          <span>Dirección</span>
          <b>{address}</b>
        </p>
      </div>
    </>
  )
}
