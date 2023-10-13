import Link from 'next/link'

export default function Sidebar({ menu }) {
  return (
    <aside className='hidden md:flex md:relative'>
      <div className='h-full md:fixed bg-sky-800 w-[15rem]'>
        <ul className='relative text-[18px]'>
          <div>
            {menu && menu.map((data) => (
              <Link key={data.nama}
                href={data.alamat}
                className=''
              >
                <li className='p-[10px] pl-[2rem] hover:bg-white'>
                  {data.nama}
              </li>
              </Link>
            ))}
          </div>
          <div className='fixed bottom-[1rem]'>
            <Link
              href='/keluar'
              className=''
            >
              <li className='py-[10px] hover:bg-white text-white hover:text-black text-center w-[15rem]'>
                KELUAR
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </aside>
  )
}
