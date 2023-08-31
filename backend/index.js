// set require
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const db = require('./models')
const { sistem } = require('./services/log')

const app = express()

const corsOptions = {
  origin: '127.0.0.1:3000'
}

app.disable('x-powered-by')
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(compression())

app.get('/', (req, res) => {
  res.status(200)
    .type('json')
    .send({ pesan: 'sukses' })
    .end()
})

app.listen(process.env.PORT || 443, () => {
  const pesan = `Server berjalan pada port ${process.env.PORT || 443}`
  sistem.info(pesan)
  console.log('sukses')
})

db.sequelize.sync()
  .then(() => {
    const pesan = 'Basis data tersinkronisasi'
    sistem.info(pesan)
  })
  .catch((error) => {
    const pesan = 'Basis data galat tersinkronisasi, '
    sistem.error(pesan, { keterangan: error })
  })
