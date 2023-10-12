import Daftar from '@/app/components/tabel'
import { IconCircleMinus, IconEdit } from '@tabler/icons-react'
export default function Riwayat() {

  const thead = {
    data: [
      ['No', 'w-[50px]'],
      ['Hak Akses', 'w-[90px]'],
      ['NIK', 'w-[160px]'],
      ['Nama', 'w-[200px]'],
      ['Bidang', 'w-[120px]'],
      ['Jabatan', 'w-[140px]'],
      ['Tanggal Lahir', 'w-[160px]'],
      ['Jenis Kelamin', 'w-[120px]'],
      ['Nomor Telepon', 'w-[180px]'],
      ['Alamat', 'w-[160px]'],
    ],
    before: undefined,
    after: [
      <th key='aksi' className='w-[160px]' colspan='2'>Aksi</th>
    ]
  }
  const tbody = {
    data: [
      ['Pengguna', '6311041302010001', 'Arief Maulana', '-', 'Kepala Desa', '13 Februari 2001', 'Laki-Laki', '083125902067', ['Sumpung Desa Mampari RT 4 fajhfa fafakuhf fadf', 'truncate hover:whitespace-normal']],
      ['Pengguna', '6311041302010001', 'Arief Maulana', '-', 'Kepala Desa', '13 Februari 2001', 'Laki-Laki', '083125902067', ['Sumpung Desa Mampari RT 4 fajhfa fafakuhf fadf', 'truncate hover:whitespace-normal']],
      ['Pengguna', '6311041302010001', 'Arief Maulana', '-', 'Kepala Desa', '13 Februari 2001', 'Laki-Laki', '083125902067', ['Sumpung Desa Mampari RT 4 fajhfa fafakuhf fadf', 'truncate hover:whitespace-normal']],
      ['Pengguna', '6311041302010001', 'Arief Maulana', '-', 'Kepala Desa', '13 Februari 2001', 'Laki-Laki', '083125902067', ['Sumpung Desa Mampari RT 4 fajhfa fafakuhf fadf', 'truncate hover:whitespace-normal']],
    ],
    before: [<td key='nomor'></td>],
    after: [
    <td key='ubah' className='w-[80px]'>
      <button className='flex flex-row gap-x-2 items-center justify-center w-full rounded-full bg-white hover:bg-blue-300'>
        <p>
          Ubah
        </p>
        <IconEdit
          className='w-[20px] h-[20px]'
          color='#000000'
          stroke={2}
        />
      </button>
    </td>,
    <td key='hapus' className=' w-[80px]'>
      <button className='flex flex-row gap-x-2 items-center justify-center w-full rounded-full bg-white hover:bg-red-400'>
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
    ]
  }
  const className={
    table: 'table-fixed w-full text-center',
    thead: 'border-2 border-black h-[3rem]',
    tbody: ['', 'odd:bg-lime-200 even:bg-sky-200 h-[2.5rem]']
  }

  const aksi = {
    status: false
  }

  return (
    <div className='w-full overflow-x-auto'>
      <Daftar
        className={className}
        thead={thead}
        tbody={tbody}
        action={aksi}
      />
    </div>
  )
}
