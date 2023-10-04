import { IconClass } from '@/components/icons/IconClass'
import { IconCourse } from '@/components/icons/IconCourse'
import { IconHome } from '@/components/icons/IconHome'
import { IconSettings } from '@/components/icons/IconSettings'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'

export const AdminNav = () => {
  return (
    <div className='flex flex-col mt-5'>
      <Tooltip
        content='Inicio'
        key='right-end-inicio'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-primary', arrow: 'bg-primary mt-1' }}
      >
        <Link href='/dashboard'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-primary hover:text-black'>
          <IconHome />
        </Link>
      </Tooltip>

      <Tooltip
        content='Cursos'
        key='right-end-cursos'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-primary', arrow: 'bg-primary mt-1' }}
      >
        <Link href='/dashboard/admin/courses'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-primary hover:text-black'>
          <IconCourse />
        </Link>
      </Tooltip>

      <Tooltip
        content='Clases'
        key='right-end-clases'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-primary', arrow: 'bg-primary mt-1' }}
      >
        <Link href='/dashboard/admin/class'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-primary hover:text-black'>
          <IconClass />
        </Link>
      </Tooltip>

      <Tooltip
        content='Configuración'
        key='right-end-config'
        placement='right-end' offset={6}
        showArrow
        classNames={{ base: 'bg-primary', arrow: 'bg-primary mt-1' }}
      >
        <Link href='/settings'
          className='w-full h-[50px] grid place-content-center relative rounded-md text-white hover:bg-primary hover:text-black'>
          <IconSettings />
        </Link>
      </Tooltip>

    </div>
  )
}
