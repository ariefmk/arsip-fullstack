const multer = require('multer')

exports.berkas = multer({ storage: multer.memoryStorage()})
