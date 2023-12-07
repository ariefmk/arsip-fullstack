module.exports = (req, res) => {
  const { arsip } = require('@/models')

  const { kode } = req.body


  arsip.destroy({
    where: {
      kodeArsip: kode
    }
  }).then(hasil => {
    console.log(hasil)
  })

  res.status(200).send({
    status: 200,
    pesan: 'Data berhasil dihapus'
  })
}
