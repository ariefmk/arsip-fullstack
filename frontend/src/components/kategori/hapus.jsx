import { useRouter } from 'next/navigation'
import { IconX } from '@tabler/icons-react'

export default function Hapus({ referensi, data }) {
  const router = useRouter()
  const hapusHandler = (kode) => {
    fetch('/api/kategori/hapus', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kode}),
    }).then((hasil) => {
      referensi.current.close()
      router.refresh()
    })
  }
  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box'>
        <div>
          <h1>Apa anda ingin menghapus data berikut?</h1>
          <table>
            <tbody>
              <tr>
                <td>Kode</td>
                <td>:</td>
                <td>{data.kode}</td>
              </tr>
              <tr>
                <td>Kategori</td>
                <td>:</td>
                <td>{data.kategori}</td>
              </tr>
              <tr>
                <td>Bidang</td>
                <td>:</td>
                <td>{data.bidang}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              type='button'
              className='h-2rem w-[80px] rounded-[5px] border-2'
              onClick={() => {
                hapusHandler(data.kode)
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
          className='daisy-button-sm daisy-btn daisy-btn-circle daisy-btn-ghost absolute right-2 top-2'
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
