const db = require('../models')
const { sistemLog } = require('./log')

db.sequelize
  .sync({ force: true })
  .then(() => {
    const pesan = 'Basis data dibuat ulang dan tersinkronisasi'
    sistemLog.info(pesan)
  })
  .catch((error) => {
    const pesan = 'Gagal membuat ulang basis data dan tersinkronisasi'
    sistemLog.error(pesan, { keterangan: error })
  })
