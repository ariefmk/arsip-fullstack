import { IconArchive } from '@tabler/icons-react'
import { TutupModal, TombolBatal, TombolSetujui } from '@/lib/button'
import { useRouter } from 'next/navigation'

export default function Persetujuan(props) {
  const router = useRouter()
  const { referensi, kode } = props
  return (
    <dialog className={`z-2 daisy-modal backdrop-blur-[2px]`} ref={referensi}>
      <div
        className={`daisy-modal-box relative bottom-[60px] max-w-[300px] p-[12px]`}
      >
        <div className={`flex flex-col items-center justify-center gap-y-1`}>
          <div className={`flex flex-col items-center justify-center`}>
            <IconArchive
              className={`h-[80px] w-[80px] text-green-500`}
              stroke={1}
            />
            <h1 className={`text-center text-xl font-semibold`}>
              Setuju sebagai arsip?
            </h1>
          </div>
          {/*
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
        */}
          <div className={`flex justify-center gap-x-3`}>
            <TombolSetujui
              onClick={() => {
                fetch('/api/arsip/setujui', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ kode }),
                }).then(() => {
                  router.refresh()
                  referensi.current.close()
                })
              }}
            />
            <TombolBatal
              onClick={() => {
                referensi.current.close()
              }}
            />
          </div>
        </div>
      </div>
    </dialog>
  )
}
