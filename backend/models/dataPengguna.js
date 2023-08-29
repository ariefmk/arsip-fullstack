module.exports = (sequelize, dt) => {
  const dataPengguna = sequelize.define('DataPengguna', {
    id: {
      type: dt.INTEGER(3),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      comment: 'Id data pengguna'
    },
    nama: {
      type: dt.STRING(30),
      allowNull: false,
      comment: 'Nama lengkap pengguna'
    },
    alamat: {
      type: dt.TEXT,
      allowNull: false,
      comment: 'Alamat lengkap pengguna'
    },
    jenisKelamin: {
      type: dt.INTEGER(1),
      allowNull: false,
      comment: 'Jenis kelamin pengguna'
    },
    nomorTelepon: {
      type: dt.STRING(15),
      allowNull: false,
      comment: 'Nomor telepon pengguna'
    },
    tanggalLahir: {
      type: dt.DATEONLY,
      allowNull: false,
      comment: 'Tanggal lahir pengguna'
    },
    jabatan: {
      type: dt.STRING(20),
      allowNull: true,
      comment: 'Jabatan pengguna'
    },
    bidang: {
      type: dt.INTEGER(3),
      allowNull: true,
      comment: 'Bidang pengguna'
    },
    foto: {
      type: dt.BLOB('long'),
      allowNull: false,
      comment: 'Foto profil pengguna'
    },
    dibuat: {
      type: dt.DATE,
      allowNull: false,
      comment: 'Waktu dibuat'
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
  return dataPengguna
}
