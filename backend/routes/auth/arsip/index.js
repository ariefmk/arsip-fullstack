module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { daftar, list, tambah, lihat, ubah, setujui, hapus, rincian } =
    require('@/controllers').arsip
  app.get('/arsip', list)
  app.get('/arsip2', daftar.get)
  app.get('/arsip/rincian', rincian.get)
  app.get('/arsip/tambah', tambah.get)
  app.post('/arsip/tambah', berkas.single('berkas'), tambah.post)
  app.get('/arsip/lihat/:id', lihat)
  app.get('/arsip/ubah', ubah.get)
  app.put('/arsip/ubah', ubah.put)
  app.put('/arsip/setujui', setujui)
  app.delete('/arsip/hapus', hapus)
}
