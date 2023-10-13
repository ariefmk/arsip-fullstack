import Link from 'next/link'

export default function Header() {
  return (
    <header className='flex h-[5rem] w-full items-center justify-between bg-green-400 px-[2rem]'>
      <Link href='/beranda'>
        <span className='text-2xl font-bold'>E-Arsip Mampari</span>
      </Link>
      <div className='hidden items-center gap-x-5 md:flex'>
        <span className='text-xl font-bold'>Admin</span>
        <div className='daisy-dropdown daisy-dropdown-end'>
          <button className='h-[3.5rem] w-[3.5rem] rounded-full bg-white'></button>
          <ul
            tabIndex={0}
            className='daisy-menu daisy-dropdown-content rounded-box daisy-menu-md mt-4 w-40 bg-blue-200 shadow'
          >
            <li>
              <Link href='/profil' className='hover:font-bold'>
                Profil
              </Link>
            </li>
            <li>
              <Link href='/keluar' className='hover:font-bold'>
                Keluar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
