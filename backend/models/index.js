const config = require('../config/db')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  config.base,
  config.user,
  config.pass,
  {
    host: config.host,
    dialect: config.type,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    },
    define: {
      freezeTableName: true
    },
    logging: false // Mematikan log sequelize
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.logaudit = require('./logAudit')(sequelize, Sequelize)

module.exports = db
