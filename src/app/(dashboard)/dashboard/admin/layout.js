import { AdminProvider } from '@/components/providers/AdminProvider'
import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/jwtUtils'

const AdminLayout = async ({ children }) => {
  const token = cookies().get('token')
  const data = await verifyToken(token.value)

  if (data.role !== 'ADMIN') {
    return <h1>No tienes accesso a estos recursos</h1>
  }

  return (
    <AdminProvider token={token.value}>
      {children}
    </AdminProvider>
  )
}

export default AdminLayout
