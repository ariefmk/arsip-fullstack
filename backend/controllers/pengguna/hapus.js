module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body

  db.pengguna
    .destroy({
      where: {
        nik: permintaan.nik,
      },
    })
    .then((hasil) => {
      res.status(200).send({
        status: 200,
        pesan: 'Data berhasil dihapus',
      })
    })
}
