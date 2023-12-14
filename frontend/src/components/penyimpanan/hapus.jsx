import { useRouter } from 'next/navigation'
import { TutupModal, TombolHapus, TombolBatal } from '@/lib/button'
import { ModalHapus } from '@/lib/modal'

export default function Hapus({ referensi, data }) {
  const router = useRouter()
  const datalist = {
    Kode: data.kode,
    Bidang: data.bidang,
    Nama: data.nama,
    'Informasi Lokasi': data.lokasi,
    Keterangan: data.keterangan,
  }
  const hapusHandler = (kode) => {
    fetch('/api/penyimpanan/hapus', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kode }),
    }).then(() => {
      router.refresh()
      referensi.current.close()
    })
  }
  return (
    <ModalHapus referensi={referensi}>
      <TombolHapus
        onClick={() => {
          hapusHandler(data.kode)
        }}
      />
      <TombolBatal
        onClick={() => {
          referensi.current.close()
        }}
      />
    </ModalHapus>
    /*
    <dialog className={`daisy-modal`} ref={referensi}>
      <div className={`daisy-modal-box max-w-[500px]`}>
        <div className={`flex flex-col items-center justify-center gap-y-4`}>
          <h1 className={`text-center text-xl`}>
            Yakin ingin menghapus data berikut?
          </h1>
          <table className={`w-[400px]`}>
            <tbody>
              {Object.entries(datalist).map(([key, value]) => (
                <tr key={key}>
                  <td className={`w-2/5`}>{key}</td>
                  <td className={`w-[4%]`}>:</td>
                  <td className={`w-2/4`}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`flex items-center justify-center gap-x-3`}>
            <TombolHapus
              onClick={() => {
                hapusHandler(data.kode)
              }}
            />
            <TombolBatal />
          </div>
        </div>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      <button
        type='button'
        className='daisy-modal-backdrop'
        onClick={() => {
          referensi.current.close()
        }}
      />
    </dialog>
    */
  )
}
