module.exports = (req, res) => {
  require('dotenv').config()
  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const { pengguna } = require('@/models')
  const { kunci } = require('@/config')

  const { nik, kataSandi } = jwt.verify(req.body.token, kunci.klien)

  const validasi = (sandiDb) => {
    return bcrypt.compareSync(kataSandi, sandiDb)
  }

  pengguna
    .findOne({
      include: 'DataPengguna',
      where: { nik },
      attributes: ['nik', 'hakAkses', 'kataSandi'],
    })
    .then((kueri) => {
      if (kueri) {
        if (!validasi(kueri.kataSandi)) {
          return res.status(401).send({
            status: 401,
            pesan: 'Gagal masuk; NIK atau kata sandi tidak valid',
            data: null,
          })
        }
        const tokenData = {
          nik,
          hakAkses: kueri.hakAkses,
          nama: kueri.DataPengguna.nama,
        }
        if (kueri.hakAkses === 'Standar') {
          tokenData.jabatan = kueri.DataPengguna.jabatan
          if (tokenData.jabatan === 'Kepala Bidang') {
            tokenData.bidang = kueri.DataPengguna.bidang
          }
        }
        const token = jwt.sign(tokenData, kunci.server, {
          expiresIn: 43200,
        })

        return res.status(200).send({
          status: 200,
          pesan: 'Anda berhasil masuk',
          data: {
            token,
          },
        })
      } else {
        return res.status(400).send({
          status: 400,
          pesan: 'Gagal masuk; NIK atau kata sandi tidak valid',
          data: null,
        })
      }
    })
    .catch((kesalahan) => {
      res.status(500).send({
        status: 500,
        pesan: kesalahan.message,
        data: null,
      })
    })
}
