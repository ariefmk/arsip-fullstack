const winston = require('winston')
const { logaudit } = require('../models')

const dateFormat = () => {
  return new Date(Date.now()).toLocaleString()
}

class LoggerService {
  constructor (route) {
    this.logData = null
    this.route = route
    const logger = winston.createLogger(
      {
        transports: [
          new winston.transports.Console(),
          new winston.transports.File({
            filename: `./logs/${route}.log`
          })
        ],
        format: winston.format.printf((info) => {
          let message = `${dateFormat()} | ${info.level} | ${route}.log | ${info.message} | `
          message = info.obj ? message + `data: ${JSON.stringify(info.obj)} | ` : message
          // message = this.logData ? message + `data: ${JSON.stringify(this.logData)} |` : message

          logaudit.create(
            {
              waktu: new Date(Date.now()).toISOString(),
              jenis: info.level,
              riwayat: route,
              keterangan: info.message,
              data: info.obj
            }
          )
          return message
        })
      })
    this.logger = logger
  }

  setLogData (logData) {
    this.logData = logData
  }

  // async info (message) {
  // this.logger.log('info', message)
  // }

  async info (message, obj) {
    this.logger.log('info', message, {
      obj
    })
  }

  // async debug (message) {
  //  this.logger.log('debug', message)
  // }

  async debug (message, obj) {
    this.logger.log('debug', message, {
      obj
    })
  }

  // async error (message) {
  //  this.logger.log('error', message)
  // }

  async error (message, obj) {
    this.logger.log('error', message, {
      obj
    })
  }
}

module.exports = LoggerService
