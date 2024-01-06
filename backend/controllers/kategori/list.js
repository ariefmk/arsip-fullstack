module.exports = (req, res) => {
  const db = require('@/models')
  db.kategori
    .findAll({ include: [db.bidangPengguna, db.arsip] })
    .then((hasil) => {
      const datalist = hasil.map((item) => {
        const data = {
          kode: item.kode,
          nama: item.nama,
          jumlah: `${item.Arsips.length} berkas`,
          bidang: item.BidangPengguna.nama,
          keterangan: item.keterangan,
        }
        return data
      })
      return res.status(200).send({
        pesan: 'ok',
        data: {
          kategori: datalist,
        },
      })
    })
}
