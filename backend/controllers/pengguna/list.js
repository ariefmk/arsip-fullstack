module.exports = async (req, res) => {
  const { dataPengguna, pengguna, bidangPengguna } = require('@/models')

  try {
    const dataKueri = await dataPengguna.findAll({
      include: [
        { model: pengguna, attributes: ['hakAkses'] },
        { model: bidangPengguna, attributes: ['nama'] },
      ],
    })
    const datalist = dataKueri.map((item) => {
      const data = {
        nik: item.nik,
        hak: item.Pengguna.hakAkses,
        nama: item.nama,
        alamat: item.alamat,
        kelamin: item.jenisKelamin === 1 ? 'Laki-Laki' : 'Perempuan',
        telepon: item.nomorTelepon,
        tanggal: item.tanggalLahir,
        jabatan: item.jabatan || 'Tidak Ada',
        bidang: item.BidangPengguna?.nama || 'Tidak Ada',
      }
      return data
    })
    res.status(200).send({ status: 200, datalist })
  } catch {
    res.status(500).send({
      status: 500,
      pesan: 'Kesalahan Sistem',
    })
  }
  /*
  db.pengguna
    .findAll({
      include: 'DataPengguna',
    })
    .then((dataKueri) => {
      const datalist = dataKueri.map((item) => {
        let data = {
          nik: item.nik,
          hak: item.hakAkses,
        }
        if (item.DataPengguna !== null) {
          const dataPengguna = item.DataPengguna
          console.log(dataPengguna)
          data = {
            ...data,
            nama: dataPengguna.nama,
            alamat: dataPengguna.alamat,
            kelamin: dataPengguna.jenisKelamin,
            telepon: dataPengguna.nomorTelepon,
            tanggal: dataPengguna.tanggalLahir,
            jabatan: dataPengguna.jabatan,
            bidang: dataPengguna.bidang
          }
        }
        return data
      })
      res.send(datalist)
    })
    */
}
