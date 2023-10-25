module.exports = (req, res) => {
  const db = require('@/models')
  db.kategori.findAll({ include: 'BidangPengguna' }).then((hasil) => {
    const datalist = hasil.map((item) => {
      const data = {
        kode: item.kode,
        kategori: item.nama,
        bidang: item.BidangPengguna.nama
      }
      return data
    })
    res.send(datalist)
  })
}
