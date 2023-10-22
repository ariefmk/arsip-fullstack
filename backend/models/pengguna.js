module.exports = (sequelize, dt) => {
  const pengguna = sequelize.define('Pengguna', {
    nik: {
      type: dt.STRING(20),
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    hakAkses: {
      type: dt.STRING(30),
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
