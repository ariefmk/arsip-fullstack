'use client'
export default function Kartu(props) {
  const { judul, nilai, onClick, children } = props
  return (
    <div>
      <div
        className={`rounded-md bg-green-500 p-4 text-white`}
        onClick={onClick}
      >
        <p className={`text-xl font-semibold`}>{judul}</p>
        <p className={`text-lg`}>{nilai}</p>
      </div>
    </div>
  )
}
