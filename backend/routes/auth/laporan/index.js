module.exports = app => {
  const { unduh, list, daftar } = require('@/controllers').laporan
  app.get('/laporan', daftar.get)
  // app.post('/laporan/unduh', unduh)
  app.post('/laporan/unduh', unduh)
  // Testing
}
