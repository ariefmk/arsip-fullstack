import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

export default function Layout({ children }) {
  const manajemen = ['pengguna', 'arsip', 'kategori']
  const riwayat = ['pengguna', 'arsip data', 'sistem']

  return (
    <>
      <Header />
      <div className=''>
        <Sidebar/>
        <main className='md:ml-[15rem]'>{children}</main>
      </div>
    </>
  )
}
