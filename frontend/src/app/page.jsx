import Image from 'next/image'
import balangan from '@/static/balangan.png'
import mampari from '@/static/mampari.jpg'
import Form from './components/masuk'

export default function Page() {
  return (
    <main
      style={{
        background: `url(${mampari.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className={`flex h-screen items-center justify-center`}
    >
      <div
        className={`mt-[-2rem] flex flex flex-col items-center gap-y-[0.5rem] md:mt-[-6rem] md:gap-y-[1.5rem]`}
      >
        <div className={`flex flex-col items-center gap-y-2`}>
          <Image
            src={balangan}
            alt='Balangan'
            className={`h-[60px] w-[60px] md:h-[150px] md:w-[150px]`}
          />
          <h1
            className={`text-center text-lg font-bold text-white md:text-3xl`}
          >
            APLIKASI ARSIP KANTOR DESA MAMPARI
          </h1>
        </div>
        <Form />
      </div>
    </main>
  )
}
