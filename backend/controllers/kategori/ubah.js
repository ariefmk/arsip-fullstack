module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body
  db.kategori.update(
    {
      nama: permintaan.nama,
      keterangan: permintaan.keterangan,
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
