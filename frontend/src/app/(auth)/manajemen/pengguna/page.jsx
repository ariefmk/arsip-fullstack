'use client'
import { useState, useEffect } from 'react'
import { IconCirclePlus, IconCircleMinus, IconEdit, IconSearch } from '@tabler/icons-react'

export default function Pengguna() {

  return (
    <div>
      <div className='px-[.5rem] md:px-[2rem] w-full h-[4rem] bg-lime-500 flex flex-row items-center justify-between'>
        <div>
          <button
            className='flex flex-row gap-x-1 border-2 md:w-[8rem] h-[2.5rem] items-center rounded-full p-[5px] md:py-[5px] md:px-[15px]'
          >
            <p className='hidden md:block'>
              Tambah
            </p>
            <IconCirclePlus
              className='w-[25px] h-[25px]'
              color='#000000'
              stroke={2}
            />
          </button>
        </div>
        <div className='flex flex-row gap-x-5'>
          <div
          >
            <select
              className='border-2 rounded-full w-[6rem] md:w-[14rem] h-[2.5rem] px-[15px]'
            >
              <option value=''>Semua</option>
              <option value='admin'>Admin</option>
              <option value='pengguna'>Pengguna</option>
            </select>
          </div>
          <div>
            <input 
              className='outline-none border-2 rounded-full w-[7rem] sm:w-[10rem] md:w-[20rem] h-[2.5rem] py-[5px] px-[15px]'
              type='text' 
              placeholder='Pencarian'
            />
          </div>
        </div>
      </div>
      <div className='w-full overflow-x-auto'>
        <table className='table-fixed text-center w-full'>
          <thead className='border-2 border-black h-[3rem]'>
            <tr className=''>
              <th className='w-[50px] '>No</th>
              <th className='w-[90px]'>Hak Akses</th>
              <th className='w-[160px]'>NIK</th>
              <th className='w-[200px]'>Nama</th>
              <th className='w-[120px]'>Bidang</th>
              <th className='w-[140px]'>Jabatan</th>
              <th className='w-[160px]'>Tanggal Lahir</th>
              <th className='w-[120px]'>Jenis Kelamin</th>
              <th className='w-[180px]'>Nomor Telepon</th>
              <th className='w-[160px] text-ellipsis'>Alamat</th>
              <th className='w-[160px]' colSpan='2'>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className='odd:bg-lime-200 even:bg-sky-200 h-[2.5rem]'>
              <td>1</td>
              <td>Pengguna</td>
              <td>6311041302010001</td>
              <td>Arief Maulana</td>
              <td>-</td>
              <td>Kepala Desa</td>
              <td>13 Februari 2021</td>
              <td>Laki-Laki</td>
              <td>081234567890</td>
              <td className='truncate hover:whitespace-normal'>Sumpung, Desa Mampari RT 4 dasgs fsefs fsf</td>
              <td className='w-[80px]'>
                <button className='flex flex-row gap-x-2 items-center justify-center w-full rounded-full bg-sky-200'>
                  <p>
                    Ubah
                  </p>
                  <IconEdit
                    className='w-[20px] h-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
              <td className=' w-[80px]'>
                <button className='flex flex-row gap-x-2 items-center justify-center w-full rounded-full bg-sky-200'>
                  <p>
                    Hapus
                  </p>
                  <IconCircleMinus
                    className='w-[20px] h-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
            </tr>
            <tr className='odd:bg-lime-200 even:bg-sky-200 h-[2.5rem]'>
              <td>1</td>
              <td>Admin</td>
              <td>6311041302010001</td>
              <td>Arief Maulana</td>
              <td>-</td>
              <td>Kepala Desa</td>
              <td>13 Februari 2021</td>
              <td>Laki-Laki</td>
              <td>081234567890</td>
              <td className='truncate hover:whitespace-normal'>Sumpung, Desa Mampari RT 4</td>
              <td className=''>
                <button className='flex flex-row gap-x-2 rounded-1 rounded-black w-[80px]'>
                  <p>
                    Ubah
                  </p>
                  <IconEdit
                    className='w-[20px] h-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
              <td>
                <button className='flex flex-row gap-x-2 rounded-1 rounded-black w-[80px]'>
                  <p>
                    Hapus
                  </p>
                  <IconCircleMinus
                    className='w-[20px] h-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
