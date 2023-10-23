require('dotenv').config()
const kunci = {
  klien: process.env.AUTH_JWT_KLIEN,
  server: process.env.AUTH_JWT_SERVER
}

const db = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  base: process.env.DB_BASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  timezone: '+08:00',
  pool: {
    max: 10,
    min: 0,
    acquire: 60000,
    idle: 10000
  }
}
module.exports = { kunci, db }
