module.exports = (sequelize, dt) => {
  const penyimpanan = sequelize.define(
    'Penyimpanan',
    {
      id: {
        type: dt.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Id penyimpanan arsip',
      },
      kode: {
        type: dt.STRING(10),
        allowNull: false,
        unique: true,
        comment: 'Kode penyimpanan arsip',
      },
      keterangan: {
        type: dt.TEXT,
        allowNull: false,
      },
      metadata: {
        type: dt.JSON,
        allowNull: true,
      },
      dibuat: {
        type: dt.DATE,
        allowNull: false,
        commnent: 'Waktu dibuat',
      },
      diubah: {
        type: dt.DATE,
        allowNull: false,
        comment: 'Waktu diubah',
      },
    },
    {
      timestamps: true,
      createdAt: 'dibuat',
      updatedAt: 'diubah',
    }
  )
  return penyimpanan
}
