export const hanyaAngka = (aksi) => {
  const masukkan = aksi.target.value
  const angka = masukkan.replace(/[^[0-9]/g, '')

  if (masukkan !== angka) {
    aksi.target.value = angka
  }
}

export const hurufKapital = (aksi) => {
  const masukkan = aksi.target.value
  const huruf = masukkan.replace(/[^a-zA-Z]/g, '')

  if (masukkan !== huruf) {
    aksi.target.value = huruf
  } else {
    aksi.target.value = masukkan.toUpperCase()
  }
}

export const hurufKecil = (aksi) => {
  const masukkan = aksi.target.value
  const huruf = masukkan.replace(/[^a-zA-Z]/g, '')

  if (masukkan !== huruf) {
    aksi.target.value = huruf
  } else {
    aksi.target.value = masukkan.toLowerCase()
  }
}

export const submitData = async (data, aksi) => {
  const kirimData = await fetch('/api/masuk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nik: data.nik,
      kataSandi: data.kataSandi,
    }),
  })
  const responData = await kirimData.json()
  if (responData.status !== 200) {
    return {
      status: responData.status,
      pesan: responData.pesan,
    }
  } else {
    return {
      status: 200,
      pesan: 'Anda berhasil masuk',
    }
  }
}
