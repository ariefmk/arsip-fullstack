const winston = require('winston')
const { logAudit } = require('../models')

const tanggal= () => {
  return new Date(Date.now()).toLocaleString()
}

class LoggerService {
  constructor(route) {
    this.logData = null
    this.route = route
    const logger = winston.createLogger({
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `./logs/${route}.log`,
        }),
      ],
      format: winston.format.printf((info) => {
        let message = `${tanggal()} | ${info.level} | ${route}.log | ${
          info.message
        } | `
        message = info.obj
          ? message + `data: ${JSON.stringify(info.obj)} | `
          : message

        logAudit.create({
          jenis: info.level,
          riwayat: route,
          keterangan: info.message,
          data: info.obj,
        })
        return message
      }),
    })
    this.logger = logger
  }

  setLogData(logData) {
    this.logData = logData
  }

  async info(message, obj) {
    this.logger.log('info', message, {
      obj,
    })
  }

  async debug(message, obj) {
    this.logger.log('debug', message, {
      obj,
    })
  }

  async error(message, obj) {
    this.logger.log('error', message, {
      obj,
    })
  }
}

module.exports = LoggerService
