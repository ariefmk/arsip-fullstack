import { forwardRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { skemaKategoriTambah } from '@/lib/skema'
import { Input, Select } from '@/lib/formv2'
import { hurufKapital } from '@/lib/form'

const Tambah = forwardRef(function Tambah(props, ref) {
  const { listKode, setPesan, setToast } = props
  const [bidang, setBidang] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(skemaKategoriTambah(listKode)),
  })

  const tambahHandler = async (data) => {
    try {
      const kirim = await fetch('/api/kategori/tambah', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const { status, pesan } = await kirim.json()
      if (status === 200) {
        setPesan(pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      reset()
      setToast(true)
      router.refresh()
      ref.current.close()
      setBidang('')
    }
  }

  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box max-w-[400px]`}>
        <form
          className={`grid grid-cols-12 gap-2`}
          onSubmit={handleSubmit(tambahHandler)}
          autoComplete='off'
        >
          <h1 className={`col-span-12 text-center text-2xl font-bold`}>
            Tambah Kategori Arsip
          </h1>
          <Select
            divClass={`col-span-12 w-full place-self-start`}
            label='Bidang'
            name='tambah-bidang'
            register={register('bidang', {
              onChange: (e) => setBidang(e.target.value),
            })}
            errors={errors.bidang}
          >
            <option value=''>-</option>
            <option value='1'>Kesra & Pelayanan</option>
            <option value='2'>Pemerintahan</option>
            <option value='3'>Kewilayahan</option>
            <option value='4'>Keuangan</option>
            <option value='5'>Umum & Perencanaan</option>
          </Select>
          <Input
            divClass={`col-span-5 w-full place-self-start`}
            type='text'
            label='Kode Kategori'
            name='tambah-kode'
            maxLength='3'
            onInput={hurufKapital}
            disabled={!bidang}
            register={register('kode')}
            errors={errors.kode}
          />
          <Input
            divClass={`col-span-7 w-full place-self-start`}
            type='text'
            label='Nama Kategori'
            name='tambah-nama'
            disabled={!bidang}
            register={register('nama')}
            errors={errors.nama}
          />
          <Input
            divClass={`col-span-12 w-full place-self-start`}
            type='text'
            label='Keterangan'
            name='tambah-keterangan'
            disabled={!bidang}
            register={register('keterangan')}
            errors={errors.keterangan}
          />
          <div className={`col-span-12 flex justify-center gap-x-4`}>
            <TombolTambah disabled={!bidang} />
            <TombolReset
              disabled={!bidang}
              onClick={() => {
                reset()
                setBidang('')
              }}
            />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            reset()
            ref.current.close()
          }}
        />
      </div>
    </dialog>
  )
})

export default Tambah
