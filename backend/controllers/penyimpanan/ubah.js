module.exports = (req, res) => {
  // console.log(req.body)
  const permintaan = req.body
  console.log(permintaan)
  const db = require('@/models')
  db.penyimpanan.update(
    {
      nama: permintaan.nama,
      keterangan: permintaan.keterangan,
      lokasi: permintaan.lokasi,
    },
    {
      where: {
        kode: permintaan.kode,
      },
    }
  )
  return res.status(200).send({
    status: 200,
    pesan: 'ok',
  })
}
