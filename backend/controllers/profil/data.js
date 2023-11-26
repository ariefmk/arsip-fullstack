module.exports = (req, res) => {
  const db = require('@/models')
  db.dataPengguna
    .findAll({
      where: {
        nik: req.params.nik,
      },
    })
    .then((kueri) => {
      kueri = kueri[0]
      const data = {
        nik: kueri.nik,
        nama: kueri.nama,
        jabatan: kueri.jabatan,
        bidang: (() => {
          let bidang
          switch (kueri.bidang) {
            case 1:
              bidang = 'Kesra & Pelayanan'
              break
            case 2:
              bidang = 'Pemerintahan'
              break
            case 3:
              bidang = 'Kewilayahan'
              break
            case 4:
              bidang = 'Keuangan'
              break
            case 5:
              bidang = 'Umum & Perencanaan'
              break
            default:
              bidang = null
          }
          return bidang
        })(),
        tanggal: kueri.tanggalLahir,
        kelamin: kueri.jenisKelamin,
        telepon: kueri.nomorTelepon,
        alamat: kueri.alamat,
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
