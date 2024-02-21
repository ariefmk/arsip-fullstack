import { forwardRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { Input, Select, Textarea } from '@/lib/formv2'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { skemaArsipUbah } from '@/lib/skema'

const Ubah = forwardRef(function Ubah(props, ref) {
  const { arsip, penyimpanan, setPesan, setToast } = props
  const router = useRouter()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
 /*   defaultValues: {
      kode: arsip?.kode,
      kategori: arsip?.KategoriArsip.nama,
      jenis: arsip?.jenis,
      retensi: arsip?.retensi,
      perihal: arsip?.perihal,
      keterangan: arsip?.keterangan,
      penyimpanan: arsip?.penyimpanan,
    },*/
    resolver: yupResolver(skemaArsipUbah(penyimpanan?.map((data) => data.kode))),
  })

  useEffect(() => {
    setValue('kode', arsip?.kode)
    setValue('kategori', arsip?.KategoriArsip.nama)
    setValue('jenis', arsip?.jenis)
    setValue('retensi', arsip?.retensi)
    setValue('perihal', arsip?.perihal)
    setValue('keterangan', arsip?.keterangan)
    setValue('penyimpanan', arsip?.penyimpanan)
  }, [setValue, arsip])
  const kirimHandler = async (data) => {
    try {
      const kirim = await fetch('/api/arsip/ubah', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kode: arsip?.kode,
          perihal: data.perihal,
          keterangan: data.keterangan,
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
      reset({ ...arsip })
    }
  }
  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box max-w-[900px]`}>
        <form
          className={`grid grid-cols-12 gap-2`}
          onSubmit={handleSubmit(kirimHandler)}
          autoComplete='off'
        >
          <h1 className={`col-span-12 text-center text-2xl font-bold`}>
            Ubah Data Arsip
          </h1>
          <Input
            divClass={`col-span-2`}
            type='text'
            label='Kode Arsip'
            name='ubah-kode'
            register={register('kode', { disabled: true })}
            errors={errors.kode}
          />
          <Input
            divClass={`col-span-3`}
            type='text'
            label='Kategori'
            name='ubah-kategori'
            register={register('kategori', { disabled: true })}
            errors={errors.kategori}
          />
          <Input
            divClass={`col-span-2`}
            type='text'
            label='Jenis Arsip'
            name='ubah-jenis'
            register={register('jenis', { disabled: true })}
            errors={errors.jenis}
          />
          <Input
            divClass={`col-span-2`}
            type='date'
            label='Retensi Arsip'
            name='ubah-retensi'
            register={register('retensi', { disabled: true })}
            errors={errors.retensi}
          />
          {arsip?.jenis === 'Fisik' ? (
            <Select
              divClass={`col-span-3`}
              label='Penyimpanan Arsip Fisik'
              name='ubah-penyimpanan'
              disabled={false}
              register={register('penyimpanan')}
              errors={errors.penyimpanan}
            >
              <option value=''>-</option>
              {penyimpanan.map((data) => (
                <option key={data.kode} value={data.kode}>
                  {data.kode} - {data.nama}
                </option>
              ))}
            </Select>
          ) : (
            <Input
              divClass={`col-span-3`}
              type='text'
              label='Penyimpanan Arsip Fisik'
              name='ubah-retensi'
              register={register('penyimpanan', { disabled: true })}
              errors={errors.penyimpanan}
            />
          )}
          <Input
            divClass={`col-span-12`}
            type='text'
            label='Perihal Arsip'
            name='ubah-perihal'
            register={register('perihal')}
            errors={errors.perihal}
          />
          <Textarea
            divClass={`col-span-12`}
            label='Keterangan'
            name='ubah-keterangan'
            register={register('keterangan')}
            errors={errors.keterangan}
          />
          <div className={`col-span-12 flex justify-center gap-x-4`}>
            <TombolSimpan />
            <TombolReset
              onClick={() => {
                reset({ ...arsip })
              }}
            />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            reset({ ...arsip })
            ref.current.close()
          }}
        />
      </div>
    </dialog>
  )
})
export default Ubah
