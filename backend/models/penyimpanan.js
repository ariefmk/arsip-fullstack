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
      bidang: {
        type: dt.INTEGER(3),
        allowNull: true,
      },
      nama: {
        type: dt.TEXT,
        allowNull: false
      },
      keterangan: {
        type: dt.TEXT,
        allowNull: false,
      },
      lokasi: {
        type: dt.TEXT,
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
