import Link from 'next/link'
import {
  IconHome2,
  IconHistory,
  IconSettings2,
  IconReportAnalytics,
  IconLogout,
  IconUser,
} from '@tabler/icons-react'
export default function Sidebar(props) {
  const { pengguna, keluar } = props
  const { hakAkses, bidang, jabatan } = pengguna
  return (
    <aside
      className={`col fixed left-0 top-[5rem] z-10 flex flex h-full w-[15rem] bg-sky-300`}
    >
      <div
        className={`flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden`}
      >
        <ul className={`daisy-menu daisy-menu-lg text-[1rem]`}>
          <li>
            <Link href='/'>
              <IconHome2 className={`h-[20px] w-[20px]`} />
              Beranda
            </Link>
          </li>
          <li>
            <details>
              <summary>
                <IconSettings2 className='h-[20px] w-[20px]' />
                Manajemen
              </summary>
              <ul className={`ml-[21px]`}>
                {hakAkses === 'Admin' && (
                  <li>
                    <Link href='/manajemen/pengguna'>Pengguna</Link>
                  </li>
                )}
                {hakAkses !== 'Admin' && (
                  <>
                    <li>
                      <Link href='/manajemen/arsip'>Arsip</Link>
                    </li>
                    {bidang === 5 && (
                      <>
                        <li>
                          <Link href='/manajemen/kategori'>Kategori</Link>
                        </li>
                        <li>
                          <Link href='/manajemen/penyimpanan'>Penyimpanan</Link>
                        </li>
                      </>
                    )}
                  </>
                )}
              </ul>
            </details>
          </li>
          {((jabatan === 'Kepala Desa' || jabatan === 'Sekretaris') || bidang === 5) && (
            <li>
              <Link href='/laporan'>
                <IconReportAnalytics className={`h-[20px] w-[20px]`} />
                Laporan
              </Link>
            </li>
          )}
          <li>
            <Link href='/profil'>
              <IconUser className={`h-[20px] w-[20px]`} />
              Profil
            </Link>
          </li>
          <li>
            <button
              type='button'
              onClick={() => {
                keluar.current.showModal()
              }}
            >
              <IconLogout className={`h-[20px] w-[20px]`} />
              Keluar
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
