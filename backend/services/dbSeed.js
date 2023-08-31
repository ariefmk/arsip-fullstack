require('dotenv').config()
const { admin } = require('../models')
const log = require('./log').pengguna
const bcrypt = require('bcrypt')
const logPengguna = require('../modules').log.pengguna

const user = process.env.USER_ADMIN
const pass = process.env.PASS_ADMIN
const saltRounds = parseInt(process.env.SALT_ROUNDS)

bcrypt.hash(pass, saltRounds, (error, hash) => {
  if (!error) {
    admin.create(
      {
        namaPengguna: user,
        kataSandi: hash
      })
      .then(hasil => {
        log.info(`Berhasil membuat pengguna ${user} sebagai admin`, logPengguna.tambah(hasil))
      })
      .catch(error => {
        log.error(`Kesalahan membuat pengguna ${user}`, error)
      })
  } else {
    log.error(`Gagal membuat pengguna ${user}`, error)
  }
})
