module.exports = async (req, res) => {
  const db = require('@/models')
  const { kode } = req.query
  try {
    const data = await db.arsip.findOne({
      where: {
        kodeArsip: kode,
      },
      attributes: [
        'kodeArsip',
        'jenis',
        'retensi',
        'nama',
        'keterangan',
        'disahkan',
        'lampiran',
      ],
      include: [
        {
          model: db.kategori,
          attributes: ['kode', 'nama'],
        },
        {
          model: db.penyimpanan,
          attributes: ['kode', 'nama'],
        },
        {
          model: db.dataPengguna,
          attributes: ['nama', 'nik'],
          include: [
            {
              model: db.bidangPengguna,
              attributes: ['nama'],
            },
          ],
        },
      ],
    })
    const dataArsip = {
      kode: data.kodeArsip,
      jenis: data.jenis === 1 ? 'Fisik' : 'Digital',
      perihal: data.nama,
      retensi: {
        berakhir: new Date(data.retensi).toLocaleString('id-ID', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
        sisa: `${
          new Date(data.retensi).getFullYear() - new Date().getFullYear()
        } Tahun`,
      },
      kategori: {
        kode: data.KategoriArsip.kode,
        nama: data.KategoriArsip.nama,
      },
      penyimpanan: {
        kode: data.Penyimpanan?.kode || null,
        nama: data.Penyimpanan?.nama || null,
      },
      pengguna: {
        nik: data.DataPengguna.nik,
        nama: data.DataPengguna.nama,
        bidang: data.DataPengguna.BidangPengguna.nama,
      },
      keterangan: data.keterangan,
      lampiran: data.lampiran || null,
      persetujuan: data.disahkan || null
    }

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
