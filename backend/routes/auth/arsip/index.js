module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { list, tambah, lihat, ubah, setujui, hapus } =
    require('@/controllers').arsip
  app.get('/arsip', list)
  app.post('/arsip/tambah', berkas.single('berkas'), tambah)
  app.get('/arsip/lihat/:id', lihat)
  app.get('/arsip/ubah', ubah.get)
  app.put('/arsip/ubah', ubah.put)
  app.put('/arsip/setujui', setujui)
  app.delete('/arsip/hapus', hapus)
}
