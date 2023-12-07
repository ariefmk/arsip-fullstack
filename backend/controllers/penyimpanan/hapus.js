module.exports = (req, res) => {
  const { penyimpanan } = require('@/models')
  const permintaan = req.body

  penyimpanan.destroy({
    where: {
      kode: permintaan.kode,
    },
  })

  res.status(200).send({
    status: 200,
    pesan: 'Data berhasil dihapus',
  })
}
