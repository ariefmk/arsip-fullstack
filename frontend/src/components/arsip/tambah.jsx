import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { hanyaAngka } from '@/lib/form'
import { skemaArsipTambah } from '@/lib/skema'
import { Kesalahan } from '@/lib/errors'

export default function Tambah({ referensi, kategori, penyimpanan }) {
  const router = useRouter()
  const [pilihKategori, setPilihKategori] = useState([
    { kode: '', nama: 'Kategori' },
    ...kategori,
  ])
  useEffect(() => {
    setPilihKategori([{ kode: '', nama: 'Kategori' }, ...kategori])
  }, [kategori])
  const listKategori = kategori.map((data) => {
    return data.kode
  })
  const [kodeArsip, setKodeArsip] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skemaArsipTambah(listKategori)),
  })

  const tambahArsip = (data) => {
    const tahun = data.retensi
    const today = new Date()
    data.retensi = new Date(
      today.getFullYear() + tahun,
      today.getMonth(),
      today.getDate(),
      today.getHours(),
      today.getMinutes()
    )
    console.log(data)

    const formData = new FormData()
    formData.append('kode', data.kode)
    formData.append('kategori', data.kategori)
    formData.append('keterangan', data.keterangan)
    formData.append('jenis', data.jenis)
    formData.append('perihal', data.perihal)
    formData.append('retensi', data.retensi.toISOString())
    formData.append('visibilitas', data.visibilitas)
    formData.append('pengguna', data.pengguna)
    formData.append('berkas', data.berkas[0])

    fetch('/api/arsip/tambah', {
      method: 'POST',
      body: formData,
    }).then(() => {
      setTimeout(() => {
        router.refresh()
        reset()
        referensi.current.close()
        setPilihKategori([{ kode: '', nama: 'Kategori' }, ...kategori])
      }, 1000)
    })
  }

  const handleKategori = (aksi) => {
    const selectedKategori = getValues('kategori')

    if (selectedKategori) {
      // Mengambil kode kategori dari pilihKategori berdasarkan value yang dipilih
      const selectedKategoriData = pilihKategori.find(
        (data) => data.kode === selectedKategori
      )

      // Mengisi input kode dengan kode arsip berdasarkan kategori
      if (selectedKategoriData) {
        setKodeArsip(selectedKategoriData.arsip)
        setValue('kode', selectedKategoriData.arsip)
      }
    } else {
      // Reset kode arsip dan input kode jika kategori kosong
      setKodeArsip('')
      setValue('kode', '')
    }
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
              disabled={true}
              {...register('kode')}
            />
            <Kesalahan errors={errors.kode?.message} />
          </div>
          <div>
            <select
              className={inputInisial}
              {...register('kategori', {
                onChange: handleKategori,
              })}
            >
              {pilihKategori.map((data) => (
                <option key={data.kode} value={data.kode}>
                  {data.kode === '' ? data.nama : `${data.kode} - ${data.nama}`}
                </option>
              ))}
            </select>
            <Kesalahan errors={errors.kategori?.message} />
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
              type='text'
              className={`${inputInisial}`}
              name='retensi'
              placeholder='Retensi (tahun)'
              inputMode='numeric'
              onInput={hanyaAngka}
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
