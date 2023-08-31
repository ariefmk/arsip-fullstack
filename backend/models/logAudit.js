module.exports = (sequelize, dt) => {
  const logaudit = sequelize.define('LogAudit', {
    id: {
      type: dt.INTEGER(5),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    waktu: {
      type: dt.DATE,
      allowNull: false
    },
    jenis: {
      type: dt.TEXT,
      allowNull: false
    },
    riwayat: {
      type: dt.STRING(20),
      allowNull: false
    },
    keterangan: {
      type: dt.TEXT,
      allowNull: false
    },
    data: {
      type: dt.JSON,
      allowNull: true
    }
  }, {
    timestamps: true,
    createdAt: 'waktu',
    updatedAt: false
  })
  return logaudit
}
