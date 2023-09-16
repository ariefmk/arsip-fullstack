module.exports = app => {
  const { masuk } = require('../controllers')

  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    )
    next()
  })

  app.post('/masuk', masuk)
}
