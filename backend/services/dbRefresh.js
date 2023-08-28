const db = require('../models')
const { sistem } = require('./log')

db.sequelize.sync({ force: true })
  .then(() => {
    const pesan = 'Basis data dibuat ulang dan tersinkronisasi'
    sistem.info(pesan)
  })
  .catch((error) => {
    const pesan = 'Gagal membuat ulang basis data dan tersinkronisasi'
    sistem.error(pesan, { keterangan: error })
  })
