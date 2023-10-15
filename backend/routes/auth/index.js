module.exports = app => {
  const router = require('express').Router()
  app.use('/auth', router)
  require('./laporan')(router)
  require('./pengguna')(router)
}
