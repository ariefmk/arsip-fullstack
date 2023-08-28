// set require
require('dotenv').config()

// export modul
module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  base: process.env.DB_BASE,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  pool: {
    max: 10,
    min: 0,
    acquire: 3000,
    idle: 1000
  }
}
