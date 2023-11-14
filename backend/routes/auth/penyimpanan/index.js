module.exports = (app) => {
  const { penyimpanan } = require('@/controllers')
  app.get('/penyimpanan', penyimpanan.list)
  app.post('/penyimpanan/tambah', penyimpanan.tambah)
}