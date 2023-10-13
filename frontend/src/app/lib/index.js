import * as yup from 'yup'
// Kirim data masuk untuk dicek di route api/masuk
export const submitData = async (data, aksi) => {
  const kirimData = await fetch('/api/masuk', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nik: data.nik,
      kataSandi: data.kataSandi
    })
  })
  const responData = await kirimData.json()
  if(responData.status !== 200) {
    return {
      status: responData.status,
      pesan: responData.pesan
    }
  } else {
    return { 
      status: 200,
      pesan: 'Anda berhasil masuk'
    }
  }
}

// Cek format angka
export const hanyaAngka = (aksi) => {
  const masukkan = aksi.target.value
  const angka = masukkan.replace(/[^[0-9]/g, '')

  if (masukkan !== angka) {
    aksi.target.value = angka
  }
}

// Skema validasi masuk menggunakan yup
export const skemaMasuk = yup.object({
  nik: yup.string().required('NIK wajib diisi').matches(/^\d+$/, 'NIK hanya mengandung angka').min(16, 'Panjang NIK harus 16 karakter'),
  kataSandi: yup.string().required('Kata Sandi wajib diisi').min(8, 'Kata sandi minimal 8 karakter')
})

