'use client'
import { inputInisial } from '@/lib/class'
import Select from 'react-select'

export default function Laporan() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <div className={`my-5`}>
        <h1 className={`text-3xl font-bold`}>Buat Laporan Arsip</h1>
      </div>
      <div
        className={`rounded-box flex w-[800px] flex-col items-center border-2 border-black py-[30px]`}
      >
        <div className={`flex justify-center`}>
          <form className={`grid w-[600px] grid-cols-4 gap-3`}>
            <div className={`col-span-2`}>
              <input
                type='text'
                className={`${inputInisial} w-full border-2 border-black outline-none`}
                placeholder='Tujuan Laporan'
              />
            </div>
            <div className={`col-span-1`}>
              <input
                type='date'
                className={`${inputInisial} w-full border-2 border-black outline-none`}
                placeholder='Periode Awal'
              />
            </div>
            <div className={`col-span-1`}>
              <input
                type='date'
                name='awal'
                className={`${inputInisial} w-full border-2 border-black outline-none`}
                placeholder='Periode Akhir'
              />
            </div>
            <div className={`col-span-4`}>
              <Select
                type='text'
                name='akhir'
                className={`w-full`}
                placeholder='Kategori Arsip'
              />
            </div>
            <div className={`col-span-4`}>
              <input
                type='text'
                className={`${inputInisial} w-full border-2 border-black outline-none`}
                placeholder='Catatan'
              />
            </div>
          </form>
        </div>
        <div>
          <div className={`my-5`}>
            <h2 className={`text-2xl font-semibold`}>Pratinjau Daftar Arsip</h2>
          </div>
        </div>
        <div className={`h-[400px]`}>
          <table>
            <thead className={`border-b-2 border-black`}>
              <tr className={`text-center`}>
                <td className={`w-[40px]`}>No.</td>
                <td className={`w-[100px]`}>Tanggal</td>
                <td className={`w-[120px]`}>Kode Arsip</td>
                <td className={`w-[200px]`}>Kategori</td>
                <td className={`w-[100px]`}>Retensi</td>
              </tr>
            </thead>
          </table>
        </div>
        <div>
          <button type='button'>Unduh</button>
        </div>
      </div>
    </div>
  )
}
