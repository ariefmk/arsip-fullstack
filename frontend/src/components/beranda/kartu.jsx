'use client'
export default function Kartu({ judul, nilai, warna, onClick }) {
  return (
    <div
      className={`p-4 bg-green-500 rounded-md text-white`}
      onClick={onClick}
      >
      <p className={`text-lg font-semibold`}>{judul}</p>
      <p className={`text-2xl`}>{nilai}</p>
    </div>
  )
}
