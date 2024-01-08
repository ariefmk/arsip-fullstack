import { useRouter } from 'next/navigation'
import { IconAlertCircle } from '@tabler/icons-react'
import { TutupModal, TombolHapus, TombolBatal } from '@/lib/button'
import { ModalHapus } from '@/lib/modal'

export default function Hapus({ referensi, data }) {
  const router = useRouter()

  const hapusHandler = (kode) => {
    fetch('/api/arsip/hapus', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ kode }),
    }).then(() => {
      referensi.current.close()
      router.refresh()
    })
  }

  return (
    <ModalHapus referensi={referensi}>
      <TombolHapus
        className={'bg-red-500'}
        onClick={() => {
          hapusHandler(data)
        }}
      />
      <TombolBatal
        onClick={() => {
          referensi.current.close()
        }}
      />
    </ModalHapus>
    /*
    <dialog className={`daisy-modal backdrop-blur-[3px]	`} ref={referensi}>
      <div
        className={`daisy-modal-box relative bottom-[60px] max-w-[350px] p-[12px]`}
      >
        <div className={`flex flex-col items-center justify-center gap-y-1`}>
          <div className={`flex flex-col items-center justify-center`}>
            <IconAlertCircle
              className={`h-[80px] w-[80px] text-red-500`}
              stroke={1}
            />
            <h1 className={`mb-[20px] text-center text-xl`}>
              Yakin hapus data?
            </h1>
          </div>
          {/*
          <table>
            <tbody>
              {/*
              {Object.entries(dataHapus).map(([key, value]) => (
                <tr key={key}>
                  <td className={``}>{key}</td>
                  <td>:</td>
                  <td>{value}</td>
                </tr>
              ))}
              <tr>
                <td>Kode Arsip</td>
                <td>:</td>
                <td>{data.kode}</td>
              </tr>
              <tr>
                <td>Jenis Arsip</td>
                <td>:</td>
                <td>{data.jenis}</td>
              </tr>
              <tr>
                <td>Retensi</td>
                <td>:</td>
                <td>
                  {new Date(data.retensi).toLocaleString('id-ID', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`mb-[4px] flex justify-center gap-x-3`}>
            <TombolHapus
              className={'bg-red-500'}
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
      {/*
      <button
        onClick={() => {
          referensi.current.close()
        }}
        className={`daisy-modal-backdrop`}
      />
    </dialog>
    */
  )
}
