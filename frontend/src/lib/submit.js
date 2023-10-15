export const submitMasuk = async (data, aksi) => {
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
