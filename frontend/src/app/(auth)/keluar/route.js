import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET() {
  cookies().delete('hakAkses')
  redirect('/')

  return NextResponse.json({
    status: 200,
    pesan: 'Anda berhasil keluar',
  })
}
