module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body
  console.log(permintaan)
  db.penyimpanan
    .create({
      kode: permintaan.kode,
      bidang: permintaan.bidang,
      nama: permintaan.nama,
      keterangan: permintaan.keterangan,
      lokasi: permintaan.lokasi
    }).then((hasil) => {
      return res.status(200).send({
        status: 200,
        pesan: 'Data berhasil ditambahkan'
      })
    })
}
