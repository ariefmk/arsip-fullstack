module.exports = (sequelize, dt) => {
  const arsip = sequelize.define('Arsip', {
    id: {
      type: dt.INTEGER(4),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Id arsip'
    },
    kodeArsip: {
      type: dt.STRING(10),
      allowNull: false,
      unique: true,
      comment: 'Kode arsip'
    },
    nama: {
      type: dt.TEXT,
      allowNull: false,
      comment: 'Nama arsip'
    },
    keterangan: {
      type: dt.TEXT,
      allowNull: false,
      comment: 'Keterangan arsip'
    },
    kategori: {
      type: dt.STRING(10),
      allowNull: true,
      comment: 'Kategori arsip'
    },
    jenis: {
      type: dt.INTEGER(2),
      allowNull: false,
      comment: 'Jenis arsip'
    },
    status: {
      type: dt.INTEGER(2),
      allowNull: false,
      comment: 'Status arsip'
    },
    retensi: {
      type: dt.DATEONLY,
      allowNull: false,
      comment: 'Waktu retensi arsip'
    },
    dibuat: {
      type: dt.DATE,
      allowNull: false,
      comment: 'Waktu dibuat'
    },
    disahkan: {
      type: dt.JSON,
      allowNull: true,
      comment: 'Waktu disahkan'
    },
    pembuat: {
      type: dt.STRING(16),
      allowNull: false,
      comment: 'Pembuat arsip'
    },
    visibilitas: {
      type: dt.BOOLEAN,
      allowNull: true,
      comment: 'Visibilitas arsip'
    },
    pengguna: {
      type: dt.JSON,
      allowNull: true,
      comment: 'Daftar pengakses arsip'
    },
    lampiran: {
      type: dt.BLOB('long'),
      allowNull: true,
      comment: 'Berkas lampiran arsip'
    },
    riwayat: {
      type: dt.JSON,
      allowNull: false,
      comment: 'Riwayat arsip'
    },
    penyimpanan: {
      type: dt.STRING(10),
      allowNull: true,
      comment: 'Id penyimpanan arsip'
    },
    diubah: {
      type: dt.DATE,
      allowNull: false,
      comment: 'Waktu diubah'
    }
  }, {
    timestamps: true,
    createdAt: 'dibuat',
    updatedAt: 'diubah'
  })
  return arsip
}
