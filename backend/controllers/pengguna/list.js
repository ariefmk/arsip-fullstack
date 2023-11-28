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
            tanggal: new Date(dataPengguna.tanggalLahir).toLocaleString('id-Id', {
              weekday: 'short',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'}),
            jabatan: dataPengguna.jabatan,
            bidang: dataPengguna.bidang
          }
        }
        return data
      })
      res.send(datalist)
    })
}
