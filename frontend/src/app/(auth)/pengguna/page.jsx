'use client'
import { useState, useEffect } from 'react'

export default function Pengguna() {
  const [query, setQuery] = useState('')

  /*
  useEffect(() => {
    console.log(query)
  }, [query])
  */

  // FItur pencarian dengan mengganti query
  const cariHandler = (aksi) => {
    setQuery(aksi.target.value)
  }
  return (
    <div className='w-full'>
      <div>
        <button>Tambah</button>
        <select>
          <option value=''>Semua</option>
          <option value='admin'>Admin</option>
          <option value='pengguna'>Pengguna</option>
        </select>
        <input type='text' onChange={cariHandler} placeholder='Pencarian'/>
      </div>
      <div>
      </div>
    </div>
  )
}
