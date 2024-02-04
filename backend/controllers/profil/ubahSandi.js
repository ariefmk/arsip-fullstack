module.exports = async (req, res) => {
  const bcrypt = require('bcrypt')
  const { pengguna } = require('@/models')
  const { sandi, konfirmasi } = req.body
  const { nik } = req.query

  try {
    if (sandi !== konfirmasi) {
      return res.status(400).send({
        status: 400,
        pesan: 'Sandi dan konfirmasi tidak sesuai'
      })
    }
    const hashSandi = await bcrypt.hash(sandi, 10)
    pengguna.update(
      {
        kataSandi: hashSandi,
      },
      {
        where: {
          nik,
        },
      }
    )
    res.status(200).send({
      status: 200,
      pesan: 'Kata sandi berhasil diperbarui'
    })
  } catch {
    res.status(500).send({
      status: 500,
      pesan: 'Kesalahan Sistem',
    })
  }
}
