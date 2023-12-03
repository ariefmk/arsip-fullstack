module.exports = async (req, res) => {
  const db = require('@/models')

  const sekarang = new Date()
  const awalBulan = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1)
  const akhirBulan = new Date(
    sekarang.getFullYear(),
    sekarang.getMonth() + 1,
    0
  )

  const jumlah = {
    arsip: await db.arsip.count(),
    pengguna: await db.pengguna.count(),
    kategori: await db.kategori.count(),
    arsipBulanan: await db.arsip.count({
      where: {
        dibuat: {
          [db.Op.and]: {
            [db.Op.gte]: awalBulan,
            [db.Op.lte]: akhirBulan,
          },
        },
      },
    }),
  }

  const grafik = {
    kategori: (await db.kategori.findAll({ include: db.arsip })).map((data) => {
      console.log(data.Arsips)
      return {
        kode: data.kode,
        kategori: data.nama,
        berkas: data.Arsips.length,
      }
    }),
  }

  console.log(grafik)

  return res.status(200).send({
    pesan: 'sukses',
    data: {
      jumlah,
      grafik,
    },
  })
}
