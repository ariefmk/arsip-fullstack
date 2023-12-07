module.exports = (app) => {
  const { penyimpanan } = require('@/controllers')
  app.get('/penyimpanan', penyimpanan.list)
  app.post('/penyimpanan/tambah', penyimpanan.tambah)
  app.put('/penyimpanan/ubah', penyimpanan.ubah)
  app.delete('/penyimpanan/hapus', penyimpanan.hapus)
  app.post('/penyimpanan/unduh', penyimpanan.unduh)
}
