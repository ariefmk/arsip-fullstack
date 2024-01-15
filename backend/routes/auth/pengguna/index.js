module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { pengguna } = require('@/controllers')
  app.get('/pengguna', pengguna.list)
  app.get('/pengguna/data', pengguna.data)
  app.post('/pengguna/tambah', berkas.single('berkas'), pengguna.tambah)
  app.delete('/pengguna/hapus', pengguna.hapus)
  app.put('/pengguna/ubah', berkas.single('berkas'), pengguna.ubah)
}
