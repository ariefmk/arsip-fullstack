module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body

  db.kategori.destroy({
    where: {
      kode: permintaan.kode,
    },
  })

  res.status(200).send({
    status: 200,
    pesan: 'Data berhasil dihapus',
  })
}
