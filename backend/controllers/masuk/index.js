// Controllers masuk aplikasi
module.exports = (req, res) => {
  require('dotenv').config()
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const { pengguna } = require('@/models')
  const { kunci } = require('@/config')

  // Verifikasi data inputan masuk pengguna
  const payload = jwt.verify(req.body.token, kunci.klien)
  const nik = payload.nik

  const validasi = (sandiDb) => {
    return bcrypt.compareSync(
      payload.kataSandi, sandiDb
    )
  }

  pengguna.findAll({
    where: { nik },
    attributes: ['nik', 'hakAkses', 'kataSandi']
  }).then(dataKueri => {
    const kueri = dataKueri[0]
    if (dataKueri.length === 1) {
      if (!validasi(kueri.kataSandi)) {
        return res.status(401).send(
          {
            status: 401,
            pesan: 'Kata sandi salah',
            data: null
          }
        )
      }

      const hakAkses = dataKueri.hakAkses

      // Gunakan kunci server untuk mengenkripsi pesan
      const token = jwt.sign({ nik, hakAkses }, kunci.server, { expiresIn: 43200 })

      return res.status(200).send(
        {
          status: 200,
          pesan: 'Anda berhasil login dengan hak akses admin',
          data: {
            token
          }
        }
      )
    } else {
      return res.status(400).send(
        {
          status: 400,
          pesan: 'Pengguna tidak ditemukan!',
          data: null
        }
      )
    }
  }).catch(kesalahan => {
    res.status(500).send(
      {
        status: 500,
        pesan: kesalahan.message,
        data: null
      }
    )
  })
}