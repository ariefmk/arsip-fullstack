module.exports = (req, res) => {
  const { namaLengkap, alamatRumah, jenisKelamin, nomorTelepon, tanggalLahir } =
    req.body
  const { nik } = req.query
  const { dataPengguna } = require('@/models')
  try {
    dataPengguna.update(
      {
        nama: namaLengkap,
        alamat: alamatRumah,
        jenisKelamin,
        nomorTelepon,
        tanggalLahir,
        foto: (() => {
          if (req.file) {
            return req.file.buffer
          } else {
            return undefined
          }
        })(),
      },
      {
        where: {
          nik,
        },
      }
    )
    res.status(200).send({
      status: 200,
      pesan: 'Data profil berhasil diperbarui',
    })
  } catch {
    return res.status(500).send({
      status: 500,
      pesan: 'Kesalahan Sistem',
    })
  }
}
