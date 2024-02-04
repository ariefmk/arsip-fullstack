import { TombolKeluar, TombolBatal } from '@/lib/button'
import { useRouter } from 'next/navigation'
export default function Keluar(props) {
  const { referensi } = props
  const router = useRouter()
  return (
      <dialog className='daisy-modal backdrop-blur-[2px]' ref={referensi}>
        <div className='daisy-modal-box relative bottom-[60px] max-w-[250px]'>
          <h1 className='mb-[2rem] text-center text-2xl font-bold'>Keluar?</h1>
          <div className='flex w-full flex-row justify-center gap-x-2'>
            <TombolKeluar
              onClick={() => {
                router.push('/keluar')
                router.refresh()
              }}
            />
            <TombolBatal
              onClick={() => {
                referensi.current.close()
              }}
            />
          </div>
        </div>
      </dialog>
  )
}
