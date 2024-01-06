module.exports = async (req, res) => {
  const { arsip, kategori, penyimpanan } = require('@/models')
  const { kode, bidang } = req.headers

  const dataPenyimpanan = await penyimpanan.findAll({
    where: bidang === '5' ? null : { bidang },
    attributes: ['nama', 'kode'],
  })
  const dataArsip = await arsip.findOne({
    where: {
      kodeArsip: kode,
    },
    attributes: [
      ['kodeArsip', 'kode'],
      'jenis',
      'retensi',
      ['nama', 'perihal'],
      'keterangan',
      'penyimpanan',
    ],
    include: [
      {
        model: kategori,
        attributes: ['nama'],
      },
    ],
  })

  dataArsip.penyimpanan =
    dataArsip.jenis === 1 ? dataArsip.penyimpanan : 'Tidak Ada'
  dataArsip.jenis = dataArsip.jenis === 1 ? 'Fisik' : 'Digital'

  return res.status(200).send({
    status: 200,
    pesan: 'Data berhasil diambil',
    data: {
      arsip: dataArsip,
      penyimpanan: dataPenyimpanan,
    },
  })
}
