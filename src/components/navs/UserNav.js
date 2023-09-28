
'use client'

import { IconCalendar } from '@/components/icons/IconCalendar'
import { IconChats } from '@/components/icons/IconChats'
import { IconClass } from '@/components/icons/IconClass'
import { IconCourse } from '@/components/icons/IconCourse'
import { IconGroups } from '@/components/icons/IconGroups'
import { IconHome } from '@/components/icons/IconHome'
import { IconSettings } from '@/components/icons/IconSettings'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
import { IconTodos } from '../icons/IconTodos'

export const UserNav = ({ role }) => {
  return (
    <div className='flex gap-x-[15px] flex-col mt-5'>
      <Tooltip
        content='Inicio'
        key='right-end-inicio'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
      >
        <Link href='/dashboard'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
          <IconHome />
        </Link>
      </Tooltip>

      <Tooltip
        content='Cursos'
        key='right-end-cursos'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
      >
        <Link href='/dashboard/courses'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
          <IconCourse />
        </Link>
      </Tooltip>

      <Tooltip
        content='Clases'
        key='right-end-clases'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
      >
        <Link href='/dashboard/class'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
          <IconClass />
        </Link>
      </Tooltip>

      <Tooltip
        content='Grupos'
        key='right-end-grupos'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
      >
        <Link href='/dashboard/groups' data-tooltip='Grupos'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
          <IconGroups />
        </Link>
      </Tooltip>

      <Tooltip
        content='Calendario'
        key='right-end-calendario'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
      >
        <Link href='/dashboard/calendar'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
          <IconCalendar />
        </Link>
      </Tooltip>

      {
        role === 'PROFESOR'
          ? null
          : <Tooltip
            content='Todos'
            key='right-end-todos'
            placement='right-end' offset={6}
            showArrow
            classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
          >
            <Link href='/dashboard/todos'
              className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
              <IconTodos />
            </Link>
          </Tooltip>
      }

      <Tooltip
        content='Chats'
        key='right-end-chats'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
      >
        <Link href='/dashboard/chats'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
          <IconChats />
        </Link>
      </Tooltip>

      <Tooltip
        content='Configuración'
        key='right-end-config'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-color-isil', arrow: 'bg-color-isil mt-1' }}
      >
        <Link href='/settings'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-color-isil hover:text-black'>
          <IconSettings />
        </Link>
      </Tooltip>

    </div>
  )
}
