import { Providers } from '@/components/providers/Providers'
import './global.css'
import { Manrope } from 'next/font/google'

const manrope = Manrope({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--manrope'
})

export const metadata = {
  title: 'ISIL+',
  description: 'Plataforma para gestion de cursos del Instituto San Ignacio de Loyola ISIL-PERÚ.'
}

export default function RootLayout({ children }) {
  return (
    <html lang='es' className='dark'>
      <body className={manrope.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
