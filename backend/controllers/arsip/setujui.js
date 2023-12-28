module.exports = (req, res) => {
  const { arsip } = require('@/models')
  const { kode, persetujuan } = req.body

  arsip
    .findOne({
      where: {
        kodeArsip: kode,
      },
    })
    .then((hasil) => {
      const status = hasil.disahkan
      let disahkan = []
      if (status === null || status.length === 0) {
        disahkan.push({
          nik: persetujuan.nik,
          nama: persetujuan.nama,
          jabatan: persetujuan.jabatan,
          waktu: new Date()
        })
      } 
      if (status !== null && status.length === 1) {
        disahkan = status
        disahkan.push({
          nik: persetujuan.nik,
          nama: persetujuan.nama,
          jabatan: persetujuan.jabatan,
          waktu: new Date()
        })
      }

      arsip.update(
        {
          disahkan,
        },
        {
          where: {
            kodeArsip: kode,
          },
        }
      )
    })
  return res.status(200).send({
    status: 200,
    pesan: 'Arsip berhasil disetujui',
  })
}
