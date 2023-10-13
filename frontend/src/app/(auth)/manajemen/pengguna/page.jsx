import {
  IconCirclePlus,
  IconCircleMinus,
  IconEdit,
  IconSearch,
} from '@tabler/icons-react'
import Header from './components/header'
import Tabel from './components/tabel'

export default function Pengguna() {
  const datalist = [
    {
      hak: 'Pengguna',
      nik: '6311041302010004',
      nama: 'Arief Maulana',
      bidang: '-',
      jabatan: '-',
      tanggal: '13 Februari 2001',
      kelamin: 'Laki-Laki',
      telepon: '083125902067',
      alamat: 'Sumpung, Desa Mampari RT 4 dasgs fsefs fsf',
    },
    {
      hak: 'Pengguna',
      nik: '6311041302010002',
      nama: 'Arief Maulana',
      bidang: '-',
      jabatan: '-',
      tanggal: '13 Februari 2001',
      kelamin: 'Laki-Laki',
      telepon: '083125902067',
      alamat: 'Sumpung, Desa Mampari RT 4 dasgs fsefs fsf',
    },
    {
      hak: 'Pengguna',
      nik: '6311041302010011',
      nama: 'Arief Maulana',
      bidang: '-',
      jabatan: '-',
      tanggal: '13 Februari 2022',
      kelamin: 'Laki-Laki',
      telepon: '083125902067',
      alamat: 'Sumpung, Desa Mapari sefs fsf',
    },
  ]
  return (
    <div>
      <Header />
      {/*
      <div className='flex h-[4rem] w-full flex-row items-center justify-between bg-lime-500 px-[.5rem] md:px-[2rem]'>
        <div>
          <button className='flex h-[2.5rem] flex-row items-center gap-x-1 rounded-full border-2 p-[5px] md:w-[8rem] md:px-[15px] md:py-[5px]'>
            <p className='hidden md:block'>Tambah</p>
            <IconCirclePlus
              className='h-[25px] w-[25px]'
              color='#000000'
              stroke={2}
            />
          </button>
        </div>
        <div className='flex flex-row gap-x-5'>
          <div>
            <select className='h-[2.5rem] w-[6rem] rounded-full border-2 px-[15px] md:w-[14rem]'>
              <option value=''>Semua</option>
              <option value='admin'>Admin</option>
              <option value='pengguna'>Pengguna</option>
            </select>
          </div>
          <div>
            <input
              className='h-[2.5rem] w-[7rem] rounded-full border-2 px-[15px] py-[5px] outline-none sm:w-[10rem] md:w-[20rem]'
              type='text'
              placeholder='Pencarian'
            />
          </div>
        </div>
      </div>
      <div className='w-full overflow-x-auto'>
        <table className='w-full table-fixed text-center'>
          <thead className='h-[3rem] border-2 border-black'>
            <tr className=''>
              <th className='w-[50px]'>No</th>
              <th className='w-[90px]'>Hak Akses</th>
              <th className='w-[160px]'>NIK</th>
              <th className='w-[200px]'>Nama</th>
              <th className='w-[120px]'>Bidang</th>
              <th className='w-[140px]'>Jabatan</th>
              <th className='w-[160px]'>Tanggal Lahir</th>
              <th className='w-[120px]'>Jenis Kelamin</th>
              <th className='w-[180px]'>Nomor Telepon</th>
              <th className='w-[160px] text-ellipsis'>Alamat</th>
              <th className='w-[160px]' colSpan='2'>
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='h-[2.5rem] odd:bg-lime-200 even:bg-sky-200'>
              <td>1</td>
              <td>Pengguna</td>
              <td>6311041302010001</td>
              <td>Arief Maulana</td>
              <td>-</td>
              <td>Kepala Desa</td>
              <td>13 Februari 2021</td>
              <td>Laki-Laki</td>
              <td>081234567890</td>
              <td className='truncate hover:whitespace-normal'>
                Sumpung, Desa Mampari RT 4 dasgs fsefs fsf
              </td>
              <td className='w-[80px]'>
                <button className='flex w-full flex-row items-center justify-center gap-x-2 rounded-full bg-sky-200'>
                  <p>Ubah</p>
                  <IconEdit
                    className='h-[20px] w-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
              <td className=' w-[80px]'>
                <button className='flex w-full flex-row items-center justify-center gap-x-2 rounded-full bg-sky-200'>
                  <p>Hapus</p>
                  <IconCircleMinus
                    className='h-[20px] w-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
            </tr>
            <tr className='h-[2.5rem] odd:bg-lime-200 even:bg-sky-200'>
              <td>1</td>
              <td>Admin</td>
              <td>6311041302010001</td>
              <td>Arief Maulana</td>
              <td>-</td>
              <td>Kepala Desa</td>
              <td>13 Februari 2021</td>
              <td>Laki-Laki</td>
              <td>081234567890</td>
              <td className='truncate hover:whitespace-normal'>
                Sumpung, Desa Mampari RT 4
              </td>
              <td className=''>
                <button className='rounded-1 rounded-black flex w-[80px] flex-row gap-x-2'>
                  <p>Ubah</p>
                  <IconEdit
                    className='h-[20px] w-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
              <td>
                <button className='rounded-1 rounded-black flex w-[80px] flex-row gap-x-2'>
                  <p>Hapus</p>
                  <IconCircleMinus
                    className='h-[20px] w-[20px]'
                    color='#000000'
                    stroke={2}
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      */}
      <Tabel datalist={datalist} />
    </div>
  )
}
