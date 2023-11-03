import { Avatar, Card, CardBody, CardHeader } from '@nextui-org/react'

const CardGroup = ({ groupName, students }) => {
  return (
    <Card>
      <CardHeader>
        <h2>{groupName}</h2>
      </CardHeader>
      <CardBody>
        {
          students.map(x => (
            <div key={x.idStudent} className='flex gap-2 items-center'>
              <Avatar alt={x.names}
                className='flex-shrink-0'
                size='sm'
                src={x.avatar}
              />
              <div className='flex flex-col'>
                <span className='text-small'>{x.names}</span>
                <span className='text-tiny text-default-400'>{x.email}</span>
              </div>
            </div>
          ))
        }

      </CardBody>
    </Card>
  )
}

export default CardGroup
