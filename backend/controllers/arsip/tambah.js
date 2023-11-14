module.exports = (req, res) => {
  const db = require('@/models')
  const berkas = req.file
  const permintaan = req.body
  db.arsip
    .create({
      kodeArsip: permintaan.kode,
      nama: permintaan.perihal,
      keterangan: permintaan.keterangan|| 'tes',
      kategori: permintaan.kategori,
      jenis: permintaan.jenis,
      status: '0', // Belum dikonfigurasi
      retensi: permintaan.retensi,
      pembuat: '6311041302010001', // Belum dikonfigurasi
      visibilitas: permintaan.visibilitas,
      pengguna: permintaan.pengguna|| null,
      lampiran: berkas,
      riwayat: 'hello', // Belum dikonfigurasi
      penyimpanan: permintaan.penyimpanan || null,
    })
    .then((hasil) => {
      console.log(hasil)
    })
  console.log(permintaan)
  res.status(200).send({
    status: 200,
    pesan: 'Data berhasil ditambahkan',
  })
}
