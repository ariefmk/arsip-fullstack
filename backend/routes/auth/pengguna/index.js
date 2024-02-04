module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { lihat, list, data, tambah, ubah, hapus } = require('@/controllers').pengguna
  app.get('/pengguna', list)
  app.get('/pengguna/lihat', lihat)
  app.get('/pengguna/data', data)
  app.post('/pengguna/tambah', berkas.single('berkas'), tambah)
  app.put('/pengguna/ubah', berkas.single('berkas'), ubah)
  app.delete('/pengguna/hapus', hapus)
}
