// set require
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const db = require('./models')
const { sistemLog } = require('./services/log')

const app = express()

app.disable('x-powered-by')
app.use(cors({ origin: '*' }))
app.use(cookieParser())
app.use(compression())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200)
    .type('json')
    .send({
      pesan: 'sukses',
      versi: '1.0.0'
    })
    .end()
})

require('./routes')(app)

app.listen(process.env.PORT || 443, () => {
  const pesan = `Server berjalan pada port ${process.env.PORT || 443}`
  sistemLog.info(pesan)
})

db.sequelize.sync()
  .then(() => {
    const pesan = 'Basis data tersinkronisasi'
    sistemLog.info(pesan)
  })
  .catch((error) => {
    const pesan = 'Basis data galat tersinkronisasi, '
    sistemLog.error(pesan, { keterangan: error })
  })
