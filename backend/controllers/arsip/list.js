module.exports = async (req, res) => {
  const db = require('@/models')

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

    // Gabungkan kode kategori dengan nomor berkas yang telah diformat
    const kodeArsip = kategori + nomorBerkasFormatted

    return kodeArsip
  }
  const kategori = await db.kategori.findAll()
  const daftarKategori = await Promise.all(
    kategori.map(async (data) => {
      const kodeArsip = await buatKodeArsip(data.kode)
      return {
        kode: data.kode,
        nama: data.nama,
        arsip: kodeArsip,
      }
    })
  )

  const pengguna = await db.dataPengguna.findAll({
    where: {
      jabatan: {
        [db.Op.ne]: null,
      },
    },
    attributes: ['nik', 'nama'],
  })
  const daftarArsip = await db.arsip.findAll({ include: 'KategoriArsip' })

  const arsip = await daftarArsip.map((data) => {
    return {
      id: data.id,
      kode: data.kodeArsip,
      waktu: new Date(data.dibuat).toLocaleString('id-ID', {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      }),
      nama: data.nama,
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
      kategori: data.KategoriArsip.nama,
    }
  })
  res.status(200).send({
    status: 200,
    data: {
      kategori: daftarKategori,
      arsip,
      pengguna,
    },
  })
}
