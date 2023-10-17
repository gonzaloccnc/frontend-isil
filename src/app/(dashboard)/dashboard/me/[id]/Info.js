'use client'

import { useProfile } from '@/components/providers/ProfileProvider'
import { Image } from '@nextui-org/react'

export const Info = () => {
  const { profile } = useProfile()

  return (
    <>
      <div className='flex justify-center items-center flex-col gap-3'>
        <Image
          width={150}
          alt={profile.email}
          src={profile.photo ?? '/images/astronaut.png'}
          className='aspect-square'
          fallbackSrc='/images/astronaut.png'
          classNames={{ wrapper: 'rounded-full border border-white', img: 'rounded-full' }}
        />
        <p><b>{profile.fullname}</b></p>
      </div>
      <div className='w-full px-5 mt-5'>
        <p className='flex flex-col mb-5'>
          <span>Email</span>
          <b>{profile.email}</b>
        </p>
        <p className='flex flex-col'>
          <span>Dirección</span>
          <b>{profile.address}</b>
        </p>
      </div>
    </>
  )
}
