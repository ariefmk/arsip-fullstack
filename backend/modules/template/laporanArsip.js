module.exports = (properti) => {
  const fs = require('fs')
  const { jsPDF } = require('jspdf')

  const waktu = new Date(Date.now())
  const logo = fs.readFileSync('./media/balangan.png', 'base64')

  // eslint-disable-next-line new-cap
  const dokumen = new jsPDF({
    orientation: 'p',
    unit: 'cm',
    format: 'a4'
  })

  const data = {
    judul: `Laporan Arsip Kantor Desa Mampari - ${waktu}`,
    pengarang: 'Arief Maulana',
    keterangan: '',
    kataKunci: '',
    aplikasi: 'Dibuat menggunakan jsPDF'
  }

  kop(dokumen, logo, data)
  return Buffer.from(dokumen.output('arraybuffer'))
}

const kop = (dokumen, logo, properti) => {
  dokumen
    .setDocumentProperties({
      title: properti.judul,
      author: properti.pengarang,
      subject: properti.keterangan,
      keywords: properti.kataKunci,
      creator: properti.aplikasi
    })
    .setFont('times', 'bold').setFontSize(14)
    .addImage(logo, 'PNG', 3, 2.1, 1.8, 2.1) // Logo Balangan
    .text(['PEMERINTAH KABUPATEN BALANGAN', 'KECAMATAN BATUMANDI'], 10.5, 2.5, { align: 'center' })
    .setFontSize(18)
    .text('KANTOR DESA MAMPARI', 10.5, 3.7, { align: 'center' })
    .setFont('times', 'italic').setFontSize(8)
    .text('Jalan: Sutera Ali Adul Desa Mampari Rt. 01, Kec. Batumandi, Kab. Balangan Kode Pos 716631', 10.5, 4.1, { align: 'center' })
    .setLineWidth(0.1).line(3, 4.3, 18, 4.3, 'S')
  return dokumen
}
