export default function BlokData({
  judul,
  jumlah
}) {
  return (
    <div className='bg-lime-300 rounded-[20px] flex flex-col gap-y-3 h-[10rem] w-[20rem] text-center'>
      <div className='mt-[3rem]'>
        <h1 className='text-xl'>
          {judul}
        </h1>
      </div>
      <div className='m-1'>
        <p>
          {jumlah}
        </p>
      </div>
    </div>
  )
}
