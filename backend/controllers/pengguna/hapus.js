module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body
  db.pengguna
    .destroy({
      where: {
        nik: permintaan.nik,
      },
    })
}
