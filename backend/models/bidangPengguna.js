module.exports = (sequelize, dt) => {
  const bidangPengguna = sequelize.define('BidangPengguna', {
    id: {
      type: dt.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama: {
      type: dt.TEXT,
      allowNull: false
    },
    dibuat: {
      type: dt.DATE,
      allowNull: false
    },
    diubah: {
      type: dt.DATE,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'dibuat',
    updatedAt: 'diubah'
  })
  return bidangPengguna
}
