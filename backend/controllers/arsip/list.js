module.exports = async (req, res) => {
  const db = require('@/models')
  const { jabatan, bidang } = req.headers

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
  const kategori = await db.kategori.findAll({
    where: (() => {
      if (jabatan !== 'Kepala Bidang' || bidang === '5') {
        return null
      } else {
        return { bidang }
      }
    })(),
  })
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

  const arsip = await (
    await db.arsip.findAll({
      include: [
        {
          model: db.kategori,
          where: (() => {
            if (jabatan !== 'Kepala Bidang' || bidang === '5') {
              return null
            } else {
              return { bidang }
            }
          })(),
          include: [{ model: db.bidangPengguna }],
        },
        db.penyimpanan,
      ],
    })
  ).map((data) => {
    return {
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
      perihal: data.nama,
      persetujuan: {
        status: data.disahkan
        ? `${data.disahkan.length} persetujuan`
        : 'Belum disetujui',
        oleh: data.disahkan
      },
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
      bidang: data.KategoriArsip.BidangPengguna.nama,
      retensi: data.retensi,
    }
  })
  const penyimpanan = (
    await db.penyimpanan.findAll({
      where: (() => {
        if (jabatan !== 'Kepala Bidang' || bidang === '5') {
          return null
        } else {
          return { bidang }
        }
      })(),
    })
  ).map((data) => {
    return {
      kode: data.kode,
      nama: data.nama,
    }
  })
  res.status(200).send({
    status: 200,
    data: {
      kategori: daftarKategori,
      arsip,
      pengguna,
      penyimpanan,
    },
  })
}
