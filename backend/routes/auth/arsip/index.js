module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { list, tambah, lihat, hapus } = require('@/controllers').arsip
  app.get('/arsip', list)
  app.post('/arsip/tambah', berkas.single('berkas'), tambah)
  app.get('/arsip/lihat/:id', lihat)
  app.delete('/arsip/hapus', hapus)
}
