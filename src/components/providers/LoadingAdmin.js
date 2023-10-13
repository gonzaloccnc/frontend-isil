import { Skeleton } from '@nextui-org/react'

export const LoadingAdmin = () => {
  return (
    <section className='flex flex-col gap-5 mt-5'>
      <Skeleton className='w-full h-screen rounded-lg' />
    </section>
  )
}
