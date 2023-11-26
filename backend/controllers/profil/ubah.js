module.exports = (req, res) => {
  const db = require('@/models')
  console.log(req.body)
  const permintaan = req.body
  if (req.params.jenis === 'data') {
    let berkas
    if (req.file !== undefined) {
      berkas = req.file.buffer
    } else {
      berkas = undefined
    }

    db.dataPengguna.update(
      {
        nama: permintaan.nama || null,
        alamat: permintaan.alamat || null,
        jenisKelamin: permintaan.kelamin || null,
        nomorTelepon: permintaan.telepon || null,
        tanggalLahir: permintaan.tanggal || null,
        foto: berkas,
      },
      {
        where: {
          nik: req.params.nik,
        },
      }
    )
    return res.status(200).send({
      status: 200,
      pesan: 'data berhasil diubah',
    })
  }
  if (req.params.jenis === 'sandi') {
    const bcrypt = require('bcrypt')
    bcrypt.hash(permintaan.sandiBaru, 10, (error, hash) => {
      if (!error) {
        db.pengguna.update(
          {
            kataSandi: hash,
          },
          {
            where: {
              nik: req.params.nik,
            },
          }
        )
      }
      return res.status(200).send({
        status: 200,
        pesan: 'data berhasil diubah',
      })
    })
  }
}
