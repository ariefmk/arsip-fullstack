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

db.logAudit = require('./logAudit')(sequelize, Sequelize)
db.admin = require('./admin')(sequelize, Sequelize)
db.pengguna = require('./pengguna')(sequelize, Sequelize)
db.bidangPengguna = require('./bidangPengguna')(sequelize, Sequelize)
db.dataPengguna = require('./dataPengguna')(sequelize, Sequelize)
db.arsip = require('./arsip')(sequelize, Sequelize)
db.kategoriArsip = require('./kategoriArsip')(sequelize, Sequelize)

db.pengguna.hasOne(db.dataPengguna, {
  foreignKey: 'id',
  sourceKey: 'id'
})

db.dataPengguna.belongsTo(db.pengguna, {
  foreignKey: 'id',
  targetKey: 'id'
})

db.bidangPengguna.hasMany(db.dataPengguna, {
  foreignKey: 'bidang',
  sourceKey: 'id'
})

db.dataPengguna.belongsTo(db.bidangPengguna, {
  foreignKey: 'bidang',
  targetKey: 'id'
})

db.bidangPengguna.hasMany(db.kategoriArsip, {
  foreignKey: 'bidang',
  sourceKey: 'id'
})

db.kategoriArsip.belongsTo(db.bidangPengguna, {
  foreignKey: 'bidang',
  targetKey: 'id'
})

db.kategoriArsip.hasMany(db.arsip, {
  foreignKey: 'kategori',
  sourceKey: 'id'
})

db.arsip.belongsTo(db.kategoriArsip, {
  foreignKey: 'kategori',
  targetKey: 'id'
})

db.dataPengguna.hasMany(db.arsip, {
  foreignKey: 'pembuat',
  sourceKey: 'id'
})

db.arsip.belongsTo(db.dataPengguna, {
  foreignKey: 'pembuat',
  targetKey: 'id'
})

module.exports = db