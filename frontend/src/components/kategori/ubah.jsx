import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { skemaKategoriUbah } from '@/lib/skema'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'
import Input from '@/lib/form/input'

export default function Ubah({ referensi, data }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(skemaKategoriUbah()),
  })

  useEffect(() => {
    setValue('bidang', data.bidang)
    setValue('kode', data.kode)
    setValue('kategori', data.kategori)
    setValue('keterangan', data.keterangan)
  }, [setValue, data])

  const ubahKategori = (dataUbah) => {
    dataUbah = {
      kode: dataUbah.kode,
      kategori: dataUbah.kategori,
      keterangan: dataUbah.keterangan,
    }
    fetch('/api/kategori/ubah', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataUbah),
    }).then(() => {
      referensi.current.close()
      router.refresh()
      reset()
    })
  }
  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={referensi}>
      <div className={`daisy-modal-box max-w-[400px]`}>
        <form
          className={`flex flex-col gap-y-3`}
          onSubmit={handleSubmit(ubahKategori)}
        >
          <h1 className={`text-center text-2xl font-bold`}>
            Ubah Kategori Arsip
          </h1>
          <div className={`grid grid-cols-8 gap-3`}>
            <Input
              divClass={`col-span-8`}
              type='text'
              name='bidang'
              placeholder='Bidang'
              disabled={true}
              register={register('bidang')}
              label={true}
            />
            <Input
              divClass={`col-span-3`}
              type='text'
              name='kode'
              placeholder='Kode Kategori'
              disabled={true}
              className={`${inputInisial} w-full border-black`}
              register={register('kode')}
              label={true}
            />
            <Input
              divClass={`col-span-5`}
              type='text'
              name='kategori'
              placeholder='Nama Kategori'
              register={register('kategori')}
              errors={errors.kategori}
              label={true}
            />
            <Input
              divClass={`col-span-8`}
              type='text'
              name='keterangan'
              placeholder='Keterangan'
              register={register('keterangan')}
              errors={errors.keterangan}
              label={true}
            />
          </div>
          <div className={`flex justify-center gap-x-4`}>
            <TombolSimpan />
            <TombolReset
              onClick={() => {
                reset({ ...data })
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
