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
      if (kueri.length === 1) {
        kueri = kueri[0]
        const data = {
          nik: kueri.nik,
          nama: kueri.nama,
          foto: kueri.foto,
        }
        return res.status(200).send({
          status: 200,
          pesan: 'ok',
          data,
        })
      } else {
        return res.status(404).send({
          status: 404,
        })
      }
      // console.log(data)
    })
}
