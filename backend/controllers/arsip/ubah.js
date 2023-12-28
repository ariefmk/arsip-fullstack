module.exports = (req, res) => {
  const { arsip } = require('@/models')
  const { kode, keterangan, perihal, visibilitas } = req.body
  console.log(req.body)

  /*
  arsip.update(
    {
      nama: perihal,
      keterangan,
      visibilitas: (() => {
        if(visibilitas !== 'undefined') {
          return visibilitas
        } else {
          return null
        }
      })()
    },
    {
      where: {
        kodeArsip: kode
      }
    }
  ).then(() => {
    return res.status(200).send({
      status: 200,
      pesan: 'Data berhasil ditambahkan',
    })
  })
    */
    return res.status(200).send({
      status: 200,
      pesan: 'Data berhasil ditambahkan',
    })
}
