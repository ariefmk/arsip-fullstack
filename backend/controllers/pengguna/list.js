module.exports = (req, res) => {
  const db = require('@/models')

  /*
  db.sequelize.query(
    `SELECT *,
    'admin' AS hakAkses
    FROM Admin
    UNION
    SELECT *,
    'pengguna' AS hakAkses
    FROM Pengguna`,
    {
      type: QueryTypes.SELECT,
      include: 'DataPengguna'
    }
  ).then(dataKueri => {
    console.log(dataKueri)
  })
  */
  let dataList = []
  db.pengguna.findAll({
    include: 'DataPengguna'
  }).then(dataKueri => {
    console.log(dataKueri)
    dataList.push(dataKueri)
  })
  console.log('datalist')
  console.log(dataList)
}
