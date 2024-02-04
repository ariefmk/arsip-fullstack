import { forwardRef } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'
import { TombolHapus, TombolBatal } from '@/lib/button'
const ModalHapus = forwardRef(function ModalHapus(props, ref) {
  const { children, onHapus, onBatal } = props
  return (
    <dialog className={`daisy-modal backdrop-blur-[3px]`} ref={ref}>
      <div
        className={`max-w-[350px] daisy-modal-box relative bottom-[60px] max-w-[300px] p-[12px]`}
      >
        <div className={`flex flex-col items-center justify-center gap-y-1`}>
          <div className={`flex flex-col items-center justify-center`}>
            <IconAlertCircle
              className={`h-[80px] w-[80px] text-red-500`}
              stroke={1}
            />
            <h1 className={`text-xl font-semibold`}>Yakin hapus data?</h1>
          </div>
          <div className={`flex justify-center gap-x-3`}>
            <TombolHapus onClick={onHapus} />
            <TombolBatal onClick={onBatal} />
          </div>
        </div>
      </div>
    </dialog>
  )
})

export default ModalHapus
