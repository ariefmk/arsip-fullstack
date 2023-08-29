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
    }// ,
  // logging: false // Mematikan log sequelize
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.logAudit = require('./logAudit')(sequelize, Sequelize)
db.admin = require('./admin')(sequelize, Sequelize)
db.pengguna = require('./pengguna')(sequelize, Sequelize)
db.bidangPengguna = require('./bidangPengguna')(sequelize, Sequelize)
db.dataPengguna = require('./dataPengguna')(sequelize, Sequelize)
db.arsip = require('./arsip')(sequelize, Sequelize)
db.kategoriArsip = require('./kategoriArsip')(sequelize, Sequelize)

module.exports = db
