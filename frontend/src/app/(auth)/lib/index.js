
export const hapusAkses = async() => {
  await fetch('/api/keluar', {
    method: 'POST'
  })
}
