module.exports = app => {
  const { arsip } = require('@/controllers')
  app.get('/arsip', arsip.list)
  app.post('/arsip/tambah', arsip.tambah)
}

