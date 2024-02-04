'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { IconCirclePlus } from '@tabler/icons-react'
import { skemaProfil } from '@/lib/skema'
import { TombolSimpan, TombolReset } from '@/lib/button'
import { Input, Select } from '@/lib/formv2'
import { hanyaAngka } from '@/lib/form'
import Info from '@/lib/info'

export default function Profil(props) {
  const router = useRouter()
  const { pengguna } = props
  const { nik, nama, jabatan, bidang, tanggal, kelamin, telepon, alamat } =
    pengguna
  const [tunggu, setTunggu] = useState(false)
  const [pesan, setPesan] = useState('')
  const [toast, setToast] = useState(false)
  const [namaBerkas, setNamaBerkas] = useState('')

  const {
    register,
    unregister,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(skemaProfil()),
    defaultValues: {
      nama,
      tanggal,
      kelamin,
      telepon,
      alamat,
    },
  })

  useEffect(() => {
    setValue('nama', nama)
    setValue('tanggal', tanggal)
    setValue('kelamin', kelamin)
    setValue('telepon', telepon)
    setValue('alamat', alamat)
  }, [setValue, nama, tanggal, kelamin, telepon, alamat])

  const profilHandler = async (data) => {
    const formData = new FormData()
    formData.append('namaLengkap', data.nama)
    formData.append('tanggalLahir', data.tanggal.toISOString())
    formData.append('jenisKelamin', data.kelamin)
    formData.append('nomorTelepon', data.telepon)
    formData.append('alamatRumah', data.alamat)
    formData.append('berkas', data.berkas[0])
    try {
      setTunggu(true)
      const kirim = await fetch(`/api/profil/data?nik=${nik}`, {
        method: 'PUT',
        body: formData,
      })
      const respon = await kirim.json()
      if (respon.status === 200) {
        setPesan(respon.pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      setToast(true)
      router.refresh()
      setTunggu(false)
      setNamaBerkas('')
    }
  }

  const gambarHandler = (e) => {
    const berkas = e.target.files[0]
    if (berkas) {
      setNamaBerkas(berkas.name)
    }
  }

  return (
    <div className={`rounded-[10px] border-2 border-black px-[20px] py-[10px]`}>
      <form
        className={`grid grid-cols-3 place-items-center gap-2`}
        onSubmit={handleSubmit(profilHandler)}
      >
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='text'
          label='Nama Lengkap'
          name='nama'
          register={register('nama')}
          errors={errors.nama}
        />
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='text'
          label='Jabatan'
          name='jabatan'
          readOnly={true}
          value={jabatan ? jabatan : 'Tidak Ada'}
        />
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='text'
          label='Bidang'
          name='bidang'
          readOnly={true}
          value={bidang ? bidang : 'Tidak Ada'}
        />
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='date'
          label='Tanggal Lahir'
          name='tanggal'
          register={register('tanggal')}
          errors={errors.tanggal}
        />
        <Select
          divClass='col-span=1 w-full place-self-start'
          label='Jenis Kelamin'
          name='kelamin'
          register={register('kelamin')}
          errors={errors.kelamin}
        >
          <option value=''></option>
          <option value='1'>Laki-Laki</option>
          <option value='2'>Perempuan</option>
        </Select>
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='text'
          label='Nomor Telepon'
          name='telepon'
          onInput={hanyaAngka}
          register={register('telepon')}
          errors={errors.telepon}
        />
        <Input
          divClass='col-span-3 w-full place-self-start'
          type='text'
          label='Alamat'
          name='alamat'
          register={register('alamat')}
          errors={errors.alamat}
        />
        <div className={`col-span-3 flex flex-col items-center gap-2`}>
          <input
            type='file'
            id='gambar'
            name='gambar'
            accept='image/*'
            hidden
            {...register('berkas', {
              onChange: gambarHandler,
            })}
          />
          <label
            htmlFor='gambar'
            className={`flex h-[2.5rem] w-[120px] cursor-copy items-center justify-center rounded-[5px] border-2 border-black bg-white`}
          >
            <span>Foto Profil</span>
            <IconCirclePlus className='h-[20px] w-[20px]' />
          </label>
          {namaBerkas && (
            <span
              className={`daisy-badge-outline h-auto max-w-[120px] overflow-hidden truncate rounded-[10px] border-[1px] border-black px-[5px] py-[3px] text-center text-xs`}
            >
              {namaBerkas}
            </span>
          )}
        </div>
        <div className={`col-span-3 flex gap-4`}>
          <TombolSimpan disabled={tunggu} />
          <TombolReset
            onClick={() => {
              reset()
              setNamaBerkas('')
            }}
          />
        </div>
      </form>
      {toast && <Info pesan={pesan} info={{ toast, setToast }} />}
    </div>
  )
}
