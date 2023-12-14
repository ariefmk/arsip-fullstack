import { useRouter } from 'next/navigation'
import { TutupModal, TombolHapus, TombolBatal } from '@/lib/button'
import { ModalHapus } from '@/lib/modal'
import { IconX } from '@tabler/icons-react'

export default function Hapus({ referensi, data }) {
  const dataHapus = {
    Kode: data.kode,
    Kategori: data.kategori,
    Bidang: data.bidang,
    'Jumlah Berkas': `${data.jumlah} Berkas`,
    Keterangan: data.keterangan,
  }
  const router = useRouter()
  const hapusHandler = (kode) => {
    fetch('/api/kategori/hapus', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kode }),
    }).then((hasil) => {
      referensi.current.close()
      router.refresh()
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
    <dialog className='daisy-modal' ref={referensi}>
      <div className={`daisy-modal-box max-w-[500px]`}>
        <div className={`flex flex-col items-center justify-center gap-y-4`}>
          <h1 className={`text-center text-xl`}>
            Yakin ingin menghapus data berikut?
          </h1>
          <table className={`w-[400px]`}>
            <tbody>
              {Object.entries(dataHapus).map(([key, value]) => (
                <tr key={key}>
                  <td className={`w-2/5`}>{key}</td>
                  <td className={`w-[4%]`}>:</td>
                  <td className={`w-2/4`}>{value}</td>
                </tr>
              ))}
            </tbody>
            {/*
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
          <div className={`flex justify-center gap-x-3`}>
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
