module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body

  db.penyimpanan
    .create({
      kode: permintaan.kode,
      keterangan: permintaan.keterangan,
      metadata: permintaan.metadata || null
    }).then((hasil) => {
      return res.status(200).send({
        status: 200,
        pesan: 'Data berhasil ditambahkan'
      })
    })
}
