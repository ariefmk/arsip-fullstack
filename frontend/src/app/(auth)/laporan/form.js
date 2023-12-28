'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Select from 'react-select'
import Input from '@/lib/form/input'
import { apiPublic as api } from '@/config'
import { inputInisial } from '@/lib/class'
import { skemaLaporan } from '@/lib/skema'
import { TombolUnduh, TombolReset } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'

export default function Form(props) {
  const { children, data, jabatan } = props
  const [arsip, setArsip] = useState([])
  const [kategori, setKategori] = useState([])
  const [awal, setAwal] = useState('')
  const [akhir, setAkhir] = useState('')

  const selectRef = useRef()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(skemaLaporan()) })

  const handleUnduh = (data1) => {
    const body = {
      kategori: data1.kategori,
      arsip: arsip.map((isi) => isi.kode),
      tujuan: data1.tujuan,
      catatan: data1.catatan,
      awal: data1.awal,
      akhir: data1.akhir,
    }
    fetch(`${api.server}/auth/laporan/unduh`, {
      method: 'POST',
      headers: {
        API_Key: api.key,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(async (respon) => {
      const berkas = await respon.blob()
      let link = document.createElement('a')
      link.href = URL.createObjectURL(berkas)
      link.target = '_blank'
      link.click()
    })
  }

  const selectStyles = {
    control: (styles, state) => {
      return {
        alignItems: 'center',
        backgroudnColor: state.isDisabled ? '#eb5e7eb' : '#fff',
        borderColor: errors.kategori
          ? '#ef4444'
          : state.isFocused
          ? '#22c55e'
          : '#000',
        borderRadius: 5,
        borderWidth: 2,
        boxSizing: 'border-box',
        cursor: 'default',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        label: 'control',
        minHeight: 38,
        position: 'relative',
        transition: 'all 100ms',
        color: '#000',
      }
    },
    indicatorSeparator: () => null,
    placeholder: (styles) => {
      return {
        ...styles,
        color: 'black',
      }
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
    menuList: (styles) => {
      return {
        ...styles,
        maxHeight: '200px',
      }
    },
  }

  useEffect(() => {
    if (awal && akhir && new Date(awal) > new Date(akhir)) {
    }
  }, [awal, akhir])

  return (
    <div
      className={`rounded-box flex w-[800px] flex-col items-center border-2 border-black py-[30px]`}
    >
      <div className={`flex justify-center`}>
        <form
          id='laporan'
          className={`grid w-[600px] grid-cols-4 gap-4`}
          onSubmit={handleSubmit(handleUnduh)}
        >
          <div className={`relative col-span-4`}>
            <Controller
              control={control}
              name='kategori'
              render={({ field: { onChange } }) => (
                <Select
                  type='text'
                  instanceId='kategori'
                  className={`w-full`}
                  options={data.map((kategori) => {
                    return {
                      value: kategori.kode,
                      label: kategori.nama,
                    }
                  })}
                  styles={selectStyles}
                  isMulti={true}
                  ref={selectRef}
                  placeholder='Kategori Arsip'
                  onChange={(hasil) => {
                    const kode = hasil.map((a) => a.value)
                    setArsip(
                      data
                        .filter((data1) => {
                          return kode.includes(data1.kode)
                        })
                        .flatMap((item) => item.arsip)
                    )
                    onChange(kode)
                  }}
                />
              )}
            />
            <Kesalahan errors={errors.kategori?.message} />
          </div>
          <Input
            divClass={`col-span-2`}
            type='text'
            name='tujuan'
            disabled={jabatan === 'Kepala Bidang' && arsip.length ? false : true}
            placeholder='Tujuan Pembuatan Laporan'
            label={true}
            register={register('tujuan')}
            errors={errors.tujuan}
          />
          <Input
            divClass={`col-span-1`}
            type='date'
            name='awal'
            disabled={arsip.length ? false : true}
            placeholder='Periode Awal'
            label={true}
            register={register('awal', {
              onChange: (e) => setAwal(e.target.value),
            })}
            errors={errors.awal}
          />
          <Input
            divClass={`col-span-1`}
            type='date'
            name='akhir'
            disabled={arsip.length ? false : true}
            placeholder='Periode Akhir'
            label={true}
            register={register('akhir', {
              onChange: (e) => setAkhir(e.target.value),
            })}
            errors={errors.akhir}
          />
          <Input
            divClass={`col-span-4`}
            type='text'
            name='catatan'
            disabled={jabatan === 'Kepala Bidang' && arsip.length ? false : true}
            placeholder='Catatan'
            label={true}
            register={register('catatan')}
            errors={errors.catatan}
          />
        </form>
      </div>
      <div>
        <div className={`my-5`}>
          <h2 className={`text-2xl font-semibold`}>Pratinjau Daftar Arsip</h2>
        </div>
      </div>
      <div className={`h-[400px]`}>
        <table className={`w-full table-fixed text-center`}>
          <thead className={`border-b-2 border-black`}>
            <tr className={`text-center`}>
              <td className={`w-[40px]`}>No.</td>
              <td className={`w-[120px]`}>Kode Arsip</td>
              <td className={`w-[100px]`}>Tanggal</td>
              <td className={`w-[200px]`}>Kategori</td>
              <td className={`w-[100px]`}>Retensi</td>
              <td className={`w-[200px]`}>Perihal</td>
            </tr>
          </thead>
          <tbody>
            {arsip &&
              arsip
                .filter((a) => {
                  return (
                    (!awal || a.tanggal >= awal) &&
                    (!akhir || a.tanggal <= akhir)
                  )
                })
                .map((a, index) => (
                  <tr
                    key={a.kode}
                    className={`h-[3rem] border-b-2 border-gray-200 hover:bg-gray-100`}
                  >
                    <td>{index + 1}</td>
                    <td>{a.kode}</td>
                    <td>
                      {new Date(a.tanggal).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                    <td>{a.kategori}</td>
                    <td>
                      {new Date(a.retensi).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                    <td
                      className={`truncate text-left hover:whitespace-normal`}
                    >
                      {a.perihal}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <div className={`flex justify-center gap-x-4`}>
        <TombolUnduh
          form='laporan'
          disabled={jabatan === 'Kepala Bidang' && arsip.length && awal && akhir ? false : true}
        />
        <TombolReset
          form='laporan'
          onClick={() => {
            reset()
            setAwal('')
            setAkhir('')
            setArsip([])
            selectRef.current.clearValue()
          }}
          disabled={arsip.length ? false : true}
        />
      </div>
    </div>
  )
}
