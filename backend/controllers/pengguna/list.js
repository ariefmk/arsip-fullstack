module.exports = (req, res) => {
  const db = require('@/models')

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
}
