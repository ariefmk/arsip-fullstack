module.exports = (req, res) => {
  const bcrypt = require('bcrypt')
  const db = require('@/models')
  const berkas = req.file.buffer || undefined
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
          db.dataPengguna
            .create({
              nik: permintaan.nik,
              nama: permintaan.nama,
              alamat: permintaan.alamat,
              jenisKelamin: permintaan.kelamin,
              nomorTelepon: permintaan.telepon,
              tanggalLahir: permintaan.tanggal,
              jabatan: permintaan.jabatan || null,
              bidang: permintaan.bidang || null,
              foto: berkas,
            })
            .then((hasil2) => {
              return res.status(200).send({
                status: 200,
                pesan: 'Data berhasil ditambahkan',
              })
            })
        })
    }
  })
}
