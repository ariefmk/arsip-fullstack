module.exports = (app) => {
  const { beranda } = require('@/controllers')

  app.get('/', beranda)
}
