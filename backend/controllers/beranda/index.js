module.exports = async (req, res) => {
  const db = require('@/models')
  const { bidang, jabatan } = req.headers
  const sekarang = new Date()
  const awalBulan = new Date(sekarang.getFullYear(), sekarang.getMonth(), 1)
  const akhirBulan = new Date(
    sekarang.getFullYear(),
    sekarang.getMonth() + 1,
    0,
  )

  const jumlah = {
    arsip: await db.arsip.count({
      where: {
        status: 0,
      },
      include: [
        {
          model: db.kategori,
          where:
            jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
        },
      ],
    }),
    pengguna: await db.pengguna.count(),
    kategori: await db.kategori.count({
      where: jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
    }),
    penyimpanan: await db.penyimpanan.count({
      where: jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
    }),
    arsipBulanan: await db.arsip.count({
      where: {
        dibuat: {
          [db.Op.and]: {
            [db.Op.gte]: awalBulan,
            [db.Op.lte]: akhirBulan,
          },
        },
      },
    }),
  }

  const grafik = {
    arsip: (
      await db.kategori.findAll({
        include: [
          {
            model: db.arsip,
          },
        ],
        where:
          jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
      })
    ).map((data) => ({
      kode: data.kode,
      kategori: data.nama,
      berkas: data.Arsips.filter((data1) => data1.status === 0).length,
    })),
    jenis: await db.arsip
      .findAll({
        attributes: ['jenis'],
        include: [
          {
            model: db.kategori,
            where:
              jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
          },
        ],
        where: {
          status: 0,
        },
      })
      .then((data) => ({
        fisik: data.filter((data1) => data1.jenis === 1).length,
        digital: data.filter((data1) => data1.jenis === 2).length,
      })),
    bidang: await db.bidangPengguna
      .findAll({
        include: [
          {
            model: db.kategori,
            where:
              jabatan !== 'Kepala Bidang' || bidang === '5' ? null : { bidang },
            include: [
              {
                model: db.arsip,
                where: {
                  status: 0,
                },
              },
            ],
          },
        ],
      })
      .then((data) =>
        data.map((data1) => ({
          nama: data1.nama,
          jumlah: data1.KategoriArsips.flatMap((data2) => data2.Arsips).length,
        })),
      ),
    // bidang: (
    //   await db.bidangPengguna.findAll({
    //     include: [
    //       {
    //         model: db.arsip
    //       }
    //     ]
    //   })
    // ).map(data => ({

    // }))
  }
  console.log(grafik.bidang)
  return res.status(200).send({
    pesan: 'sukses',
    data: {
      jumlah,
      grafik,
    },
  })
}
