'use client'
import { useState, useEffect } from 'react'
import { IconX } from '@tabler/icons-react'
import { TutupModal } from '@/lib/button'
export default function Tambah({ referensi }) {
  const [inputs, setInputs] = useState([{ nama: '', keterangan: '' }])

  const handleInputChange = (event, index, field) => {
    const newInputs = [...inputs]
    newInputs[index][field] = event.target.value
    setInputs(newInputs)
  }
  const removeInput = (index) => {
    const newInputs = [...inputs]
    newInputs.splice(index, 1)
    setInputs(newInputs)
  }
  useEffect(() => {
    if (
      inputs.length >= 1 &&
      inputs[inputs.length - 1].nama &&
      inputs[inputs.length - 1].keterangan
    ) {
      setInputs([...inputs, { nama: '', keterangan: '' }])
    }
  }, [inputs])
  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box'>
        <form>
          <input type='text' placeholder='Kode' />
          <input type='text' placeholder='Keterangan' />
          {/*
          <div>
            {inputs.map((input, index) => (
              <div key={index}>
                <input
                  type='text'
                  value={input.nama}
                  onChange={(e) => handleInputChange(e, index, 'nama')}
                  placeholder='Nama'
                />
                <input
                  type='text'
                  value={input.keterangan}
                  onChange={(e) => handleInputChange(e, index, 'keterangan')}
                  placeholder='Keterangan'
                />

                {index > 0 && ( // Hanya tambahkan tombol "Remove" untuk pasangan input selain pasangan pertama
                <button type='button' onClick={() => removeInput(index)}>
                  Remove
                </button>
                )}
              </div>
            ))}
          </div>
          */}
        </form>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      <button
        type='button'
        className='daisy-modal-backdrop'
        onClick={() => {
          referensi.current.close()
        }}
      />
    </dialog>
  )
}
