module.exports = (req, res) => {
  require('dotenv').config()
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const { QueryTypes } = require('sequelize')
  const db = require('../models')
  const nik = req.body.nik
  const kunci = process.env.AUTH_JWT

  const validasi = (sandiDb) => {
    return bcrypt.compareSync(
      req.body.kataSandi, sandiDb
    )
  }

  db.sequelize.query(
    `SELECT *,
    'admin' AS sumber
    FROM Admin
    WHERE nik = $nik
    UNION
    SELECT *,
    'pengguna' AS sumber
    FROM Pengguna
    WHERE nik = $nik`,
    {
      bind: {
        nik
      },
      type: QueryTypes.SELECT
    }
  ).then(dataKueri => {
    const kueri = dataKueri[0]
    if (dataKueri.length === 1) {
      if (!validasi(kueri.kataSandi)) {
        return res.status(401).send(
          {
            status: 401,
            data: {
              pesan: 'Kata sandi salah'
            }
          }
        )
      }

      let hakAkses

      if (kueri.sumber === 'admin') {
        hakAkses = 'admin'
      } else {
        hakAkses = 'pengguna'
      }

      const token = jwt.sign({ nik, hakAkses }, kunci, {
        expiresIn: 14400
      })

      return res.status(200).send(
        {
          status: 200,
          data: {
            pesan: 'Anda berhasil login dengan hak akses admin',
            hakAkses,
            token
          }
        }
      )
    } else {
      return res.status(400).send(
        {
          status: 400,
          data: {
            pesan: 'Pengguna tidak ditemukan!'
          }
        }
      )
    }
  }).catch(kesalahan => {
    res.status(500).send(
      {
        status: 500,
        data: {
          pesan: kesalahan.message
        }
      }
    )
  })
}
