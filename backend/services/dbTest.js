const db = require('../models')
const { sistemLog } = require('./log')

const test = async () => {
  try {
    await db.sequelize.authenticate()
    sistemLog.info('Basis data berhasil terkoneksi')
  } catch (error) {
    sistemLog.error('Basis data gagal terkoneksi', { keterangan: error })
  }
}

test()
