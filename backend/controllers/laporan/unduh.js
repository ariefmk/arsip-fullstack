module.exports = async (req, res) => {
  const { tujuan, catatan, awal, akhir } = req.body
  const kodeKategori = req.body.kategori
  console.log(req.body.arsip)
  // const laporan = require('@/modules/template/laporanArsip')

  // const judulLampiran = 'Judul Laporan'
  res.setHeader('Content-Type', 'application/pdf')
  // res.setHeader('Content-Disposition', judulLampiran)
  // res.send(laporan())
  const fs = require('fs')
  const { jsPDF } = require('jspdf')
  require('jspdf-autotable')
  const db = require('@/models')

  const kategori = (
    await db.kategori.findAll({
      where: { kode: kodeKategori },
      include: [
        {
          model: db.arsip,
          where: {
            dibuat: { [db.Op.and]: { [db.Op.gte]: awal, [db.Op.lte]: akhir } },
          },
        },
      ],
    })
  ).map((data, index) => {
    return {
      nomor: index + 1,
      kode: data.kode,
      kategori: data.nama,
      jumlah: data.Arsips.length,
      arsip: data.Arsips.map((hasil) => {
        return {
          kode: hasil.kodeArsip,
          perihal: hasil.nama,
          tanggal: new Date(hasil.dibuat).toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          }),
          kategori: data.nama,
          retensi: new Date(hasil.retensi).toLocaleString('id-ID', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }),
        }
      }),
    }
  })
  const listArsip = kategori
    .flatMap((item) => item.arsip)
    .map((arsip, index) => {
      return {
        nomor: index + 1,
        ...arsip,
      }
    })

  // console.log(listArsip)
  const logo = fs.readFileSync('./media/balangan.png', 'base64')
  const tanggal = new Date().toLocaleString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
  const barisBaru = (jumlah) => {
    return Array(jumlah).fill('')
  }

  // eslint-disable-next-line new-cap
  const dokumen = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  dokumen.setDocumentProperties({
    title: 'Laporan Arsip',
    author: 'Node.js',
  })

  dokumen
    .setFont('times', 'bold')
    .setFontSize(14)
    .text(['PEMERINTAH KABUPATEN BALANGAN', 'KECAMATAN BATUMANDI'], 105, 21, {
      align: 'center',
      baseline: 'top',
    })
    .setFontSize(18)
    .text('KANTOR DESA MAMPARI', 105, 38, { align: 'center' })
    .setFont('times', 'italic')
    .setFontSize(8)
    .text(
      'Jalan: Sutera Ali Adul Desa Mampari RT. 01, Kec. Batumandi, Kab. Balangan Kode Pos 71663',
      105,
      43,
      { align: 'center' }
    )
    .setFont('times', 'normal')
    .setFontSize(12)
    .text(`Mampari, ${tanggal}`, 180, 52, {
      align: 'right',
    })
    .setFont('times', 'bold')
    .text('LAPORAN ARSIP DESA MAMPARI', 105, 64, {
      align: 'center',
    })

    .setFont('times', 'normal')
    .text(
      [
        '1.   Ringkasan Laporan',
        `      -   Periode Laporan`,
        `      -   Tujuan Laporan`,
      ],
      30,
      86,
      {
        align: 'left',
      }
    )
    .text(['', ':', ':'], 76, 86)
    .text(
      [
        '',
        `${new Date(awal).toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        })} - ${new Date(akhir).toLocaleString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: '2-digit',
        })}`,
      ],
      80,
      86
    )
    .text(['', '', tujuan], 80, 86, {
      maxWidth: 94,
    })

    .text([...barisBaru(5), '2.   Ringkasan Arsip'], 30, 86)

  dokumen.addImage(logo, 'PNG', 30, 21, 16, 22) // Logo Balangan

  dokumen.setLineWidth(1).line(30, 46, 180, 46, 'S')

  dokumen.autoTable({
    body: kategori,
    columns: [
      { header: 'No.', dataKey: 'nomor' },
      { header: 'Kode', dataKey: 'kode' },
      { header: 'Kategori', dataKey: 'kategori' },
      { header: 'Jumlah Arsip', dataKey: 'jumlah' },
    ],
    columnStyles: {
      nomor: { cellWidth: 10, halign: 'center' },
      kode: { halign: 'center', valign: 'middle' },
      jumlah: { cellWidth: 30, halign: 'center' },
    },
    headStyles: {
      font: 'times',
      fontStyle: 'bold',
      fillColor: null,
      textColor: 1,
      fontSize: 12,
      lineColor: 1,
      lineWidth: 0.1,
      halign: 'center',
      valign: 'middle',
    },
    bodyStyles: {
      font: 'times',
      fillColor: null,
      fontSize: 12,
      lineColor: 1,
      lineWidth: 0.1,
    },
    margin: { left: 30, right: 30, top: 116 },
    theme: 'plain',
  })

  const afterTable1 = dokumen.autoTable.previous.finalY
  dokumen.setFont('times', 'normal').text(['', '3.   Catatan'], 30, afterTable1)

  dokumen.autoTable({
    body: [[catatan]],
    bodyStyles: {
      font: 'times',
      fillColor: null,
      fontSize: 12,
      lineColor: 1,
      lineWidth: 0.1,
      halign: 'center',
      valign: 'middle',
    },
    margin: { left: 30, right: 30 },
    startY: afterTable1 + 8,
    theme: 'plain',
  })

  const afterTable2 = dokumen.autoTable.previous.finalY
  dokumen.text(
    [
      ...barisBaru(2),
      'Mengetahui',
      'Kepala Desa',
      ...barisBaru(4),
      'Nama',
      'NIK',
    ],
    30,
    afterTable2
  )
  dokumen.text(
    [...barisBaru(3), 'Sekretaris Desa', ...barisBaru(4), 'Nama', 'NIK'],
    140,
    afterTable2
  )

  // Halaman Lampiran Arsip
  dokumen.addPage('a4', 'l')

  dokumen
    .setFont('times', 'bold')
    .setFontSize(14)
    .text('Lampiran 1: Daftar Arsip', 15, 20)
  dokumen.setFont('times', 'normal').setFontSize(12)
  dokumen.autoTable({
    body: listArsip,
    columns: [
      { header: 'No.', dataKey: 'nomor' },
      { header: 'Tanggal', dataKey: 'tanggal' },
      { header: 'Kategori', dataKey: 'kategori' },
      { header: 'Kode Arsip', dataKey: 'kode' },
      { header: 'Retensi', dataKey: 'retensi' },
      { header: 'Perihal', dataKey: 'perihal' },
    ],
    columnStyles: {
      nomor: { cellWidth: 10, halign: 'center' },
      tanggal: { halign: 'center', cellWidth: 36 },
      kategori: { cellWidth: 60 },
      kode: { halign: 'center', cellWidth: 24 },
      retensi: { halign: 'center', cellWidth: 30 },
    },
    headStyles: {
      font: 'times',
      fontStyle: 'bold',
      fillColor: null,
      textColor: 1,
      fontSize: 12,
      lineColor: 1,
      lineWidth: 0.1,
      halign: 'center',
      valign: 'middle',
    },
    bodyStyles: {
      font: 'times',
      fillColor: null,
      fontSize: 12,
      lineColor: 1,
      lineWidth: 0.1,
    },
    theme: 'plain',
    margin: { left: 15, right: 15, top: 24 },
  })

  dokumen
    .setFont('times', 'italic')
    .text(
      'Laporan ini disusun untuk dokumentasi dan pemantauan arsip fisik dan digital Kantor Desa Mampari',
      148.5,
      dokumen.autoTable.previous.finalY + 6,
      {
        align: 'center',
      }
    )
  res.setHeader('Content-Type', 'application/pdf')
  return res.status(200).send(Buffer.from(dokumen.output('arraybuffer')))
}
