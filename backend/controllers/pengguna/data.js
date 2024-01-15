module.exports = async (req, res) => {
  const { dataPengguna } = require('@/models')
  dataPengguna
    .findOne({
      attributes: ['nik', 'nama', 'foto'],
      where: {
        nik: req.query.nik,
      },
    })
    .then((kueri) => {
      return res.status(200).send({
        status: 200,
        pesan: 'Sukses',
        data: {
          nik: kueri.nik,
          nama: kueri.nama,
          foto: kueri.foto,
        },
      })
    })
    .catch(() => {
      return res.status(404).send({
        status: 404,
        pesan: 'Gagal',
      })
    })
}
