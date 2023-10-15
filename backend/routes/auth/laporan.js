module.exports = app => {
  const { laporan } = require('../../controllers')
  app.get('/laporan/unduh', laporan.unduh)
  // Testing
  app.post('/laporan', (req, res) => {
    res.send('hello world')
  })
}
