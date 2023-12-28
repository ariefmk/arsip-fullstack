import { api } from '@/config'
export default async function UnduhPage() {
  const respon = await fetch(`${api.server}/auth/penyimpanan/unduh`, {
    method: 'GET',
    responseType: 'blob',
    headers: {
      API_Key: api.key,
      'Content-Type': 'application/pdf',
    },
  })
  const pdf = await respon.blob()
  const stream = await pdf.arrayBuffer()
  const test = new DataView(await pdf.arrayBuffer())
  return (
    <div>
      <a href={URL.createObjectURL(pdf)}>a</a>
    </div>
  )
}
