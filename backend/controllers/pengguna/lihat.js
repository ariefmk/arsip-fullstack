module.exports = async (req, res) => {
  const { pengguna, dataPengguna, bidangPengguna } = require('@/models')
  const { nik } = req.query

  try {
    const dataKueri = await dataPengguna.findOne({
      where: {
        nik,
      },
      include: [
        {
          model: pengguna,
          attributes: ['hakAkses'],
        },
        {
          model: bidangPengguna,
          attributes: ['nama'],
        },
      ],
    })
    const data = {
      hak: dataKueri.Pengguna.hakAkses,
      nik: dataKueri.nik,
      nama: dataKueri.nama,
      jabatan: dataKueri.jabatan || 'Tidak Ada',
      bidang: dataKueri.BidangPengguna?.nama || 'Tidak Ada',
      tanggal: dataKueri.tanggalLahir,
      kelamin: dataKueri.jenisKelamin,
      telepon: dataKueri.nomorTelepon,
      alamat: dataKueri.alamat
    }

    return res.status(200).send({
      status: 200,
      pesan: 'Sukses',
      data
    })
  } catch {
    return res.status(500).send({
      status: 500,
      pesan: 'Kesalahan Internal',
    })
  }
}
