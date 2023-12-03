module.exports = app => {
  const { kategori } = require('@/controllers')
  app.get('/kategori', kategori.list)
  app.post('/kategori/tambah', kategori.tambah)
  app.delete('/kategori/hapus', kategori.hapus)
  app.put('/kategori/ubah', kategori.ubah)
}
