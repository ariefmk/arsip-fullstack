exports.unduh = (req, res) => {
  const { jsPDF } = require('jspdf')

  const waktu = new Date(Date.now())
  const fs = require('fs')
  const logoBalangan = fs.readFileSync('./media/balangan.png', 'base64')

  // const attachment = `attachment; filename=Laporan Arsip Kantor Desa Mampari - ${waktu}.pdf`

  const dokumen = jsPDF('p', 'cm', 'a4')

  dokumen.setDocumentProperties(
    {
      title: `Laporan Arsip Kantor Desa Mampari - ${waktu}`
    }
  )

  dokumen.addImage(logoBalangan, 'PNG', 3, 2.1, 1.8, 2.1)

  dokumen.setFont('times', 'bold')
  dokumen.setFontSize(14)
  dokumen.text(['PEMERINTAH KABUPATEN BALANGAN', 'KECAMATAN BATUMANDI'], 10.5, 2.5, { align: 'center' })

  dokumen.setFontSize(18)
  dokumen.text('KANTOR DESA MAMPARI', 10.5, 3.7, { align: 'center' })

  dokumen.setFont('times', 'italic')
  dokumen.setFontSize(8)
  dokumen.text('Jalan: Sutera Ali Adul Desa Mampari Rt. 01 Kec. Batumandi Kab.Balangan Kode Pos 71663', 10.5, 4.1, { align: 'center' })

  dokumen.setLineWidth(0.1)
  dokumen.line(3, 4.3, 18, 4.3, 'S')

  const setBerkas = dokumen.output('arraybuffer')

  res.setHeader('Content-Type', 'application/pdf')
  // res.setHeader('Content-Disposition', attachment)
  res.send(Buffer.from(setBerkas))
}
