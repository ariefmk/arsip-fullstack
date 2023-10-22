require('dotenv').config()
require('module-alias/register')
const db = require('@/models')
const { penggunaLog } = require('./log')
const bcrypt = require('bcrypt')
const logPengguna = require('@/modules').log.pengguna

const nikAdmin = process.env.USER_ADMIN
const sandiAdmin = process.env.PASS_ADMIN
const nikPengguna = process.env.USER_BIASA
const sandiPengguna = process.env.PASS_BIASA
const saltRounds = parseInt(process.env.SALT_ROUNDS)

bcrypt.hash(sandiAdmin, saltRounds, (error, hash) => {
  if (!error) {
    db.pengguna
      .create({
        nik: nikAdmin,
        kataSandi: hash,
        hakAkses: 'admin',
      })
      .then((hasil) => {
        penggunaLog.info(
          `Berhasil membuat pengguna dengan NIK ${nikAdmin} sebagai admin`,
          logPengguna.tambah(hasil)
        )
      })
      .catch((error) => {
        penggunaLog.error(`Kesalahan membuat pengguna ${nikAdmin}`, error)
      })
  } else {
    penggunaLog.error(`Gagal membuat pengguna ${nikAdmin}`, error)
  }
})

bcrypt.hash(sandiPengguna, saltRounds, (error, hash) => {
  if (!error) {
    db.pengguna
      .create({
        nik: nikPengguna,
        kataSandi: hash,
        hakAkses: 'standar',
      })
      .then((hasil) => {
        penggunaLog.info(
          `Berhasil membuat pengguna dengan NIK ${nikPengguna} sebagai pengguna`,
          logPengguna.tambah(hasil)
        )
      })
      .catch((error) => {
        penggunaLog.error(`Kesalahan membuat pengguna ${nikPengguna}`, error)
      })
  } else {
    penggunaLog.error(`Gagal membuat pengguna ${nikPengguna}`, error)
  }
})

