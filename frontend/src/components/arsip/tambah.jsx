import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { IconCirclePlus, IconUserCircle, IconX } from '@tabler/icons-react'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { hanyaAngka } from '@/lib/form'
import { skemaArsipTambah } from '@/lib/skema'
import { Kesalahan } from '@/lib/errors'

export default function Tambah({ referensi, kategori, penyimpanan }) {
  const router = useRouter()
  const [jenis, setJenis] = useState('')
  const [visibilitas, setVisibilitas] = useState('')
  const [pilihKategori, setPilihKategori] = useState([
    { kode: '', nama: 'Kategori' },
    ...kategori,
  ])
  const [dataKategori, setDataKategori] = useState('')

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
        setDataKategori(selectedKategoriData.arsip)
        setKodeArsip(selectedKategoriData.arsip)
        setValue('kode', selectedKategoriData.arsip)
      }
    } else {
      // Reset kode arsip dan input kode jika kategori kosong
      setDataKategori('')
      setKodeArsip('')
      setValue('kode', '')
    }
  }

  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box max-w-[900px]'>
        <form
          className={`flex flex-col gap-y-3`}
          onSubmit={handleSubmit(tambahArsip)}
          encType='multipart/form-data'
        >
          <h1 className='text-center text-2xl font-bold'>Tambah Arsip</h1>
          <div className='flex flex-col gap-y-2'>
            <div className='flex w-full gap-x-2'>
              <div className=''>
                <input
                  type='text'
                  className={`${inputInisial} w-[120px] border-black`}
                  placeholder='Kode Arsip'
                  disabled={true}
                  readOnly
                  {...register('kode')}
                />
                <Kesalahan errors={errors.kode?.message} />
              </div>
              <div className='w-full'>
                <select
                  className={`${inputInisial} w-full ${
                    errors.kategori
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  {...register('kategori', {
                    onChange: handleKategori,
                  })}
                >
                  {pilihKategori.map((data) => (
                    <option key={data.kode} value={data.kode}>
                      {data.kode === ''
                        ? data.nama
                        : `${data.kode} - ${data.nama}`}
                    </option>
                  ))}
                </select>
                <Kesalahan errors={errors.kategori?.message} />
              </div>
              <div>
                <select
                  className={`${inputInisial} w-[120px] ${
                    errors.jenis
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  disabled={dataKategori ? false : true}
                  {...register('jenis', {
                    onChange: () => setJenis(getValues('jenis')),
                  })}
                >
                  <option value=''>Jenis</option>
                  <option value='1'>Fisik</option>
                  <option value='2'>Digital</option>
                </select>
                <Kesalahan errors={errors.jenis?.message} />
              </div>
              <div className=''>
                <input
                  type='text'
                  className={`${inputInisial} w-[150px] ${
                    errors.retensi
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  name='retensi'
                  placeholder='Retensi (tahun)'
                  inputMode='numeric'
                  onInput={hanyaAngka}
                  disabled={dataKategori ? false : true}
                  {...register('retensi')}
                />
                <Kesalahan errors={errors.retensi?.message} className='' />
              </div>
              <div className='w-full'>
                <select
                  className={`${inputInisial} w-full ${
                    errors.penyimpanan
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  {...register('penyimpanan')}
                  disabled={dataKategori !== '' && jenis === '1' ? false : true}
                >
                  <option value=''>Penyimpanan</option>
                </select>
                <Kesalahan errors={errors.penyimpanan?.message} />
              </div>
            </div>
            <div className='w-full'>
              <input
                type='text'
                className={`${inputInisial} w-full ${
                  errors.perihal
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                }`}
                placeholder='Perihal'
                  disabled={dataKategori ? false : true}
                {...register('perihal')}
              />
              <Kesalahan errors={errors.perihal?.message} />
            </div>
            <div className='h-[5rem]'>
              <textarea
                className={`h-[5rem] ${inputInisial}  w-full resize-none ${
                  errors.keterangan
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                }`}
                placeholder='Keterangan'
                  disabled={dataKategori ? false : true}
                {...register('keterangan')}
              />
              <Kesalahan errors={errors.keterangan?.message} />
            </div>
            <div className='flex gap-x-2'>
              <div className='w-[120px]'>
                <select
                  className={`${inputInisial} w-[120px] ${
                    errors.visibilitas
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  disabled={dataKategori !== '' && jenis === '2' ? false : true}
                  {...register('visibilitas', {
                    onChange: () => setVisibilitas(getValues('visibilitas')),
                  })}
                >
                  <option value=''>Visibilitas</option>
                  <option value='0'>Mati</option>
                  <option value='1'>Hidup</option>
                </select>
                <Kesalahan errors={errors.visibilitas?.message} />
              </div>
              <div className='w-full'>
                <input
                  type='text'
                  className={`${inputInisial} w-full ${
                    errors.pengguna
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  }`}
                  placeholder='Pengguna'
                  disabled={visibilitas === '1' && jenis === '2' ? false : true}
                  {...register('pengguna')}
                />
                <Kesalahan errors={errors.pengguna?.message} />
              </div>
            </div>
            <div className={`flex flex-col items-center justify-center`}>
              <input
                type='file'
                id='tambah-berkas'
                accept='.pdf'
                hidden
                {...register('berkas')}
              />
              <label
                htmlFor={`tambah-berkas`}
                className={`flex h-[2.5rem] w-[120px] cursor-copy items-center justify-center rounded-[5px] border-2 border-black`}
              >
                <span>Berkas</span>
                <IconCirclePlus className='h-[20px] w-[20px]' />
              </label>
              <Kesalahan errors={errors.berkas?.message} />
            </div>
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
