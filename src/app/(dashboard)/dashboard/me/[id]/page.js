import { axiosServer } from '@/lib/axios'
import { cookies } from 'next/headers'
import { Info } from './Info'
import { Details } from './Details'
import { verifyToken } from '@/lib/jwtUtils'
import { ProfileProvider } from '@/components/providers/ProfileProvider'

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
    <ProfileProvider init={data.data}>
      <section className='flex gap-10'>
        <div className='w-2/5 bg-dark-secondary rounded-xl flex flex-col items-center py-5 max-h-[340px]'>
          <Info />
        </div>
        <div className='w-3/5 bg-dark-secondary rounded-xl flex flex-col items-center pt-5'>
          <Details
            IsMyProfile={isMyProfile}
            token={token.value}
          />
        </div>
      </section>
    </ProfileProvider>
  )
}

export default Me
