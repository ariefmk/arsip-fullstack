'use client'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { useRef, useState, useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { TombolSimpan } from '@/lib/button'
import { inputInisial } from '@/lib/class'
import { IconCirclePlus, IconUserCircle, IconX } from '@tabler/icons-react'
import { skemaProfil, skemaSandi } from '@/lib/skema'
import { Kesalahan } from '@/lib/errors'

export default function Profil({ pengguna }) {
  const router = useRouter()
  const {
    register: registerProfil,
    handleSubmit: handleSubmitProfil,
    formState: { errors: errorsProfil },
    reset: resetProfil,
    getValues: getValuesProfil,
    setValue: setValueProfil,
  } = useForm({ resolver: yupResolver(skemaProfil()) })

  const {
    register: registerSandi,
    handleSubmit: handleSubmitSandi,
    formState: { errors: errorsSandi },
    reset: resetSandi,
    getValues: getValuesSandi,
    setValue: setValueSandi,
  } = useForm({ resolver: yupResolver(skemaSandi()) })

  useEffect(() => {
    setValueProfil('nama', pengguna.nama)
    setValueProfil('tanggal', pengguna.tanggal)
    setValueProfil('kelamin', pengguna.kelamin)
    setValueProfil('telepon', pengguna.telepon)
    setValueProfil('alamat', pengguna.alamat)
  }, [setValueProfil, pengguna])

  const ubahProfil = (data) => {
    const formData = new FormData()
    formData.append('nama', data.nama)
    formData.append('tanggal', data.tanggal.toISOString())
    formData.append('kelamin', data.kelamin)
    formData.append('telepon', data.telepon)
    formData.append('alamat', data.alamat)
    fetch(`/api/profil/data/${pengguna.nik}`, {
      method: 'PUT',
      body: formData,
    }).then((hasil) => {
      router.refresh()
    })
  }
  const ubahSandi = (data) => {
    console.log(data)
    const formData = new FormData()
    formData.append('sandiBaru', data.baru)
    fetch(`/api/profil/sandi/${pengguna.nik}`, {
      method: 'PUT',
      body: formData
    }).then((hasil) => {
      router.refresh()
      resetSandi()
    })
  }

  return (
    <div className={`flex justify-center`}>
      <div
        className={`mt-[4rem] flex w-[600px] flex-col items-center justify-center gap-y-4`}
      >
        <div>
          <div
            className={`h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-100`}
          >
            {JSON.stringify(pengguna.gambar) !== '{}' ? (
              <Image
                src={`data:image/*;base64,${pengguna.gambar.media}`}
                alt='Gambar profil'
                width={pengguna.gambar.width}
                height={pengguna.gambar.height}
                className={`rounded-full`}
              />
            ) : (
              <IconUserCircle
                color='#0362a1'
                stroke={1.2}
                className='h-full w-full'
              />
            )}
          </div>
        </div>
        <div
          className={`rounded-[10px] border-2 border-black px-[20px] py-[10px]`}
        >
          <form
            className={`flex flex-col gap-y-2`}
            onSubmit={handleSubmitProfil(ubahProfil)}
          >
            <div className='flex gap-x-2'>
              <div className={`w-full`}>
                <input
                  type='text'
                  className={`${inputInisial} ${
                    errorsProfil.nama
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  placeholder='Nama Lengkap'
                  {...registerProfil('nama')}
                />
                <Kesalahan errors={errorsProfil.nama?.message} />
              </div>
              <div className={`w-full`}>
                <input
                  type='text'
                  className={`${inputInisial} w-full border-black`}
                  placeholder='Jabatan'
                  value={pengguna.jabatan ? pengguna.jabatan : ''}
                  disabled={true}
                  readOnly
                />
              </div>
              <div className={`w-full`}>
                <input
                  type='text'
                  className={`${inputInisial} w-full border-black`}
                  placeholder='Bidang'
                  value={pengguna.bidang ? pengguna.bidang : ''}
                  disabled={true}
                  readOnly
                />
              </div>
            </div>
            <div className='flex gap-x-2'>
              <div className={`w-full`}>
                <input
                  type='date'
                  className={`${inputInisial} ${
                    errorsProfil.tanggal
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  placeholder='Tanggal Lahir'
                  {...registerProfil('tanggal')}
                />
                <Kesalahan errors={errorsProfil.tanggal?.message} />
              </div>
              <div className={`w-full`}>
                <select
                  className={`${inputInisial} ${
                    errorsProfil.kelamin
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  {...registerProfil('kelamin')}
                >
                  <option value=''>Jenis Kelamin</option>
                  <option value='1'>Laki-Laki</option>
                  <option value='2'>Perempuan</option>
                </select>
                <Kesalahan errors={errorsProfil.kelamin?.message} />
              </div>
              <div className={`w-full`}>
                <input
                  type='text'
                  className={`${inputInisial} ${
                    errorsProfil.telepon
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  placeholder='Nomor Telepon'
                  {...registerProfil('telepon')}
                />
                <Kesalahan errors={errorsProfil.telepon?.message} />
              </div>
            </div>
            <div>
              <input
                type='text'
                className={`${inputInisial} ${
                  errorsProfil.alamat
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                placeholder='Alamat'
                {...registerProfil('alamat')}
              />
              <Kesalahan errors={errorsProfil.alamat?.message} />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <input
                type='file'
                id={`ubah-foto`}
                accept='image/*'
                hidden
                {...registerProfil('gambar')}
              />
              <label
                htmlFor={`ubah-foto`}
                className={`flex h-[2.5rem] w-[120px] cursor-copy items-center justify-center rounded-[5px] border-2 border-black`}
              >
                <span>Foto Profil</span>
                <IconCirclePlus className='h-[20px] w-[20px]' />
              </label>
            </div>
            <div className={`flex flex-col items-center justify-center`}>
              <TombolSimpan />
            </div>
          </form>
        </div>
        <div
          className={`rounded-[10px] border-2 border-black px-[20px] py-[10px]`}
        >
          <form
            className='flex flex-col gap-y-2'
            onSubmit={handleSubmitSandi(ubahSandi)}
          >
            <div className={`flex flex-row gap-x-2`}>
              <div className={`w-full`}>
                <input
                  type='text'
                  className={`${inputInisial} w-full border-black`}
                  placeholder='NIK'
                  value={pengguna.nik}
                  readOnly
                  disabled={true}
                />
              </div>
              <div className={`w-full`}>
                <input
                  type='password'
                  className={`${inputInisial} ${
                    errorsSandi.baru
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  autoComplete='new-password'
                  placeholder='Kata Sandi Baru'
                  {...registerSandi('baru')}
                />
                <Kesalahan errors={errorsSandi.baru?.message} />
              </div>
              <div className={`w-full`}>
                <input
                  type='password'
                  className={`${inputInisial} ${
                    errorsSandi.konfirmasi
                      ? 'border-error'
                      : 'border-black focus:border-green-500'
                  } w-full`}
                  autoComplete='new-password'
                  placeholder='Konfirmasi Kata Sandi Baru'
                  {...registerSandi('konfirmasi')}
                />
                <Kesalahan errors={errorsSandi.konfirmasi?.message} />
              </div>
            </div>
            <div className={`flex flex-col items-center justify-center`}>
              <TombolSimpan />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
