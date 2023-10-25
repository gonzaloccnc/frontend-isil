import React from 'react'
import { Input } from '@nextui-org/react'
import { SearchIcon } from './SearchIcon'

export const SearchInput = ({ onInput, onClear }) => {
  return (
    <div className='rounded-2xl flex justify-center items-center text-white shadow-lg'>
      <Input
        label='Buscar'
        isClearable
        size='sm'
        radius='lg'
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60'
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focused=true]:bg-default-200/50',
            'dark:group-data-[focused=true]:bg-default/60',
            '!cursor-text'
          ]
        }}
        onInput={onInput}
        onClear={onClear}
        placeholder='Escribe para buscar...'
        startContent={
          <SearchIcon className='text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
        }
      />
    </div>
  )
}
