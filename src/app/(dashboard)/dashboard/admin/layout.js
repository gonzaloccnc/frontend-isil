import { AdminProvider } from '@/components/providers/AdminProvider'

const AdminLayout = ({ children }) => {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  )
}

export default AdminLayout
