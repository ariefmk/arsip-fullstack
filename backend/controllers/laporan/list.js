module.exports = async (req, res) => {
  const { kategori, arsip } = require('@/models')

  const listKategori = (await kategori.findAll({ include: [arsip] })).map(
    (data) => {
      return {
        kode: data.kode,
        nama: data.nama,
        arsip: data.Arsips.map((hasil) => {
          return {
            kode: hasil.kodeArsip,
            perihal: hasil.nama,
            tanggal: hasil.dibuat,
            kategori: data.nama,
            retensi: hasil.retensi,
          }
        }),
      }
    }
  )

  // console.log(listKategori)
  return res.status(200).send({
    status: 200,
    data: {
      kategori: listKategori,
    },
  })
}
