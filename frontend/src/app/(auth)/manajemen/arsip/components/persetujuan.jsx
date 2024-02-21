import { forwardRef, useState, useEffect } from 'react'
import { IconArchive } from '@tabler/icons-react'
import { TutupModal, TombolBatal, TombolSetujui } from '@/lib/button'
import { useRouter } from 'next/navigation'

const Persetujuan = forwardRef(function Persetujuan(props, ref) {
  const router = useRouter()
  const { kode, setPesan, setToast } = props

  const setujuHandler = async (kode) => {
    try {
      const kirim = await fetch('/api/arsip/setujui', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ kode }),
      })

      const { status, pesan } = await kirim.json()
      if (status === 200) {
        setPesan(pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      setToast(true)
      ref.current.close()
      router.refresh()
    }
  }

  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box bottom-[60px] max-w-[300px] px-[12px]`}>
        <div className={`flex flex-col items-center justify-center gap-y-1`}>
          <div className={`flex flex-col items-center justify-center`}>
            <IconArchive
              className={`h-[80px] w-[80px] text-green-500`}
              stroke={1}
            />
            <h1 className={`text-center text-xl font-semibold`}>
              Setuju berkas sebagai arsip?
            </h1>
          </div>
          <div className={`flex justify-center gap-x-3`}>
            <TombolSetujui
              onClick={() => {
                setujuHandler(kode)
              }}
            />
            <TombolBatal
              onClick={() => {
                ref.current.close()
              }}
            />
          </div>
        </div>
      </div>
    </dialog>
  )
})

export default Persetujuan
