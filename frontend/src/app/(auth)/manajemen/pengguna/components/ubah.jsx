import { forwardRef, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { IconCirclePlus } from '@tabler/icons-react'
import { Input, Select } from '@/lib/formv2'

const Ubah = forwardRef(function Ubah(props, ref) {
  const { pengguna } = props
  const { hak, nik, jabatan, bidang } = pengguna
  const [namaBerkas, setNamaBerkas] = useState('')

  const {
    register,
    handleSubmmit,
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
  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box max-w-[600px]`}>
        <form className={`grid grid-cols-3 gap-2`}>
          <h1 className={`col-span-3 text-center text-2xl font-bold`}>
            Ubah Data pengguna
          </h1>
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Hak Akses'
            name='hak'
            readOnly={true}
            value={hak || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='NIK'
            name='nik'
            readOnly={true}
            value={nik || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='password'
            label='Kata Sandi'
            name='kataSandi'
          />
          <h2 className={`col-span-3 text-center text-xl font-semibold`}>
            Data Pengguna
          </h2>
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Nama Lengkap'
            name='nama'
            register={register('nama')}
            errors={errors.nama}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Jabatan'
            name='jabatan'
            readOnly={true}
            value={jabatan || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Bidang'
            name='bidang'
            readOnly={true}
            value={bidang || ''}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
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
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Nomor Telepon'
            name='telepon'
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
                onChange: gambarHandler
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
