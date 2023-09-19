const Logger = require('./logService')

module.exports = {
  penggunaLog: new Logger('pengguna'),
  arsipLog: new Logger('arsip'),
  sistemLog: new Logger('sistem')
}
