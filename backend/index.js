// set require
require('dotenv').config()
require('module-alias/register')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const db = require('./models')
const { sistemLog } = require('./services/log')

const app = express()

app.disable('x-powered-by')
app.use(cors({ origin: '*' }))
app.use(cookieParser())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set verifikasi headers
/*
app.use((req, res, next) => {
  if (!req.headers.api_key) {
    return res.status(400).send({
      status: 400,
      pesan: 'Tidak ada api_key'
    })
  } else if (req.headers.api_key !== process.env.API_SERVER_KEY) {
    return res.status(400).send({
      status: 400,
      pesan: 'api_key berbeda'
    })
  }
  next()
})
*/

app.get('/', (req, res) => {
  res
    .status(200)
    .type('json')
    .send({
      pesan: 'sukses',
      versi: '1.0.0',
    })
    .end()
})

require('./routes')(app)

app.listen(process.env.PORT || 443, () => {
  const pesan = `Server berjalan pada port ${process.env.PORT || 443}`
  sistemLog.info(pesan)
})
db.sequelize
  .sync()
  .then(() => {
    const pesan = 'Basis data tersinkronisasi'
    sistemLog.info(pesan)
  })
  .catch((error) => {
    const pesan = 'Basis data galat tersinkronisasi, '
    sistemLog.error(pesan, { keterangan: error })
  })
