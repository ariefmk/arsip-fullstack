import Header from './components/header'
import Sidebar from './components/sidebar'

export default function Layout({ children }) {
  const manajemen = [
    {
      href: '/pengguna',
      nama: 'Pengguna'
    }
  ]
  const riwayat = [
    {
      href: '/pengguna',
      nama: 'Pengguna'
    },
    {
      href: '/arsip',
      nama: 'Arsip'
    }
  ]

  return (
    <>
      <Header />
      <div className=''>
      <Sidebar manajemen={manajemen} riwayat={riwayat} />
        <main className='md:ml-[15rem]'>
          {children}
        </main>
      </div>
    </>
  )
}
