import { Skeleton } from '@nextui-org/react'

export const LoadingAdmin = () => {
  return (
    <section className='flex flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <Skeleton className='w-1/4 h-[50px] rounded-lg' />
        <Skeleton className='w-1/4 h-[50px] rounded-lg' />
        <Skeleton className='w-1/4 h-[50px] rounded-lg' />
      </div>
      <Skeleton className='w-full h-screen rounded-lg' />
    </section>
  )
}
