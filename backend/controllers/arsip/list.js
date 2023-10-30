module.exports = async (req, res) => {
  const db = require('@/models')

  const kategori = await db.kategori.findAll()
  const daftarKategori = kategori.map(data => {
    return {
      kode: data.kode,
      nama: data.nama,
    }
  })
  console.log(daftarKategori)
  res.status(200).send({
    status: 200,
    data: {
      kategori: daftarKategori,
      arsip: 'arsip'
    }
  })
}
