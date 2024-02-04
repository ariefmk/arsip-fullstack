'use client'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { skemaSandi } from '@/lib/skema'
import { TombolSimpan, TombolReset } from '@/lib/button'
import { Input } from '@/lib/formv2'
import Info from '@/lib/info'

export default function Sandi(props) {
  const router = useRouter()
  const [tunggu, setTunggu] = useState(false)
  const [pesan, setPesan] = useState('')
  const [toast, setToast] = useState(false)
  const { nik } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(skemaSandi()) })

  const sandiHandler = async (data) => {
    try {
      setTunggu(true)
      const kirim = await fetch(`/api/profil/sandi?nik=${nik}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const respon = await kirim.json()
      if (respon.status === 200) {
        setPesan(respon.pesan)
      }
    } catch {
      setPesan('Kesalahan Internal')
    } finally {
      setToast(true)
      setTunggu(false)
      router.refresh()
    }
  }

  return (
    <div className={`rounded-[10px] border-2 border-black px-[20px] py-[10px]`}>
      <form
        className={`grid grid-cols-3 place-items-center gap-2`}
        onSubmit={handleSubmit(sandiHandler)}
      >
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='text'
          label='NIK'
          name='nik'
          value={nik}
          readOnly={true}
        />
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='password'
          label='Kata Sandi Baru'
          name='sandi'
          register={register('sandi')}
          errors={errors.sandi}
        />
        <Input
          divClass='col-span-1 w-full place-self-start'
          type='password'
          label='Ulangi Kata Sandi'
          name='konfirmasi'
          register={register('konfirmasi')}
          errors={errors.konfirmasi}
        />
        <div className={`col-span-3 flex gap-4`}>
          <TombolSimpan disabled={tunggu} />
          <TombolReset
            onClick={() => {
              reset()
            }}
          />
        </div>
      </form>
      {toast && <Info pesan={pesan} info={{ toast, setToast }} />}
    </div>
  )
}
