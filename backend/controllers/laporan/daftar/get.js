module.exports = async (req, res) => {
  const db = require('@/models')

  const daftarKategori = await db.kategori.findAll({
    attribute: ['kode', 'nama'],
    include: [
      {
        model: db.arsip,
        where: {
          disahkan: {
            [db.Op.ne]: null,
          },
          status : 0
        },
        attributes: ['kodeArsip', 'nama', 'dibuat', 'retensi'],
      },
    ],
  })

  const kategori = daftarKategori.map((data) => ({
    kode: data.kode,
    nama: data.nama,
    arsip: data.Arsips.map((hasil) => ({
      kode: hasil.kodeArsip,
      perihal: hasil.nama,
      tanggal: hasil.dibuat,
      kategori: data.nama,
      retensi: hasil.retensi,
    })),
  }))

  return res.status(200).send({
    status: 200,
    pesan: 'Data berhasil diambil',
    data: {
      kategori,
    },
  })
}
