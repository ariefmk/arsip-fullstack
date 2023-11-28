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

db.bidangPengguna.sync({ alter: true })

db.bidangPengguna.create({
  id: 1,
  nama: 'Kesra dan Pelayanan',
})
db.bidangPengguna.create({
  id: 2,
  nama: 'Pemerintahan',
})
db.bidangPengguna.create({
  id: 3,
  nama: 'Kewilayahan',
})
db.bidangPengguna.create({
  id: 4,
  nama: 'Keuangan',
})
db.bidangPengguna.create({
  id: 5,
  nama: 'Umum dan Perencanaan',
})

bcrypt.hash(sandiAdmin, saltRounds, (error, hash) => {
  if (!error) {
    db.pengguna
      .create({
        nik: 6311041302010001,
        kataSandi: hash,
        hakAkses: 'Admin',
      })
      .then((hasil) => {
        penggunaLog.info(
          `Berhasil membuat pengguna dengan NIK ${nikAdmin} sebagai admin`,
          logPengguna.tambah(hasil)
        )
        db.dataPengguna.create({
          nik: 6311041302010001,
          nama: 'Arief Maulana',
        })
      })
      .catch((error) => {
        penggunaLog.error(`Kesalahan membuat pengguna ${nikAdmin}`, error)
      })
  } else {
    penggunaLog.error(`Gagal membuat pengguna ${nikAdmin}`, error)
  }
})
