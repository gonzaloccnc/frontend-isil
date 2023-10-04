'use client'
import { IconNotification } from '@/components/icons/IconNotification'
import { Avatar, Badge, Tooltip } from '@nextui-org/react'
import { signOut, useSession } from 'next-auth/react'
import { IconExit } from '../icons/IconExit'

export const TopNav = () => {
  const { data } = useSession()
  const image = data?.user.image
  const name = data?.user.name

  return (
    <header className='w-[calc(100%_-_80px)] h-20 fixed top left-20 bg-dark-primary flex items-center justify-between py-[15px] px-[30px] z-50 text-white border-b border-[rgba(255,255,255,0.3)]'>
      <h1>ISIL+</h1>

      <div className='flex items-center gap-[15px]'>
        <div className='grid place-content-center'>
          <Badge
            content={2}
            shape='circle'
            color='primary'
          >
            <IconNotification />
          </Badge>
        </div>
        <div className='grid place-content-center'>
          <Tooltip
            content={name}
            key='bottom'
            placement='bottom' offset={6}
            showArrow
            size='sm'
            classNames={{ base: 'bg-primary', arrow: 'bg-primary mt-1' }}
          >
            <Avatar
              showFallback
              isBordered
              size='sm'
              src={image}
              color='primary'
            />
          </Tooltip>
        </div>
        <div className='grid place-content-center'>
          <Tooltip
            content='Salir'
            key='sign-out'
            placement='bottom' offset={6}
            showArrow
            size='sm'
            classNames={{ base: 'bg-primary', arrow: 'bg-primary mt-1' }}
          >
            <button type='button' onClick={() => { signOut() }}>
              <IconExit />
            </button>
          </Tooltip>
        </div>
      </div>
    </header>
  )
}
