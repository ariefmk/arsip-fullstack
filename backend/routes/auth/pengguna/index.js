module.exports = app => {
  const { berkas } = require('@/middleware/media')
  const { pengguna } = require('@/controllers')
  app.get('/pengguna', pengguna.list)
  app.post('/pengguna/tambah', berkas.single('foto'), pengguna.tambah)
}
