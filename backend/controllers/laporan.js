exports.unduh = (req, res) => {
  const laporan = require('../modules/template/laporanArsip')

  // const judulLampiran = 'Judul Laporan'
  res.setHeader('Content-Type', 'application/pdf')
  // res.setHeader('Content-Disposition', judulLampiran)
  res.send(laporan())
}
