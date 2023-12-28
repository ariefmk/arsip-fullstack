import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { skemaArsipUbah } from '@/lib/skema'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { inputInisial } from '@/lib/class'
import { hanyaAngka } from '@/lib/form'
import { Kesalahan } from '@/lib/errors'
import Input from '@/lib/form/input'
import Textarea from '@/lib/form/textarea'

export default function Ubah({ referensi, data, penyimpanan }) {
  const router = useRouter()
  const [visibilitas, setVisibilitas] = useState('')

  const [pilihPenyimpanan, setPilihPenyimpanan] = useState([
    { kode: '', nama: 'Penyimpanan Fisik' },
    ...penyimpanan,
  ])
  const listPenyimpanan = penyimpanan.map((data) => {
    return data.kode
  })
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(skemaArsipUbah(listPenyimpanan)) })
  useEffect(() => {
    setValue('kode', data.kode)
    setValue('jenis', data.jenis)
    setValue('retensi', data.retensi)
    if (data.penyimpanan !== null) {
      setValue('penyimpanan', data.penyimpanan)
    }
    setValue('perihal', data.nama)
    setValue('keterangan', data.keterangan)
    if (data.visibilitas !== null) {
      setValue('visibilitas', data.visibilitas ? '1' : '0')
    } else {
      setValue('visibilitas', '')
    }

    data.kategori &&
      setValue('kategori', `${data.kategori.kode}-${data.kategori.nama}`)
  }, [setValue, data])

  const selectStyles = {
    option: (styles, state) => {
      return {
        ...styles,
      }
    },
    control: (styles, state) => {
      return {
        alignItems: 'center',
        backgroundColor: state.isDisabled ? '#e5e7eb' : '#fff',
        borderColor: state.isFocused ? '#22c55e' : 'black',
        borderRadius: 5,
        borderWidth: 2,
        boxShadow: undefined,
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        label: 'control',
        minHeight: 38,
        position: 'relative',
        transition: 'all 100ms',
        color: 'black',
      }
    },
    indicatorSeparator: (styles) => {
      return null
    },
    input: (styles) => {
      return {
        ...styles,
        color: 'black',
      }
    },
    placeholder: (styles) => {
      return { ...styles, color: 'black' }
    },
    dropdownIndicator: (styles) => {
      return {
        ...styles,
        ':hover': {
          color: 'black',
        },
        color: 'black',
      }
    },
    menu: (styles) => {
      return { ...styles, zIndex: 10, position: 'absolute' }
    },
    menuList: (styles) => {
      return { ...styles, maxHeight: '100px' }
    },
  }
  const ubahArsip = (datalist) => {
    const list = {
      perihal: datalist.perihal,
      keterangan: datalist.keterangan,
    }

    fetch('/api/arsip/ubah', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(list),
    }).then(() => {
      router.refresh()
    })
  }

  return (
    <dialog
      className={`modal-ubah-arsip daisy-modal backdrop-blur-[2px]`}
      ref={referensi}
    >
      <div className={`daisy-modal-box max-w-[900px]`}>
        <form
          className={`flex flex-col gap-y-3`}
          onSubmit={handleSubmit(ubahArsip)}
        >
          <h1 className='text-center text-2xl font-bold'>Ubah Arsip</h1>
          <div className={`grid grid-cols-12 gap-3`}>
            <Input
              divClass={`col-span-2`}
              type='text'
              name='kode-arsip'
              placeholder='Kode Arsip'
              disabled={true}
              errors={errors.kode}
              register={register('kode')}
              label={true}
            />
            <Input
              divClass={`col-span-3`}
              type='text'
              name='kategori'
              placeholder='Kategori'
              disabled={true}
              register={register('kategori')}
              label={true}
            />
            <Input
              divClass={`col-span-2`}
              type='text'
              name='Jenis'
              placeholder='Jenis Arsip'
              disabled={true}
              register={register('jenis')}
              label={true}
            />
            <Input
              divClass={`col-span-2`}
              type='date'
              name='retensi'
              placeholder='Retensi Arsip'
              disabled={true}
              register={register('retensi')}
              label={true}
            />
            <div className={`col-span-3`}>
              <select
                className={`${inputInisial} ${
                  errors.penyimpanan
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                {...register('penyimpanan')}
                disabled={data.jenis === 'Fisik' ? false : true}
              >
                {pilihPenyimpanan.map((data) => (
                  <option key={data.kode} value={data.kode}>
                    {data.kode === ''
                      ? data.nama
                      : `${data.kode} - ${data.nama}`}
                  </option>
                ))}
              </select>
              <Kesalahan errors={errors.penyimpanan?.message} />
            </div>
            <Input
              divClass={`col-span-12`}
              type='text'
              name='perihal'
              placeholder='Perihal Arsip'
              register={register('perihal')}
              errors={errors.perihal}
              label={true}
            />
            <Textarea
              divClass={`col-span-12`}
              placeholder='Keterangan'
              register={register('keterangan')}
              errors={errors.keterangan}
              label={true}
            />
            <div className={`col-span-2`}>
              <select
                className={`${inputInisial} ${
                  errors.visibilitas
                    ? 'border-error'
                    : 'border-black focus:border-green-500'
                } w-full`}
                {...register('visibilitas', {
                  onChange: () => {
                    setVisibilitas(getValues('visibilitas'))
                  },
                })}
                disabled={data.jenis === 'Digital' ? false : true}
              >
                <option value=''>Visibilitas</option>
                <option value='0'>Mati</option>
                <option value='1'>Hidup</option>
              </select>
              <Kesalahan errors={errors.visibilitas?.message} />
            </div>
            <div
              className={`${
                visibilitas === '1' ? 'cursor-default' : 'cursor-not-allowed'
              } col-span-10`}
            >
              <Select
                instanceId={`ubah-pengguna`}
                placeholder='Yang dapat melihat'
                styles={selectStyles}
                isMulti={true}
                isDisabled={visibilitas === '1' ? false : true}
              />
            </div>
          </div>
          <div className='flex justify-center gap-x-4'>
            <TombolSimpan />
            <TombolReset />
          </div>
        </form>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      {/*
      <button
        onClick={() => {
          referensi.current.close()
        }}
        className={`daisy-modal-backdrop`}
      />*/}
    </dialog>
  )
}
