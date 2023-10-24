module.exports = (req, res) => {
  const bcrypt = require('bcrypt')
  const db = require('@/models')
  const permintaan = req.body
  if (permintaan.kataSandi !== '') {
    const kataSandi = permintaan.kataSandi
    bcrypt.hash(kataSandi, 10, (error, hash) => {
      if (!error) {
        db.pengguna.update(
          {
            kataSandi: hash,
          },
          {
            where: {
              nik: permintaan.nik,
            },
          }
        )
      }
    })
  }
  db.dataPengguna
    .update(
      {
        nama: permintaan.nama,
        alamat: permintaan.alamat,
        kelamin: permintaan.kelamin,
        nomorTelepon: permintaan.telepon,
        tanggal: permintaan.tanggal,
      },
      {
        where: {
          nik: permintaan.nik,
        },
      }
    )
  return res.status(200).send({
    status: 200,
    pesan: 'Data berhasil ditambahkan'
  })
}
