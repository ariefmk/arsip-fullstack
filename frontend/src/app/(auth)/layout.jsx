import Header from './components/header'
import Sidebar from './components/sidebar'
import { hapusAkses } from './lib'
import { cookies } from 'next/headers'

const menu = [
  {
    nama: 'Beranda',
    alamat: '/beranda',
  },
  {
    nama: 'Pengguna',
    alamat: '/pengguna',
  },
  {
    nama: 'Riwayat',
    alamat: '/riwayat',
  },
]

export default function Layout(props) {
  return (
    <>
      <Header nama ='ADMIN' />
      <Sidebar menu={menu}/>
      <main className='md:ml-[15rem]'>
        {props.children}
      </main>
    </>
  )
}
