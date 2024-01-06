/*
module.exports = (req, res) => {
  const method = req.method
  if (method === 'GET') {
    const get = require('./get')(req, res)
    return res.status(200).send({
      status: 200,
      pesan: 'Data berhasil diambil'
    })
    
  }
}*/
module.exports = {
  get: require('./get'),
  put: require('./put')
}
