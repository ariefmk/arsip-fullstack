module.exports = (req, res, next) => {
  require('dotenv').config()
  const jwt = require('jsonwebtoken')
  const kunci = process.env.AUTH_JWT
  const token = req.headers['x-access-token']

  jwt.verify(token, kunci)
}
