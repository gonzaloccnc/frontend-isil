'use client'
import { useAdminContext } from '@/hooks/useAdminContext'
import { Pagination } from '@nextui-org/react'

export const PaginationWrap = ({ total, initialPage }) => {
  const { getCourses } = useAdminContext()

  return (
    <Pagination
      total={total}
      initialPage={initialPage}
      color='primary'
      onChange={(page) => getCourses(page - 1)}
      classNames={{ item: 'bg-dark-secondary hover:bg-primary' }}
    />
  )
}
