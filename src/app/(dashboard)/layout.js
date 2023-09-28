import { AsideNav } from '@/components/navs/AsideNav'
import { TopNav } from '@/components/navs/TopNav'

const DashboardLayout = async ({ children }) => {
  return (
    <>
      <AsideNav />
      <TopNav />
      <main className='absolute top-20 left-20 w-[calc(100%_-_80px)] h-auto py-5 px-8 grid grid-cols-3 grid-rows-[200px_350px_350px] gap-4'>
        {children}
      </main>
    </>
  )
}

export default DashboardLayout
