import { IconCirclePlus } from '@tabler/icons-react'

export default function Header(props) {
  const { cari } = props
  return (
    <div
      className={`flex h-[4rem] w-full flex-row items-center justify-between px-[.5rem] md:px-[1rem]`}
    >
      <div>
        <button
          className={`flex h-[2.5rem] items-center justify-center gap-x-1 rounded-full border-2 border-black md:w-[8rem]`}
        >
          <span>Tambah</span>
          <IconCirclePlus className={`h-[25px] w-[25px]`} stroke={2} />
        </button>
      </div>
      <div>
        <input
          type='text'
          className={`h-[2.5rem] w-[7rem] rounded-full border-2 border-2 border-black px-[15px] outline-none placeholder:text-black md:w-[20rem]`}
          placeholder='Pencarian'
          onChange={(e) => {
            cari(e.target.value)
          }}
        />
      </div>
    </div>
  )
}
