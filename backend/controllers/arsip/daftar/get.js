module.exports = async (req, res) => {
  const db = require('@/models')
  const { jabatan, bidang } = req.headers
  console.log('a')

  try {
    const arsip = await db.arsip.findAll({
      attributes: [
        'kodeArsip',
        'jenis',
        'retensi',
        'nama',
        'keterangan',
        'disahkan',
        'lampiran',
        'dibuat',
      ],
      include: [
        {
          model: db.kategori,
          where:
            jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
          attributes: ['kode', 'nama'],
          include: {
            model: db.bidangPengguna,
            attributes: ['nama'],
          },
        },
      ],
    })

    const dataArsip = arsip.map((data) => ({
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
      jenis: data.jenis === 1 ? 'Fisik' : 'Digital',
      perihal: data.nama,
      kategori: {
        kode: data.KategoriArsip.kode,
        nama: data.KategoriArsip.nama,
      },
      bidang: data.KategoriArsip.BidangPengguna.nama,
      persetujuan: {
        status: data.disahkan
          ? `${data.disahkan.length} Persetujuan`
          : 'Belum Disetujui',
        oleh: data.disahkan,
      },
    }))

    return res.status(200).send({
      status: 200,
      pesan: 'Data berhasil diambil',
      data: {
        arsip: dataArsip,
      },
    })
  } catch {
    return res.status(500).send({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
