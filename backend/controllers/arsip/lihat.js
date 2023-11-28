module.exports = async (req, res) => {
  const db = require('@/models')

  const id = req.params.id
  const data = (
    await db.arsip.findAll({
      where: { id },
      include: ['KategoriArsip', 'DataPengguna'],
    })
  )[0]
  // console.log(data)
  const kategori= data.KategoriArsip
  const pengguna = data.DataPengguna
  const arsip = {
    kode: data.kodeArsip,
    perihal: data.nama,
    kategori: kategori.nama,
    jenis: (() => {
      if (data.jenis === 1) {
        return 'Fisik'
      } else if (data.jenis === 2) {
        return 'Digital'
      } else {
        return null
      }
    })(),
    retensi: new Date(data.retensi).toLocaleString('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    persetujuan: data.disahkan,
    pembuat: {
      nama: pengguna.nama,
      bidang: pengguna.bidang
    }
  }
  return res.status(200).send({
    pesan: 'ok',
    data: {
      arsip,
    },
  })
}
