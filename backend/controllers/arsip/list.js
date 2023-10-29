module.exports = (req, res) => {
  const db = require('@/models')
  
  res.status(200).send({
    status: 200,
    data: {
      kategori: 'kategori',
      arsip: 'arsip'
    }
  })
}
