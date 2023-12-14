import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TutupModal, TombolSimpan, TombolReset } from '@/lib/button'
import { inputInisial } from '@/lib/class'
import { hanyaAngka } from '@/lib/form'
import { Kesalahan } from '@/lib/errors'

export default function Ubah({ referensi, data, penyimpanan }) {
  const [visibilitas, setVisibilitas] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm()

  const [pilihPenyimpanan, setPilihPenyimpanan] = useState([
    { kode: '', nama: 'Penyimpanan' },
    ...penyimpanan,
  ])
  useEffect(() => {
    setValue('kode', data.kode)
    setValue('jenis', data.jenis)
    setValue('retensi', data.retensi)
    setValue('penyimpanan', data.penyimpanan)
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

  return (
    <dialog className={`modal-ubah-arsip daisy-modal backdrop-blur-[2px]`} ref={referensi}>
      <div className={`daisy-modal-box max-w-[900px]`}>
        <form className={`flex flex-col gap-y-3`}>
          <h1 className='text-center text-2xl font-bold'>Ubah Arsip</h1>
          <div className={`grid grid-cols-12 gap-3`}>
            <div className={`col-span-2`}>
              <input
                type='text'
                className={`${inputInisial} w-full border-black`}
                placeholder='Kode Arsip'
                disabled={true}
                {...register('kode')}
              />
              <Kesalahan errors={errors.kode?.message} />
            </div>
            <div className={`col-span-3`}>
              <input
                className={`${inputInisial} w-full border-black`}
                placeholder='Kategori'
                disabled={true}
                {...register('kategori')}
              />
            </div>
            <div className={`col-span-2`}>
              <input
                className={`${inputInisial} w-full border-black`}
                placeholder='Jenis'
                disabled={true}
                {...register('jenis')}
              />
            </div>
            <div className={`col-span-2`}>
              <input
                type='date'
                className={`${inputInisial} w-full border-black`}
                placeholder='Retensi (tahun)'
                inputMode='numeric'
                disabled={true}
                {...register('retensi')}
              />
            </div>
            <div className={`col-span-3`}>
              <select
                className={`${inputInisial} w-full border-black`}
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
            </div>
            <div className={`col-span-12`}>
              <input
                type='text'
                className={`${inputInisial} peer w-full border-black`}
                placeholder='Perihal'
                {...register('perihal')}
              />
            </div>
            <div className={`col-span-12`}>
              <textarea
                className={`${inputInisial} block h-[5rem] w-full resize-none border-black`}
                placeholder='Keterangan'
                {...register('keterangan')}
              />
            </div>
            <div className={`col-span-2`}>
              <select
                className={`${inputInisial} w-full border-black`}
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
