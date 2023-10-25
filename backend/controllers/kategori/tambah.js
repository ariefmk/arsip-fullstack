module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body

  db.kategori
    .create({
      nama: permintaan.kategori,
      kode: permintaan.kode,
      bidang: permintaan.bidang,
    })
    .then((hasil) => {
      return res.status(200).send({
        status: 200,
        pesan: 'Data berhasil ditambahkan',
      })
    })
}
