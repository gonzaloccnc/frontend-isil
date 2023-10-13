import { Tab, Tabs } from '@nextui-org/react'

export const TabClient = ({ items }) => {
  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Opciones'
            color='primary'
            variant='bordered'
      >
        {
          items.map(x => (
            <Tab
              key={x.label}
              title={
                <div className='flex items-center space-x-2'>
                  {x.icon}
                  <span>{x.label}</span>
                </div>
              }
            />
          ))
        }
        </ Tabs>
    </div>
  )
}
