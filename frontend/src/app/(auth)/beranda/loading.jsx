export default function Loading() {
  return (
    <div className={`grid grid-cols-1`}>
      <div className={`flex flex-col items-center justify-center text-center`}>
        <div className={`daisy-skeleton mb-4 mt-10 h-[2.5rem] w-[340px]`}></div>
        <div className={`daisy-skeleton h-[200px] w-[200px]`}></div>
      </div>
    </div>
  )
}
