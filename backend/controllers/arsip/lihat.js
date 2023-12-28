module.exports = async (req, res) => {
  const db = require('@/models')

  const id = req.params.id
  const data = await db.arsip.findOne({
    where: { id },
    include: ['KategoriArsip', 'DataPengguna', db.penyimpanan],
  })
  const kategori = data.KategoriArsip
  const pengguna = data.DataPengguna
  const arsip = {
    kode: data.kodeArsip,
    perihal: data.nama,
    kategori: kategori.nama,
    keterangan: data.keterangan,
    jenis: (() => {
      if (data.jenis === 1) {
        return 'Fisik'
      } else if (data.jenis === 2) {
        return 'Digital'
      } else {
        return null
      }
    })(),
    retensi: data.retensi,
    persetujuan: data.disahkan,
    pembuat: {
      nama: pengguna.nama,
      bidang: pengguna.bidang,
    },
    lampiran: data.lampiran,
    penyimpanan: data.penyimpanan
  }
  // console.log(data)
  res.setHeader('Content-Type', 'application/json')
  return res.status(200).send({
    pesan: 'ok',
    data: {
      arsip,
    },
  })
}
