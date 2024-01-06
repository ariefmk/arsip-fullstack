import { forwardRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { Input } from '@/lib/formv2'

const Ubah = forwardRef(function Ubah(props, ref) {
  const { penyimpanan, setToast, setPesan } = props
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue('bidang', penyimpanan.bidang)
    setValue('kode', penyimpanan.kode)
    setValue('nama', penyimpanan.nama)
    setValue('keterangan', penyimpanan.keterangan)
    setValue('lokasi', penyimpanan.lokasi)
  }, [setValue, penyimpanan])

  const kirimHandler = async (data) => {
    try {
      const kirim = await fetch('/api/penyimpanan/ubah', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kode: data.kode,
          nama: data.nama,
          keterangan: data.keterangan,
          lokasi: data.lokasi,
        }),
      })
      const { status, pesan } = await kirim.json()
      if (status === 200) {
        setPesan(pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      setToast(true)
      router.refresh()
      ref.current.close()
    }
  }

  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box max-w-[440px]`}>
        <form
          className={`grid grid-cols-12 gap-2`}
          onSubmit={handleSubmit(kirimHandler)}
          autoComplete='off'
        >
          <h1 className={`col-span-12 text-center text-2xl font-bold`}>
            Ubah Penyimpanan Arsip
          </h1>
          <Input
            divClass={`col-span-12 w-full place-self-start`}
            type='text'
            label='Bidang'
            name='ubah-bidang'
            disabled={true}
            register={register('bidang')}
            errors={errors.bidang}
          />
          <Input
            divClass={`col-span-5 w-full place-self-start`}
            type='text'
            label='Kode Penyimpanan'
            name='ubah-kode'
            disabled={true}
            register={register('kode')}
            errors={errors.kode}
          />
          <Input
            divClass={`col-span-7 w-full place-self-start`}
            type='text'
            label='Nama Penyimpanan'
            name='ubah-nama'
            register={register('nama')}
            errors={errors.nama}
          />
          <Input
            divClass={`col-span-12 w-full place-self-start`}
            type='text'
            label='Keterangan'
            name='ubah-keterangan'
            register={register('keterangan')}
            errors={errors.keterangan}
          />
          <Input
            divClass={`col-span-12 w-full place-self-start`}
            type='text'
            label='Informasi Lokasi Penyimpanan'
            name='ubah-lokasi'
            register={register('lokasi')}
            errors={errors.lokasi}
          />
          <div className={`col-span-12 flex justify-center gap-x-4`}>
            <TombolSimpan />
            <TombolReset
              onClick={() => {
                reset({ ...penyimpanan })
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

export default Ubah
