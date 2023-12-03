import { useRouter } from 'next/navigation'
import { TutupModal, TombolHapus, TombolBatal } from '@/lib/button'

export default function Hapus({ referensi, data }) {
  const router = useRouter()
  data = {
    Kode: data.kode,
    Bidang: data.bidang,
    Nama: data.nama,
    'Informasi Lokasi': data.lokasi,
    Keterangan: data.keterangan
  }
  return (
    <dialog className={`daisy-modal`} ref={referensi}>
      <div className={`daisy-modal-box max-w-[500px]`}>
        <div className={`flex flex-col items-center justify-center gap-y-4`}>
          <h1 className={`text-center text-xl`}>
            Yakin ingin menghapus data berikut?
          </h1>
          <table className={`w-[400px]`}>
            <tbody>
              {Object.entries(data).map(([key, value]) => (
                <tr key={key}>
                  <td classNamw={`w-2/5`}>{key}</td>
                  <td className={`w-[4%]`}>:</td>
                  <td className={`w-2/4`}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={`flex items-center justify-center gap-x-3`}>
            <TombolHapus/>
            <TombolBatal/>
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
  )
}
