module.exports = (sequelize, dt) => {
  const kategoriArsip = sequelize.define('KategoriArsip', {
    id: {
      type: dt.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Id kategori arsip'
    },
    nama: {
      type: dt.TEXT,
      allowNull: false,
      comment: 'Nama kategori arsip'
    },
    kode: {
      type: dt.STRING(10),
      allowNull: false,
      unique: true,
      comment: 'Kode kategori arsip'
    },
    bidang: {
      type: dt.INTEGER(3),
      allowNull: true,
      comment: 'Kategori bidang'
    },
    dibuat: {
      type: dt.DATE,
      comment: 'Waktu dibuat'
    },
    diubah: {
      type: dt.DATE,
      comment: 'Waktu diubah'
    }
  }, {
    timestamps: true,
    createdAt: 'dibuat',
    updatedAt: 'diubah'
  })
  return kategoriArsip
}
