'use client'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import Input from '@/lib/form/input'
import { inputInisial } from '@/lib/class'
import { TombolUnduh, TombolReset } from '@/lib/button'

export default function Form(props) {
  const { children, data } = props
  const [arsip, setArsip] = useState([])
  const [awal, setAwal] = useState('')
  const [akhir, setAkhir] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm()

  const handleUnduh = (data1) => {
    const body = {
      arsip: arsip.map((isi) => isi.kode),
      tujuan: data1.tujuan,
      catatan: data1.catatan,
      awal: data1.awal,
      akhir: data1.akhir,
    }
    fetch('/api/laporan/unduh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  }

  useEffect(() => {
    if (awal && akhir && new Date(awal) > new Date(akhir)) {
      setAkhir('')
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
          <div className={`col-span-4`}>
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
                  isMulti={true}
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
          </div>
          <Input
            divClass={`col-span-2`}
            type='text'
            name='tujuan'
            disabled={false}
            placeholder='Tujuan Pembuatan Laporan'
            label={true}
            register={register('tujuan')}
            errors={errors.tujuan}
          />
          {/*
          <div className={`col-span-1`}>
            <input
              type='date'
              className={`${inputInisial} w-full border-2 border-black outline-none`}
              placeholder='Periode Awal'
            />
          </div>
          */}
          <Input
            divClass={`col-span-1`}
            type='date'
            name='awal'
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
            placeholder='Periode Akhir'
            label={true}
            value={akhir}
            register={register('akhir', {
              onChange: (e) => setAkhir(e.target.value),
            })}
            errors={errors.akhir}
          />
          {/*
          <div className={`col-span-1`}>
            <input
              type='date'
              name='awal'
              className={`${inputInisial} w-full border-2 border-black outline-none`}
              placeholder='Periode Akhir'
            />
          </div>*/}
          <Input
            divClass={`col-span-4`}
            type='text'
            name='catatan'
            placeholder='Catatan'
            label={true}
            register={register('catatan')}
            errors={errors.catatan}
          />
          {/*
          <div className={`col-span-4`}>
            <input
              type='text'
              className={`${inputInisial} w-full border-2 border-black outline-none`}
              placeholder='Catatan'
            />
          </div>*/}
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
                    <td>{a.retensi}</td>
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
        <TombolUnduh form='laporan' />
        <TombolReset
          form='laporan'
          onClick={() => {
            reset()
            setAwal('')
            setAkhir('')
          }}
        />
      </div>
    </div>
  )
}
