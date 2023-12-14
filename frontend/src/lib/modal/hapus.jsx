import { IconAlertCircle } from '@tabler/icons-react'
export default function ModalHapus(props) {
  const { children, referensi } = props
  return (
    <dialog className={`daisy-modal backdrop-blur-[3px]`} ref={referensi}>
      <div
        className={`max-w[350px] max-w-[300px] daisy-modal-box relative bottom-[60px] p-[12px]`}
      >
        <div className={`flex flex-col items-center justify-center gap-y-1`}>
          <div className={`justify-center1 flex flex-col items-center`}>
            <IconAlertCircle
              className={`h-[80px] w-[80px] text-red-500`}
              stroke={1}
            />
            <h1 className={`text-xl font-semibold`}>Yakin hapus data?</h1>
          </div>
          <div className={`flex justify-center gap-x-3`}>{children}</div>
        </div>
      </div>
    </dialog>
  )
}
