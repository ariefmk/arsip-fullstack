const Logger = require('./logService')

module.exports = {
  pengguna: new Logger('pengguna'),
  arsip: new Logger('arsip'),
  sistem: new Logger('sistem')
}
