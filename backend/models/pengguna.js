module.exports = (sequelize, dt) => {
  const pengguna = sequelize.define('Pengguna', {
    id: {
      type: dt.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nik: {
      type: dt.STRING(20),
      allowNull: false
    },
    kataSandi: {
      type: dt.STRING(64),
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
  return pengguna
}
