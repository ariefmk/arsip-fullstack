module.exports = (app) => {
  const { berkas } = require('@/middleware/media')
  const { profil } = require('@/controllers')
  app.get('/profil/:nik', profil.data)
  app.put('/profil/:jenis/:nik/', berkas.single('berkas'), profil.ubah)
  // app.put('/profil/ubah-sandi', profil.sandi)
  // /profil/ubah/6311041302010001/sandi
  // /profil/ubah-data/6311041302010001/data
}
