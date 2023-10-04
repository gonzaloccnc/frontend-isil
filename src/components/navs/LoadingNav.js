import { Skeleton } from '@nextui-org/react'

export const LoadingNav = () => {
  return (
    <div className='flex gap-y-[15px] flex-col mt-5'>
      <Skeleton className='w-full h-[50px] rounded-lg' />
      <Skeleton className='w-full h-[50px] rounded-lg' />
      <Skeleton className='w-full h-[50px] rounded-lg' />
      <Skeleton className='w-full h-[50px] rounded-lg' />
      <Skeleton className='w-full h-[50px] rounded-lg' />
    </div>
  )
}
