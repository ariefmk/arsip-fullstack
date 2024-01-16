'use client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { skemaSandi } from '@/lib/skema'
import { TombolSimpan } from '@/lib/button'
import { Kesalahan } from '@/lib/errors'
import { inputInisial } from '@/lib/class'
export default function Sandi(props) {
  const { nik } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({ resolver: yupResolver(skemaSandi()) })

  const sandiHandler = (data) => {}
  return (
    <div></div>
  )
}
