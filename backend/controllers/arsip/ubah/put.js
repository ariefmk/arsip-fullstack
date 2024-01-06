module.exports = async (req, res) => {
  const { arsip } = require('@/models')
  const { kode, keterangan, perihal } = req.body
  arsip.update(
    {
      nama: perihal,
      keterangan,
    },
    {
      where: {
        kodeArsip: kode,
      },
    }
  )
  return res.status(200).send({
    status: 200,
    pesan: 'Data berhasil ditambahkan',
  })
}
