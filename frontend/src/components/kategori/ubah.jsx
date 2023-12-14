import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { inputInisial } from '@/lib/class'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'

export default function Ubah({ referensi, data }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

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
      router.refresh()
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
          <div className={`flex flex-col gap-y-3`}>
            <div className={`w-full`}>
              <input
                type='text'
                placeholder='Bidang'
                disabled={true}
                className={`${inputInisial} w-full border-black`}
                {...register('bidang')}
              />
            </div>
            <div className={`flex gap-x-3`}>
              <div className={`w-[150px]`}>
                <input
                  placeholder='Kode Kategori'
                  disabled={true}
                  className={`${inputInisial} w-full border-black`}
                  {...register('kode')}
                />
              </div>
              <div className={`w-full`}>
                <input
                  type='text'
                  placeholder='Nama Kategori'
                  className={`${inputInisial} ${
                    errors.kategori
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  {...register('kategori')}
                />
                <Kesalahan errors={errors.kategori?.message} />
              </div>
            </div>
            <div className={`w-full`}>
              <input
                type='text'
                placeholder='Keterangan'
                className={`${inputInisial} ${
                  errors.keterangan
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                {...register('keterangan')}
              />
              <Kesalahan errors={errors.keterangan?.message} />
            </div>
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
