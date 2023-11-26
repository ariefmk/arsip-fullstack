module.exports = (req, res) => {
  const bcrypt = require('bcrypt')
  const db = require('@/models')
  let berkas
  if (req.file !== undefined) {
    berkas = req.file.buffer
  } else {
    berkas = undefined
  }
  const permintaan = req.body
  // console.log(permintaan)
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
        nik: permintaan.nik,
      },
    }
  )
  return res.status(200).send({
    status: 200,
    pesan: 'Data berhasil ditambahkan',
  })
}
