import { forwardRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { IconCirclePlus } from '@tabler/icons-react'
import { hanyaAngka } from '@/lib/form'
import { skemaPenggunaTambah } from '@/lib/skema'
import { TutupModal, TombolTambah, TombolReset } from '@/lib/button'
import { Input, Select } from '@/lib/formv2'

const Tambah = forwardRef(function Tambah(props, ref) {
  const { nik, setToast, setPesan } = props
  const [namaBerkas, setNamaBerkas] = useState('')
  const [akses, setAkses] = useState('')
  const [jabatan, setJabatan] = useState('')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(skemaPenggunaTambah(nik)),
  })

  const gambarHandler = (e) => {
    const berkas = e.target.files[0]
    setNamaBerkas(berkas.name)
  }

  const resetHandler = () => {
    reset()
    setNamaBerkas('')
    setAkses('')
    setJabatan('')
  }

  const tambahHandler = async (data) => {
    const formData = new FormData()
    formData.append('hak', data.hak)
    formData.append('nik', data.nik)
    formData.append('kataSandi', data.kataSandi)
    formData.append('nama', data.nama)
    formData.append('tanggal', data.tanggal.toISOString())
    formData.append('kelamin', data.kelamin)
    formData.append('telepon', data.telepon)
    formData.append('alamat', data.alamat)
    formData.append('bidang', data.bidang)
    formData.append('jabatan', data.jabatan)
    formData.append('berkas', data.berkas[0])
    try {
      setAkses(true)
      const kirim = await fetch('/api/pengguna/tambah', {
        method: 'POST',
        body: formData
      })
      const respon = await kirim.json()
      if (respon.status === 200) {
        setPesan(respon.pesan)
      }

    } catch {
      setPesan('Kesalahan Internal')
    }
    finally {
      reset()
      setToast(true)
      router.refresh()
      setAkses(false)
      setNamaBerkas('')
      ref.current.close()
    }
  }
  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box max-w-[600px]`}>
        <form
          className={`grid grid-cols-3 gap-2`}
          onSubmit={handleSubmit(tambahHandler)}
          autoComplete='off'
        >
          <h1 className={`col-span-3 text-center text-2xl font-bold`}>
            Tambah Pengguna
          </h1>
          <Select
            divClass={`col-span-1 w-full place-self-start`}
            label='Hak Akses'
            name='tambah-hak'
            register={register('hak', {
              onChange: (e) => {
                setAkses(e.target.value)
                if (getValues('hak') !== 'Standar') {
                  setValue('jabatan', '')
                  setValue('bidang', '')
                }
              },
            })}
            errors={errors.hak}
          >
            <option value=''>-</option>
            <option value='Admin'>Admin</option>
            <option value='Standar'>Standar</option>
          </Select>
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='NIK'
            name='tambah-nik'
            maxLength={16}
            onInput={hanyaAngka}
            disabled={akses ? false : true}
            register={register('nik')}
            errors={errors.nik}
          />
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='password'
            label='Kata Sandi'
            name='tambah-sandi'
            disabled={akses ? false : true}
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
            name='tambah-nama'
            disabled={akses ? false : true}
            register={register('nama')}
            errors={errors.nama}
          />
          <Select
            divClass={`col-span-1 w-full place-self-start`}
            label='Jabatan'
            name='tambah-jabatan'
            disabled={akses === 'Standar' ? false : true}
            register={register('jabatan', {
              onChange: (e) => {
                setJabatan(e.target.value)
                getValues('jabatan') !== 'Kepala Bidang' &&
                  setValue('bidang', '')
              },
            })}
            errors={errors.jabatan}
          >
            <option value=''>-</option>
            <option value='Kepala Desa'>Kepala Desa</option>
            <option value='Sekretaris'>Sekretaris</option>
            <option value='Kepala Bidang'>Kepala Bidang</option>
          </Select>
          <Select
            divClass={`col-span-1 w-full place-self-start`}
            label='Bidang'
            name='tambah-bidang'
            disabled={
              akses === 'Standar' && jabatan === 'Kepala Bidang' ? false : true
            }
            register={register('bidang')}
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
            divClass={`col-span-1 w-full place-self-start`}
            type='date'
            label='Tanggal Lahir'
            name='tambah-tanggal'
            disabled={akses ? false : true}
            register={register('tanggal')}
            errors={errors.tanggal}
          />
          <Select
            divClass={`col-span-1 w-full place-self-start`}
            label='Jenis Kelamin'
            name='tambah-kelamin'
            disabled={!akses}
            register={register('kelamin')}
            errors={errors.kelamin}
          >
            <option value=''>-</option>
            <option value='1'>Laki-Laki</option>
            <option value='2'>Perempuan</option>
          </Select>
          <Input
            divClass={`col-span-1 w-full place-self-start`}
            type='text'
            label='Nomor Telepon'
            name='tambah-telepon'
            onInput={hanyaAngka}
            inputMode='numeric'
            disabled={!akses}
            register={register('telepon')}
            errors={errors.telepon}
          />
          <Input
            divClass={`col-span-3 w-full place-self-start`}
            type='text'
            label='Alamat'
            name='tambah-alamat'
            disabled={!akses}
            register={register('alamat')}
            errors={errors.alamat}
          />
          <div className={`col-span-3 flex flex-col items-center gap-2`}>
            <input
              type='file'
              id='tambah-gambar'
              name='tambah-gambar'
              accept='image/*'
              hidden={true}
              {...register('berkas', {
                onChange: gambarHandler,
                disabled: !akses
              })}
            />
            <label
              htmlFor='tambah-gambar'
              className={`${
                akses
                  ? 'cursor-copy bg-white'
                  : 'cursor-not-allowed bg-gray-200'
              } flex h-[2.5rem] w-[120px] cursor-copy items-center justify-center rounded-[5px] border-2 border-black`}
            >
              <span>Foto Profil</span>
              <IconCirclePlus className={`h-[20px] w-[20px]`} />
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
            <TombolTambah disabled={akses ? false : true} />
            <TombolReset
              disabled={akses ? false : true}
              onClick={resetHandler}
            />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            reset()
            setAkses('')
            setJabatan('')
            ref.current.close()
          }}
        />
      </div>
    </dialog>
  )
})

export default Tambah
