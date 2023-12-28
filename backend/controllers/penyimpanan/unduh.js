module.exports = async (req, res) => {
  const qr = require('qrcode')
  const fs = require('fs')
  const { jsPDF } = require('jspdf')
  const db = require('@/models')

  // console.log(req.body)
  const penyimpanan = await db.penyimpanan.findOne({
    include: [{ model: db.bidangPengguna }, { model: db.arsip, include: db.kategori }],
    where: { kode: req.body.kode },
  })

  const kodeArsip = penyimpanan.Arsips.map((data) => data.kodeArsip)
  const arsip = penyimpanan.Arsips.map((data) => {
    return {
      kode: data.kodeArsip,
      nama: data.nama,
      keterangan: data.keterangan,
      kategori: data.KategoriArsip.nama,
      jenis: (() => {
        if (data.jenis === 1) {
          return 'Fisik'
        } else {
          return 'Digital'
        }
      })(),
      retensi: data.retensi,
    }
  })

  // console.log(arsip)
  const waktu = new Date(Date.now()).toLocaleString('id-Id', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const logo = fs.readFileSync('./media/balangan.png', 'base64')

  const dataQr = [
    {
      kode: penyimpanan.kode,
      judul: penyimpanan.nama,
      deskripsi: penyimpanan.keterangan,
      lokasi: penyimpanan.lokasi,
      berkas: arsip,
      waktu,
    },
  ]
  const hasilQr = await qr.toDataURL(JSON.stringify(dataQr))

  // eslint-disable-next-line new-cap
  const dokumen = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  })

  dokumen.setDocumentProperties({
    title: 'Label Penyimpanan',
    author: 'Node.js',
  })

  // format bentuk
  dokumen
    .rect(5, 5, 200, 20)
    .rect(5, 25, 120, 70)
    .rect(5, 95, 120, 30)
    .rect(125, 25, 80, 100)
    .rect(5, 125, 200, 10)

  dokumen
    .addImage(logo, 'PNG', 10, 7.5, 12, 15)
    .addImage(hasilQr, 'PNG', 40, 43, 50, 50)

  dokumen
    .setFont('times', 'bold')
    .setFontSize(16)
    .text('Arsip Kantor Desa Mampari', 25, 15, {
      baseline: 'middle',
    })
    .setFont('times', 'normal')
    .setFontSize(12)
    .text(`Dicetak tanggal: ${waktu}`, 135, 15, {
      baseline: 'middle',
    })

  dokumen
    .setFont('times', 'normal')
    .setFontSize(14)
    .text('Label Penyimpanan Arsip Fisik', 65, 30, {
      align: 'center',
    })
    .setFont('times', 'bold')
    .text(penyimpanan.kode, 65, 37, {
      align: 'center',
    })
    .setFontSize(12)
    .setFont('times', 'normal')
    .text(penyimpanan.nama, 65, 43, {
      align: 'center',
    })

  dokumen
    .setFont('times', 'bold')
    .setFontSize(12)
    .text('Deskripsi:', 10, 100, {
      align: 'left',
    })
    .setFont('times', 'normal')
    .text(penyimpanan.keterangan, 10, 105, {
      align: 'left',
      maxWidth: 120,
    })

  dokumen
    .setFont('times', 'normal')
    .setFontSize(12)
    .text(`Informasi Lokasi Penyimpanan: ${penyimpanan.lokasi}`, 10, 130, {
      baseline: 'middle',
    })

  dokumen
    .setFont('times', 'bold')
    .setFontSize(12)
    .text('Daftar Kode Berkas Arsip', 165, 30, {
      align: 'center',
    })
    .setFont('times', 'normal')
    .setFontSize(10)
    .text(kodeArsip.join(', '), 165, 38, {
      align: 'center',
      maxWidth: 68,
    })
  // console.log(dokumen.output('arraybuffer'))

  res.setHeader('Content-Type', 'application/pdf')
  return res.status(200).send(Buffer.from(dokumen.output('arraybuffer')))
}
