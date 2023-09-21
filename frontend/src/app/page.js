'use client'
export default function Masuk() {
  const kirimData = async (aksi) => {
    aksi.preventDefault()
    const inputan = {
      nik: aksi.target[0].value,
      kataSandi: aksi.target[1].value
    }

    const respon = await fetch(`/api/masuk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputan)
    })

    const hasil = await respon.json()
    console.log(hasil)
  }

  return (
    <main>
      <form onSubmit={kirimData}>
        <input type='text' name='nik'></input>
        <input type='password' name='kataSandi'></input>
        <button type='submit'>Masuk</button>
      </form>
    </main>
  )
}
