module.exports = (req, res) => {
  const bcrypt = require('bcrypt')
  const { QueryTypes } = require('sequelize')
  const db = require('../models')
  const nik = req.body.nik

  const validasi = (sandiDb) => {
    return bcrypt.compareSync(
      req.body.kataSandi, sandiDb
    )
  }

  db.sequelize.query(
    `SELECT *,
    'Admin' AS sumber
    FROM Admin
    WHERE nik = $nik
    UNION
    SELECT *,
    'Pengguna' AS sumber
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
      if (kueri.sumber === 'Admin') {
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

        return res.status(200).send(
          {
            status: 200,
            data: {
              pesan: 'Anda berhasil login dengan hak akses admin',
              hakAkses: 'admin'
            }
          }
        )
      } else if (kueri.sumber === 'Pengguna') {
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

        return res.status(200).send(
          {
            status: 200,
            data: {
              pesan: 'Anda berhasil login dengan hak akses pengguna',
              hakAkses: 'pengguna'
            }
          }
        )
      }
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
  })
}
