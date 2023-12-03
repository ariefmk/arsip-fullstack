module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body
  db.kategori
    .update(
      {
        nama: permintaan.kategori,
        keterangan: permintaan.keterangan,
      },
      {
        where: {
          kode: permintaan.kode,
        },
      }
    )
    .then((hasil) => {
      console.log(hasil)
      return res.status(200).send({
        status: 200,
        pesan: 'Data berhasil diperbarui',
      })
    })
}
