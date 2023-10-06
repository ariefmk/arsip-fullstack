import Link from 'next/link'

export default function BerandaLayout(props) {
  return (
    <>
      <header className='header-container h-[4rem] flex bg-green-400'>
        <div className='nav-container px-[3rem] w-full flex flex-row justify-between items-center'>
          <div className='title-container'>
            <h1 className='text-3xl font-bold'>
              <Link
                href='/beranda'>
                E-Arsip Mampari
              </Link>
            </h1>
          </div> 
          <div className='user-container'>
            Nama Pengguna
          </div>
        </div>
      </header>
      <main className='main-container bg-sky-300'>
        {props.children}
      </main>
      <footer className='bg-red-100'>
      </footer>
    </>
  )
}
