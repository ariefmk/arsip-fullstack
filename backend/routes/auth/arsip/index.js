module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { arsip } = require('@/controllers')
  app.get('/arsip', arsip.list)
  app.post('/arsip/tambah', berkas.single('berkas'), arsip.tambah)
  app.get('/arsip/lihat/:id', arsip.lihat)
}
