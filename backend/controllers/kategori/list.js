module.exports = (req, res) => {
  const db = require('@/models')
  db.kategori.findAll({ include: [db.bidangPengguna, db.arsip] }).then((hasil) => {
    const datalist = hasil.map((item) => {
      const data = {
        kode: item.kode,
        kategori: item.nama,
        bidang: item.BidangPengguna.nama,
        jumlah: item.Arsips.length,
        keterangan: item.keterangan
      }
      return data
    })
    res.send(datalist)
  })
}
