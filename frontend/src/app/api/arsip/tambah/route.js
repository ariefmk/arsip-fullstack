import { NextResponse } from 'next/server'
import { api } from '@/config'

export async function POST(permintaan) {
  console.log(await permintaan.formData())
  return NextResponse.json({
    status: 200
  })
}
