module.exports = async (req, res) => {
  const db = require('@/models')
  db.dataPengguna
    .findAll({
      attributes: ['nik', 'nama', 'foto'],
      where: {
        nik: req.params.nik,
      },
    })
    .then((kueri) => {
      kueri = kueri[0]
      const data = {
        nik: kueri.nik,
        nama: kueri.nama,
        foto: kueri.foto,
      }

      // console.log(data)
      return res.status(200).send({
        status: 200,
        pesan: 'ok',
        data,
      })
    })
}
