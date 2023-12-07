module.exports = (req, res) => {
  const { kategori } = require('@/models')
  const { kode } = req.body

  kategori.destroy({
    where: {
      kode,
    },
  })

  res.status(200).send({
    status: 200,
    pesan: 'Data berhasil dihapus',
  })
}
