module.exports = (req, res) => {
  const { arsip } = require('@/models')

  const { kode } = req.body

  arsip.update(
    {
      status: 1,
      penyimpanan: null
    },
    {
      where: {
        kodeArsip: kode,
      },
    },
  )

  res.status(200).send({
    status: 200,
    pesan: 'Data berhasil dihapus',
  })
}
