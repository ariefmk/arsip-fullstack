module.exports = (sequelize, dt) => {
  const admin = sequelize.define(
    'Admin',
    {
      id: {
        type: dt.INTEGER(3),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nik: {
        type: dt.STRING(20),
        allowNull: false,
        unique: true,
      },
      kataSandi: {
        type: dt.STRING(64),
        allowNull: false,
      },
      dibuat: {
        type: dt.DATE,
        allowNull: false,
      },
      diubah: {
        type: dt.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: 'dibuat',
      updatedAt: 'diubah',
    }
  )
  return admin
}
