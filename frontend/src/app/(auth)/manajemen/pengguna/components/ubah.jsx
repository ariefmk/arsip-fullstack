import { forwardRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { IconCirclePlus } from '@tabler/icons-react'
import { Input, Select } from '@/lib/formv2'
import Info from '@/lib/info'

const Ubah = forwardRef(function Ubah(props, ref) {
  const { pengguna, setToast, setPesan } = props
  const { hak, nik, jabatan, bidang } = pengguna
  const router = useRouter()
  const [namaBerkas, setNamaBerkas] = useState('')
  const [tunggu, setTunggu] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValue,
    setValue,
  } = useForm({})

  const gambarHandler = (e) => {
    const berkas = e.target.files[0]
    setNamaBerkas(berkas.name)
  }

  useEffect(() => {
    setValue('nama', pengguna.nama)
    setValue('tanggal', pengguna.tanggal)
    setValue('kelamin', pengguna.kelamin)
    setValue('telepon', pengguna.telepon)
    setValue('alamat', pengguna.alamat)
  }, [setValue, pengguna])

  const kirimHandler = async (data) => {
    const formData = new FormData()
    formData.append('nik', nik)
    formData.append('nama', data.nama)
    formData.append('tanggal', data.tanggal)
    formData.append('kelamin', data.kelamin)
    formData.append('telepon', data.telepon)
    formData.append('alamat', data.alamat)
    formData.append('berkas', data.berkas[0])
    formData.append('kataSandi', data.kataSandi || null)
    try {
      setTunggu(true)
      const kirim = await fetch('/api/pengguna/ubah', {
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
      ref.current.close()
    }
  }
  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box max-w-[600px]`}>
        <form
          className={`grid grid-cols-3 gap-2`}
          onSubmit={handleSubmit(kirimHandler)}
        >
          <h1 className={`col-span-3 text-center text-2xl font-bold`}>
            Ubah Data pengguna
          </h1>
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Hak Akses'
            name='ubah-hak'
            readOnly={true}
            value={hak || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='NIK'
            name='ubah-nik'
            readOnly={true}
            value={nik || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='password'
            label='Kata Sandi'
            name='ubah-kataSandi'
            register={register('kataSandi')}
            errors={errors.kataSandi}
          />
          <h2 className={`col-span-3 text-center text-xl font-semibold`}>
            Data Pengguna
          </h2>
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Nama Lengkap'
            name='ubah-nama'
            register={register('nama')}
            errors={errors.nama}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Jabatan'
            name='ubah-jabatan'
            readOnly={true}
            value={jabatan || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Bidang'
            name='ubah-bidang'
            readOnly={true}
            value={bidang || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='date'
            label='Tanggal Lahir'
            name='ubah-tanggal'
            register={register('tanggal')}
            errors={errors.tanggal}
          />
          <Select
            divClass='col-span-1 w-full place-self-start'
            label='Jenis Kelamin'
            name='ubah-kelamin'
            register={register('kelamin')}
            errors={errors.kelamin}
          >
            <option value=''></option>
            <option value='1'>Laki-Laki</option>
            <option value='2'>Perempuan</option>
          </Select>
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Nomor Telepon'
            name='ubah-telepon'
            register={register('telepon')}
            errors={errors.telepon}
          />
          <Input
            divClass='col-span-3 w-full place-self-start'
            type='text'
            label='Alamat'
            name='ubah-alamat'
            register={register('alamat')}
            errors={errors.alamat}
          />
          <div className={`col-span-3 flex flex-col items-center gap-2`}>
            <input
              type='file'
              id='ubah-gambar'
              name='ubah-gambar'
              accept='image/*'
              hidden
              {...register('berkas', {
                onChange: gambarHandler,
              })}
            />
            <label
              htmlFor='ubah-gambar'
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
          <div className={`col-span-3 flex justify-center gap-x-4`}>
            <TombolSimpan />
            <TombolReset />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            ref.current.close()
          }}
        />
      </div>
    </dialog>
  )
})

export default Ubah
