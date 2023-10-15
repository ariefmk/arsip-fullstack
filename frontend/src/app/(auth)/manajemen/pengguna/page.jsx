import Pengguna from '@/components/pengguna'

export default function PenggunaPage() {
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
      <Pengguna datalist={datalist} />
    </div>
  )
}
