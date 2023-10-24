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
      console.log(hasil)
      referensi.current.close()
      router.refresh()
    })
  }
  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box'>
        {/*Kode hapus disini*/}
        <div>
          <h1 className='text-center text-lg'>
            Apa anda ingin menghapus data berikut?
          </h1>
          <table>
            <tbody>
              <tr>
                <td>Hak Akses</td>
                <td>:</td>
                <td>{data.hak}</td>
              </tr>
              <tr>
                <td>NIK</td>
                <td>:</td>
                <td>{data.nik}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{data.nama}</td>
              </tr>
              <tr>
                <td>Jabatan</td>
                <td>:</td>
                <td>{data.jabatan}</td>
              </tr>
              <tr>
                <td>Bidang</td>
                <td>:</td>
                <td>{data.bidang}</td>
              </tr>
              <tr>
                <td>Tanggal Lahir</td>
                <td>:</td>
                <td>{data.tanggal}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td>:</td>
                <td>{data.kelamin}</td>
              </tr>
              <tr>
                <td>Nomor Telepon</td>
                <td>:</td>
                <td>{data.telepon}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>:</td>
                <td>{data.alamat}</td>
              </tr>
            </tbody>
          </table>
          <div>
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
          <button type='button' className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'
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
        onClic={() => {
          referensi.current.close()
        }}
      />
    </dialog>
  )
}
