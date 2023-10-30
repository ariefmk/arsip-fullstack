import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState, useEffect } from 'react'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { skemaArsipTambah } from '@/lib/skema'
import { Kesalahan } from '@/lib/errors'

export default function Tambah({ referensi, kategori, penyimpanan }) {
  const listKategori = [{ kode: '', nama: 'Kategori' }, ...kategori]
  const [pilihKategori, setPilihKategori] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skemaArsipTambah()),
  })

  const tambahArsip = (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('kode', data.kode)
    formData.append('kategori', data.kategori)
    formData.append('jenis', data.jenis)
    formData.append('perihal', data.perihal)
    formData.append('retensi', data.retensi)
    formData.append('visibilitas', data.visibilitas)
    formData.append('pengguna', data.pengguna)
    formData.append('berkas', data.berkas)

    fetch('/api/arsip/tambah', {
      method: 'POST',
      body: formData,
    })
  }
  const handleKategori = (aksi) => {
    setPilihKategori(getValues('kategori'))
    console.log(pilihKategori)
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box'>
        <form
          onSubmit={handleSubmit(tambahArsip)}
          encType='multipart/form-data'
        >
          <div>
            <input
              type='text'
              className={`${inputInisial}`}
              placeholder='Kode Arsip'
              {...register('kode')}
            />
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <select
              className={inputInisial}
              value={pilihKategori}
              onClick={handleKategori}
              {...register('kategori')}
            >
              {listKategori.map((data) => (
                <option key={data.kode} value={data.kode}>
                  {data.kode === '' ? data.nama : `${data.kode} - ${data.nama}`}
                </option>
              ))}
            </select>
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <select className={`${inputInisial}`} {...register('jenis')}>
              <option value=''>Jenis</option>
              <option value='1'>Fisik</option>
              <option value='2'>Digital</option>
            </select>
            <Kesalahan errors={errors.jenis?.message} />
          </div>
          <div>
            <input
              type='date'
              className={`${inputInisial}`}
              name='retensi'
              placeholder='Retensi'
              {...register('retensi')}
            />
            <Kesalahan errors={errors.retensi?.message} />
          </div>
          <div>
            <select className={inputInisial} {...register('penyimpanan')}>
              <option value=''>Penyimpanan</option>
            </select>
            <Kesalahan errors={errors.penyimpanan?.message} />
          </div>
          <div>
            <input
              type='text'
              className={`${inputInisial}`}
              placeholder='Perihal'
              {...register('perihal')}
            />
            <Kesalahan errors={errors.perihal?.message} />
          </div>
          <div>
            <textarea
              className={`${inputInisial} resize-none`}
              {...register('keterangan')}
            />
            <Kesalahan errors={errors.keterangan?.message} />
          </div>
          <div>
            <select className={`${inputInisial}`} {...register('visibilitas')}>
              <option value=''>Visibilitas</option>
              <option value='0'>Mati</option>
              <option value='1'>Hidup</option>
            </select>
            <Kesalahan errors={errors.visibilitas?.message} />
          </div>
          <div>
            <input
              type='text'
              className={`${inputInisial}`}
              placeholder='Visibilitas'
              {...register('pengguna')}
            />
            <Kesalahan errors={errors.pengguna?.message} />
          </div>
          <div>
            <input
              type='file'
              id='tambah-berkas'
              accept='.pdf'
              {...register('berkas')}
            />
            <Kesalahan errors={errors.berkas?.message} />
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolTambah />
            <TombolReset
              onClick={() => {
                reset()
              }}
            />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      <button
        onClick={() => {
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />
    </dialog>
  )
}
