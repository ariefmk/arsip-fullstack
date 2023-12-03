module.exports = async (req, res) => {
  const db = require('@/models')
  const ambilKodePenyimpanan = async (kode) => {
    const kodeTerakhir = await db.penyimpanan.findOne({
      order: [['kode', 'DESC']],
    })
    return kodeTerakhir ? kodeTerakhir.kode : null
  }

  const buatKodePenyimpanan = async (penyimpanan) => {
    const kodeTerakhir = await ambilKodePenyimpanan(penyimpanan)
    // console.log(kodeTerakhir)

    let nomorSelanjutnya = 1
    if (kodeTerakhir) {
      const nomorTerakhir = parseInt(kodeTerakhir.slice(-4), 10)
      nomorSelanjutnya = nomorTerakhir + 1
    }

    const nomorBerkasFormatted = nomorSelanjutnya.toString().padStart(4, '0')

    const kodePenyimpanan = penyimpanan + nomorBerkasFormatted

    return kodePenyimpanan
  }
  const daftarPenyimpanan = await (
    await db.penyimpanan.findAll({include: db.bidangPengguna})
  ).map((data) => {
    return {
      kode: data.kode,
      bidang: data.BidangPengguna.nama,
      nama: data.nama,
      lokasi: data.lokasi,
      keterangan: data.keterangan,
    }
  })
  // console.log(daftarPenyimpanan)

  const kode = await buatKodePenyimpanan('PAF')
  return res.status(200).send({
    pesan: 'ok',
    data: {
      kode,
      penyimpanan: daftarPenyimpanan,
    },
  })
}
