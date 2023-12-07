import { useRouter } from 'next/navigation'
import { IconX } from '@tabler/icons-react'

export default function Hapus({ referensi, data }) {
  const router = useRouter()
  const hapusHandler = (nik) => {
    fetch('/api/pengguna/hapus', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nik }),
    }).then((hasil) => {
      //console.log(hasil)
      referensi.current.close()
      router.refresh()
    })
  }
  const dataPengguna = {
    'Hak Akses': data.hak,
    NIK: data.nik,
    Nama: data.nama,
    Jabatan: (() => {
      if (!data.jabatan) {
        return 'Tidak Ada'
      } else {
        return data.jabatan
      }
    })(),
    Bidang: (() => {
      switch (data.bidang) {
        case 1:
          return 'Kesra & Pelayanan'
          break
        case 2:
          return 'Pemerintahan'
          break
        case 3:
          return 'Kewilayahan'
          break
        case 4:
          return 'Keuangan'
          break
        case 5:
          return 'Umum & Perencanaan'
          break
        default:
          return 'Tidak Ada'
      }
    })(),
    'Tanggal Lahir': data.tanggal,
    'Jenis Kelamin': (() => {
      if (data.kelamin === 1) {
        return 'Laki-Laki'
      } else {
        return 'Perempuan'
      }
    })(),
    'Nomor Telepon': data.telepon,
    Alamat: data.alamat,
  }
  // console.log(dataPengguna)

  return (
    <dialog className='daisy-modal z-0' ref={referensi}>
      <div className='daisy-modal-box max-w-[500px]'>
        {/*Kode hapus disini*/}
        <div className={`flex flex-col items-center justify-center gap-y-4`}>
          <h1 className='text-center text-xl'>
            Yakin ingin menghapus data berikut?
          </h1>
          <table>
            <tbody>
              {Object.entries(dataPengguna).map(([key, value]) => (
                <tr key={key}>
                  <td className='w-2/5'>{key}</td>
                  <td className='w-[4%]'>:</td>
                  <td className='w-2/3'>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`flex flex-row gap-x-3`}>
            <button
              type='button'
              className='h-2rem w-[80px] rounded-[5px] border-2'
              onClick={() => {
                hapusHandler(data.nik)
              }}
            >
              Hapus
            </button>
            <button
              type='button'
              className='h-2rem w-[80px] rounded-[5px] border-2'
              onClick={() => {
                referensi.current.close()
              }}
            >
              Tidak
            </button>
          </div>
        </div>
        <button
          type='button'
          className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'
          onClick={() => {
            referensi.current.close()
          }}
        >
          <IconX className='h-[20px] w-[20px]' />
        </button>
      </div>
      <button
        type='button'
        className='daisy-modal-backdrop'
        onClick={() => {
          referensi.current.close()
        }}
      />
    </dialog>
  )
}
