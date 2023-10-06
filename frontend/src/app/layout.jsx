import './globals.css'
import { cookies } from 'next/headers'
export const metadata = {
  title: 'E-Arsip Mampari'
}

export default function RootLayout({ children, beranda }) {
  const  auth = cookies().get('hakAkses')
  return (
    <html lang='id'>
      <body className='bg-gray-200'>
        {auth? beranda : children}
      </body>
    </html>
  )
}
