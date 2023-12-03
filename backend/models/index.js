const config = require('../config').db
const Sequelize = require('sequelize')

const sequelize = new Sequelize(config.base, config.user, config.pass, {
  host: config.host,
  port: config.port,
  dialect: config.type,
  timezone: config.timezone,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  define: {
    freezeTableName: true,
  },
  logging: false, // Mematikan log sequelize
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.Op = Sequelize.Op

db.logAudit = require('./logAudit')(sequelize, Sequelize)

// db.admin = require('./admin')(sequelize, Sequelize)
db.pengguna = require('./pengguna')(sequelize, Sequelize)
db.bidangPengguna = require('./bidangPengguna')(sequelize, Sequelize)
db.dataPengguna = require('./dataPengguna')(sequelize, Sequelize)
db.arsip = require('./arsip')(sequelize, Sequelize)
db.penyimpanan = require('./penyimpanan')(sequelize, Sequelize)
db.kategori = require('./kategoriArsip')(sequelize, Sequelize)
db.pengguna.hasOne(db.dataPengguna, {
  foreignKey: 'nik',
  sourceKey: 'nik',
})

db.dataPengguna.belongsTo(db.pengguna, {
  foreignKey: 'nik',
  targetKey: 'nik',
})

db.bidangPengguna.hasMany(db.dataPengguna, {
  foreignKey: 'bidang',
  sourceKey: 'id',
})

db.dataPengguna.belongsTo(db.bidangPengguna, {
  foreignKey: 'bidang',
  targetKey: 'id',
})

db.bidangPengguna.hasMany(db.kategori, {
  foreignKey: 'bidang',
  sourceKey: 'id',
})

db.kategori.belongsTo(db.bidangPengguna, {
  foreignKey: 'bidang',
  targetKey: 'id',
})

db.kategori.hasMany(db.arsip, {
  foreignKey: 'kategori',
  sourceKey: 'kode',
})

db.arsip.belongsTo(db.kategori, {
  foreignKey: 'kategori',
  targetKey: 'kode',
})

db.dataPengguna.hasMany(db.arsip, {
  foreignKey: 'pembuat',
  sourceKey: 'nik',
})

db.arsip.belongsTo(db.dataPengguna, {
  foreignKey: 'pembuat',
  targetKey: 'nik',
})

db.penyimpanan.hasMany(db.arsip, {
  foreignKey: 'penyimpanan',
  sourceKey: 'kode',
})

db.arsip.belongsTo(db.penyimpanan, {
  foreignKey: 'penyimpanan',
  targetKey: 'kode',
})
db.bidangPengguna.hasMany(db.penyimpanan, {
  foreignKey: 'bidang',
  sourceKey: 'id',
})
db.penyimpanan.belongsTo(db.bidangPengguna, {
  foreignKey: 'bidang',
  targetKey: 'id',
})
module.exports = db
