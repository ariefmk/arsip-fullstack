import { forwardRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCirclePlus } from '@tabler/icons-react'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { skemaArsipTambah } from '@/lib/skema'
import { Input, Select, Textarea } from '@/lib/formv2'
import { hanyaAngka } from '@/lib/form'
import { Kesalahan } from '@/lib/errors'
import ReactSelect from 'react-select'

const Tambah = forwardRef(function Tambah(props, ref) {
  const { datalist, pembuat, setPesan, setToast } = props
  const { kategori, penyimpanan } = datalist
  const kodeKategori = kategori.map((data) => data.kode)
  const kodePenyimpanan = penyimpanan.map((data) => data.kode)
  const [kategoriAktif, setKategoriAktif] = useState('')
  const [jenis, setJenis] = useState('')
  const [namaBerkas, setNamaBerkas] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skemaArsipTambah(kodeKategori, kodePenyimpanan)),
  })

  const kategoriHandler = (e) => {
    const kode = e.target.value
    if (kode) {
      const kategoriPilihan = kategori.find((data) => data.kode === kode)
      setValue('kode', kategoriPilihan.arsip)
      setKategoriAktif(kode)
    } else {
      setValue('kode', '')
      setValue('jenis', '')
      setValue('penyimpanan', '')
      setKategoriAktif('')
      setJenis('')
    }
  }

  const tambahHandler = async (data) => {
    const tanggal = new Date()
    data.retensi = new Date(
      tanggal.getFullYear() + data.retensi,
      tanggal.getMonth(),
      tanggal.getDate(),
      tanggal.getHours(),
      tanggal.getMinutes()
    ).toISOString()
    const formData = new FormData()
    formData.append('kode', data.kode)
    formData.append('kategori', data.kategori)
    formData.append('keterangan', data.keterangan)
    formData.append('jenis', data.jenis)
    formData.append('perihal', data.perihal)
    formData.append('retensi', data.retensi)
    if (data.jenis === '1') {
      formData.append('penyimpanan', data.penyimpanan)
    } else if (data.jenis==='2'){
      formData.append('berkas', data.berkas[0])
    }
    formData.append('pembuat', pembuat)

    try {
      const kirim = await fetch('/api/arsip/tambah', {
        method: 'POST',
        body: formData,
      })

      const { status, pesan } = await kirim.json()
      if (status===200) {
        setPesan(pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    }
    finally {
      reset()
            setKategoriAktif('')
            setJenis('')
            setNamaBerkas('')
      setToast(true)
      router.refresh()
      ref.current.close()
    }
  }
  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box max-w-[900px]`}>
        <form
          className={`grid grid-cols-12 gap-2`}
          autoComplete='off'
          onSubmit={handleSubmit(tambahHandler)}
        >
          <h1 className={`col-span-12 text-center text-2xl font-bold`}>
            Tambah Arsip
          </h1>
          <Input
            divClass={`col-span-2`}
            type='text'
            label='Kode Arsip'
            name='tambah-kode'
            disabled={true}
            register={register('kode')}
            errors={errors.kode}
          />
          <Select
            divClass={`col-span-3`}
            label='Kategori'
            name='tambah-kategori'
            register={register('kategori', {
              onChange: kategoriHandler,
            })}
            errors={errors.kategori}
          >
            <option value=''>-</option>
            {kategori.map((data) => (
              <option key={data.kode} value={data.kode}>
                {data.kode} - {data.nama}
              </option>
            ))}
          </Select>
          <Select
            divClass={`col-span-2`}
            label='Jenis Arsip'
            register={register('jenis', {
              onChange: (e) => setJenis(e.target.value),
              disabled: !kategoriAktif,
            })}
            errors={errors.jenis}
          >
            <option value=''>-</option>
            <option value='1'>Fisik</option>
            <option value='2'>Digital</option>
          </Select>
          <Input
            divClass={`col-span-2`}
            type='text'
            label='Retensi (tahun)'
            name='tambah-retensi'
            onInput={hanyaAngka}
            register={register('retensi', {
              disabled: !kategoriAktif,
            })}
            errors={errors.retensi}
          />
          <Select
            divClass={`col-span-3`}
            label='Penyimpanan Arsip Fisik'
            register={register('penyimpanan', {
              disabled: kategoriAktif !== '' && jenis === '1' ? false : true,
            })}
            errors={errors.penyimpanan}
          >
            <option value=''>-</option>
            {penyimpanan.map((data) => (
              <option key={data.kode} value={data.kode}>
                {data.kode} - {data.nama}
              </option>
            ))}
          </Select>
          <Input
            divClass={`col-span-12`}
            type='text'
            label='Perihal Arsip'
            name='tambah-perihal'
            register={register('perihal', {
              disabled: !kategoriAktif,
            })}
            errors={errors.perihal}
          />
          <Textarea
            divClass={`col-span-12`}
            label='Keterangan'
            register={register('keterangan', {
              disabled: !kategoriAktif,
            })}
            errors={errors.keterangan}
          />
          <div className={`col-span-12 flex flex-col items-center gap-2`}>
            <input
              type='file'
              id='tambah-berkas'
              accept='.pdf'
              hidden={true}
              {...register('berkas', {
                onChange: (e) => setNamaBerkas(e.target.files[0].name),
                disabled: kategoriAktif !== '' && jenis === '2' ? false : true,
              })}
            />
            <label
              htmlFor='tambah-berkas'
              className={`${
                kategoriAktif !== '' && jenis === '2'
                  ? 'cursor-copy'
                  : 'cursor-not-allowed bg-gray-200'
              } flex h-[2.5rem] w-[120px] cursor-copy items-center justify-center rounded-[5px] border-2 border-black`}
            >
              <span>Berkas</span>
              <IconCirclePlus className={`h-[20px] w-[20px]`} />
            </label>
            {namaBerkas && (
              <span
                className={`${
                  kategoriAktif !== '' && jenis === '2'
                    ? 'cursor-copy'
                    : 'cursor-not-allowed bg-gray-200'
                } daisy-badge-outline h-auto max-w-[120px] overflow-hidden truncate rounded-[10px] border-[1px] border-black px-[5px] py-[3px] text-center text-xs`}
              >
                {namaBerkas}
              </span>
            )}
            <Kesalahan errors={errors.berkas?.message} />
          </div>
          <div className={`col-span-12 flex justify-center gap-x-4`}>
            <TombolTambah />
            <TombolReset
              onClick={() => {
                reset()
                setKategoriAktif('')
                setJenis('')
                setNamaBerkas('')
              }}
            />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            reset()
            setKategoriAktif('')
            setJenis('')
            setNamaBerkas('')
            ref.current.close()
          }}
        />
      </div>
    </dialog>
  )
})

export default Tambah
