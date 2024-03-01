module.exports = async (req, res) => {
  const db = require('@/models')
  const { jabatan, bidang } = req.headers

  try {
    const dataKategori = await db.kategori.findAll({
      where: jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
      attributes: ['kode', 'nama'],
    })
    const penyimpanan = await db.penyimpanan.findAll({
      where: jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
      attributes: ['kode', 'nama'],
    })

    /*
    const kodeArsipTerakhir = async (kategori) => {
      const dataArsip = await db.arsip.findOne({
        where: { kategori },
        order: [['kodeArsip', 'DESC']],
      })
      return dataArsip ? dataArsip.kodeArsip : null
    }

    const kodeArsipBaru = async (kategori) => {
      const kodeArsip = kodeArsipTerakhir(kategori)
      let nomorBaru = 1
      if (kodeArsip) {
        const nomorLama = parseInt(kodeArsip.slice(-4), 10)
        nomorBaru = nomorLama + 1
      }

      const nomorArsip = nomorBaru.toString().padStart(4, '0')
      const kodeBaru = kategori + nomorArsip
      return kodeBaru
    }
    */

    const ambilKodeArsip = async (kategori) => {
      const arsipTerakhir = await db.arsip.findOne({
        where: { kategori },
        order: [['kodeArsip', 'DESC']],
      })
      return arsipTerakhir ? arsipTerakhir.kodeArsip : null
    }
    const buatKodeArsip = async (kategori) => {
      const kodeArsipTerakhir = await ambilKodeArsip(kategori)

      let nomorSelanjutnya = 1
      if (kodeArsipTerakhir) {
        const nomorTerakhir = parseInt(kodeArsipTerakhir.slice(-4), 10)
        nomorSelanjutnya = nomorTerakhir + 1
      }

      const nomorBerkasFormatted = nomorSelanjutnya.toString().padStart(4, '0')

      const kodeArsip = kategori + nomorBerkasFormatted

      return kodeArsip
    }
    const kategori = await Promise.all(
      dataKategori.map(async (data) => ({
        kode: data.kode,
        nama: data.nama,
        arsip: await buatKodeArsip(data.kode),
      }))
    )

    return res.status(200).send({
      status: 200,
      pesan: 'Data berhasil diambil',
      data: {
        kategori,
        penyimpanan,
      },
    })
  } catch {
    return res.status(500).send({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
