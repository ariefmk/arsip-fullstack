'use client'
import { hapusAkses } from '../lib'

export default function ModalUser (props) {
  return (
    <div className={`modal ${props.ada? '': 'hidden'} absolute top-[5.2rem] right-[2rem]`}>
      <div className='bg-blue-200 rounded-[5px]'>
        <ul className='list-none flex flex-col text-center w-[5rem] h-[3.5rem] gap-y-1 font-bold'>
          <li>Profil</li>
          <li>Keluar</li>
        </ul>
      </div>
    </div>
  )
}
