import { axiosServer } from '@/lib/axios'
import { cookies } from 'next/headers'
import { Info } from './Info'
import { Details } from './Details'
import { verifyToken } from '@/lib/jwtUtils'

const Me = async ({ params: { id } }) => {
  const token = cookies().get('token')
  const payload = await verifyToken(token.value)

  const { data } = await axiosServer.get(`/user/me/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`
    }
  })

  const isMyProfile = payload.id === data.data.idUser

  return (
    <section className='flex gap-10'>
      <div className='w-2/5 bg-dark-secondary rounded-xl flex flex-col items-center py-5 max-h-[340px]'>
        <Info
          image={data.data.photo}
          email={data.data.email}
          address={data.data.address}
          fullname={data.data.firstname + ' ' + data.data.surnames}
        />
      </div>
      <div className='w-3/5 bg-dark-secondary rounded-xl flex flex-col items-center pt-5'>
        <Details
          data={data.data}
          IsMyProfile={isMyProfile}
          token={token.value}
        />
      </div>
    </section>
  )
}

export default Me
