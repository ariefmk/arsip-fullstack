module.exports = (sequelize, dt) => {
  const kategori = sequelize.define('KategoriArsip', {
    kode: {
      type: dt.STRING(10),
      allowNull: false,
      unique: true,
      comment: 'Kode kategori arsip'
    },
    nama: {
      type: dt.TEXT,
      allowNull: false,
      comment: 'Nama kategori arsip'
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
  return kategori
}
