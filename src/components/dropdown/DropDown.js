'use client'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'

export const DropDown = ({ items, title = 'Acciones' }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant='ghost'
          color='primary'
          className='text-white'
        >
          {title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Acciones'>
        {
          items.map(x => (
            <DropdownItem
              key={x.label}
              color={x.color}
              onPress={x.onClick}
            >
              {x.label}
            </DropdownItem>
          ))
        }
      </DropdownMenu>
    </Dropdown>
  )
}
