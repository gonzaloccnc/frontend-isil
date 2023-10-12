'use client'
import { Pagination } from '@nextui-org/react'

export const PaginationWrap = ({ total, initialPage, changePage }) => {
  return (
    <Pagination
      total={total}
      initialPage={initialPage}
      color='primary'
      onChange={changePage}
      classNames={{ item: 'bg-dark-secondary hover:bg-primary' }}
    />
  )
}
