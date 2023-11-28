module.exports = app => {
  const router = require('express').Router()
  app.use('/auth', router)
  require('./laporan')(router)
  require('./pengguna')(router)
  require('./kategori')(router)
  require('./arsip')(router)
  require('./penyimpanan')(router)
  require('./profil')(router)
  require('./beranda')(router)
}
