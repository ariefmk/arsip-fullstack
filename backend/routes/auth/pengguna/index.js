module.exports = app => {
  const { pengguna } = require('@/controllers')
  app.get('/pengguna', (pengguna.list))
}
