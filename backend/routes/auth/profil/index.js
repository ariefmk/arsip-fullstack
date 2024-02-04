module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { data, ubahData, ubahSandi } = require('@/controllers').profil
  app.get('/profil/:nik', data)
  app.put('/profil/data', berkas.single('berkas'), ubahData)
  app.put('/profil/sandi', ubahSandi)
}
