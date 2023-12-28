module.exports = app => {
  const { unduh, list } = require('@/controllers').laporan
  app.get('/laporan', list)
  // app.post('/laporan/unduh', unduh)
  app.post('/laporan/unduh', unduh)
  // Testing
}
