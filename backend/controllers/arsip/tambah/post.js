module.exports = (req, res) => {
  const db = require('@/models')
  const permintaan = req.body
  db.arsip
    .create({
      kodeArsip: permintaan.kode,
      nama: permintaan.perihal,
      keterangan: permintaan.keterangan,
      kategori: permintaan.kategori,
      jenis: permintaan.jenis,
      status: '0', // status arsip tersedia atau dihapus
      retensi: permintaan.retensi,
      pembuat: permintaan.pembuat,
      /*
      visibilitas: (() => {
        if (permintaan.visibilitas !== 'undefined') {
          return permintaan.visibilitas
        } else {
          return null
        }
      })(),
      pengguna: (() => {
        if (permintaan.pengguna !== 'undefined') {
          return permintaan.pengguna
        } else {
          return null
        }
      })(), */
      lampiran: (() => {
        if (req.file) {
          return req.file.buffer
        } else {
          return null
        }
      })(),
      riwayat: 'hello', // Belum dikonfigurasi
      penyimpanan: (() => {
        if (permintaan.penyimpanan !== 'undefined') {
          return permintaan.penyimpanan
        } else {
          return null
        }
      })(),
    })
    .then(() => {})
  // console.log(permintaan)
  res.status(200).send({
    status: 200,
    pesan: 'Data berhasil ditambahkan',
  })
}
