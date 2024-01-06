module.exports = (req, res) => {
  const permintaan = req.body
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
    pesan: 'Data berhasil diperbarui',
  })
}
