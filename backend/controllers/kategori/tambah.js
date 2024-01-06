module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body
 //  console.log(permintaan)

  db.kategori
    .create({
      nama: permintaan.nama,
      kode: permintaan.kode,
      bidang: permintaan.bidang,
      keterangan: permintaan.keterangan
    })
    .then((hasil) => {
      return res.status(200).send({
        status: 200,
        pesan: 'Data berhasil ditambahkan',
      })
    })
}
