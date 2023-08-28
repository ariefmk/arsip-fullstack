const db = require('../models')
const { sistem } = require('./log')

const test = async () => {
  try {
    await db.sequelize.authenticate()
    sistem.info('Basis data berhasil terkoneksi')
  } catch (error) {
    sistem.error('Basis data gagal terkoneksi', { keterangan: error })
  }
}

test()
