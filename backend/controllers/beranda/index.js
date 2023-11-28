module.exports = async (req, res) => {
  const db = require('@/models')

  const sekarang = new Date()
  const awalBulan = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1)
  const akhirBulan = new Date(sekarang.getFullYear(), sekarang.getMonth() + 1, 0)

  const jumlah = {
    arsip: await db.arsip.count(),
    pengguna: await db.pengguna.count(),
    kategori: await db.kategori.count(),
    arsipBulanan: await db.arsip.count({
      where: {
        dibuat: {
          [db.Op.and]: {
            [db.Op.gte]: awalBulan,
            [db.Op.lte]: akhirBulan
          }
        }
      }
    }),
  }

  console.log(jumlah)

  return res.status(200).send({
    pesan: 'sukses',
    data: {
      jumlah
    }
  })
}
