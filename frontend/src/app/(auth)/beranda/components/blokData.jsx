export default function BlokData({ judul, jumlah }) {
  return (
    <div className='flex h-[10rem] w-[20rem] flex-col gap-y-3 rounded-[20px] bg-lime-300 text-center'>
      <div className='mt-[3rem]'>
        <h1 className='text-xl'>{judul}</h1>
      </div>
      <div className='m-1'>
        <p>{jumlah}</p>
      </div>
    </div>
  )
}
