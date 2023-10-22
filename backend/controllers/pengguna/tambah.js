module.exports = (req, res) => {
  const bcrypt = require('bcrypt')
  const db = require('@/models')
  const permintaan = req.body
  bcrypt.hash(permintaan.kataSandi, 10, (error, hash) => {
    if (!error) {
      db.pengguna
        .create({
          nik: permintaan.nik,
          kataSandi: hash,
          hakAkses: permintaan.hak,
        })
        .then((hasil1) => {
          db.dataPengguna.create({
            nik: permintaan.nik,
            nama: permintaan.nama,
            alamat: permintaan.alamat,
            jenisKelamin: permintaan.kelamin,
            nomorTelepon: permintaan.nomor,
            tanggalLahir: permintaan.tanggal,
            jabatan: permintaan.jabatan || null,
            bidang: permintaan.bidang || null,
          }).then(hasil2 => {
            console.log(hasil1)
            console.log(hasil2)
            return res.status(200).send({
              status:200,
              pesan:'Data berhasil ditambahkan'
            })
          })
        })
    }
  })
}
