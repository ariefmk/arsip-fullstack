import * as yup from 'yup'
export const skemaMasuk = yup.object({
  nik: yup
    .string()
    .required('NIK wajib diisi')
    .matches(/^\d+$/, 'NIK hanya mengandung angka')
    .min(16, 'Panjang NIK harus 16 karakter'),
  kataSandi: yup
    .string()
    .required('Kata Sandi wajib diisi')
    .min(8, 'Kata sandi minimal 8 karakter'),
})

export const skemaPenggunaTambah = (nik) => {
  return yup.object({
    hak: yup.string().oneOf(['Admin', 'Standar'], 'Pilih salah satu'),
    nik: yup
      .string()
      .required('NIK wajib diisi')
      .matches(/^\d+$/, 'NIK hanya mengandung angka')
      .min(16, 'Panjang NIK harus 16 karakter')
      .notOneOf(nik, 'NIK sudah ada'),
    kataSandi: yup
      .string()
      .required('Kata Sandi wajib diisi')
      .min(8, 'Kata sandi minimal 8 karakter'),
    nama: yup.string().required('Nama lengkap wajib diisi'),
    jabatan: yup.string().when('hak', {
      is: 'Standar',
      then: (jabatan) =>
        jabatan.oneOf(
          ['Kepala Desa', 'Sekretaris', 'Kepala Bidang'],
          'Pilih salah satu'
        ),
    }),
    bidang: yup.string().when(['hak', 'jabatan'], {
      is: (hak, jabatan) => hak === 'Standar' && jabatan === 'Kepala Bidang',
      then: (bidang) =>
        bidang.oneOf(['1', '2', '3', '4', '5'], 'Pilih salah satu'),
    }),
    tanggal: yup
      .date()
      .required('Tanggal wajib diisi')
      .typeError('Format salah'),
    kelamin: yup.string().oneOf(['1', '2'], 'Pilih jenis kelamin'),
    telepon: yup
      .string()
      .required('Nomor telepon wajib diisi')
      .matches(/^\d+$/, 'Nomor telepon hanya mengandung angka'),
    alamat: yup.string().required('Alamat wajib diisi'),
  })
}

export const skemaPenggunaUbah = () => {
  return yup.object({
    kataSandi: yup
      .string()
      .required('Kata Sandi wajib diisi')
      .min(8, 'Kata sandi minimal 8 karakter'),
    nama: yup.string().required('Nama lengkap wajib diisi'),
    jabatan: yup
      .string()
      .oneOf(
        ['kepala desa', 'sekretaris', 'kepala bidang'],
        'Pilih salah satu'
      ),
    bidang: yup.string().when('jabatan', {
      is: (jabatan) => jabatan === 'kepala bidang',
      then: (bidang) =>
        bidang.oneOf(
          ['kesra', 'pemerintahan', 'kewilayahan', 'keuangan', 'umum'],
          'Pilih salah satu'
        ),
    }),
    telepon: yup
      .string()
      .required('Nomor telepon wajib diisi')
      .matches(/^\d+$/, 'Nomor telepon hanya mengandung angka'),
    alamat: yup.string().required('Alamat wajib diisi'),
  })
}
export const skemaKategoriTambah = (kode) => {
  return yup.object({
    bidang: yup.string().oneOf(['1', '2', '3', '4', '5'], 'Pilih salah satu'),
    nama: yup.string().required('Nama kategori wajib diisi'),
    kode: yup
      .string()
      .required('Kode kategori wajib diisi')
      .notOneOf(kode, 'Kode kategori sudah digunakan'),
    keterangan: yup.string().required('Keterangan wajib diisi'),
  })
}

export const skemaKategoriUbah = () => {
  return yup.object({
    kategori: yup.string().required('Nama kategori wajib diisi'),
    keterangan: yup.string().required('Keterangan wajib diisi'),
  })
}

export const skemaPenyimpananTambah = () => {
  return yup.object({
    bidang: yup.string().oneOf(['1', '2', '3', '4', '5'], 'Pilih salah satu'),
    nama: yup.string().required('Nama penyimpanan wajib diisi'),
    keterangan: yup.string().required('Keterangan wajib diisi'),
    lokasi: yup.string().required('Informasi lokasi penyimpanan wajib diisi'),
  })
}

export const skemaArsipTambah = (kategori, dataPenyimpanan) => {
  return yup.object({
    kode: yup.string(),
    kategori: yup.string().oneOf(kategori, 'Pilih salah satu'),
    jenis: yup.string().when('kategori', {
      is: (kategori) => kategori !== '',
      then: (jenis) => jenis.oneOf(['1', '2'], 'Pilih salah satu'),
    }),
    retensi: yup.number().when('kategori', {
      is: (kategori) => kategori !== '',
      then: (retensi) =>
        retensi
          .typeError('Retensi wajib diisi')
          .required('Retensi wajib diisi'),
    }),
    penyimpanan: yup.string().when('jenis', {
      is: '1',
      then: (penyimpanan) =>
        penyimpanan.oneOf(dataPenyimpanan, 'Pilih salah satu'),
    }),
    perihal: yup.string().when('kategori', {
      is: (kategori) => kategori !== '',
      then: (perihal) => perihal.required('Perihal arsip wajib diisi'),
    }),
    keterangan: yup.string().when('kategori', {
      is: (kategori) => kategori !== '',
      then: (keterangan) => keterangan.required('Keterangan wajib diisi'),
    }),
    /*
    visibilitas: yup.string().when('jenis', {
      is: '2',
      then: (visibilitas) => visibilitas.required('Pilih salah satu'),
    }),
    pengguna: yup
      .array()
      .of(yup.string())
      .when('visibilitas', {
        is: '1',
        then: (pengguna) =>
          pengguna
            .min(1, 'Pilih pengguna minimal satu')
            .required('Pilih pengguna'),
      }),*/
    berkas: yup.mixed().when('jenis', {
      is: '2',
      then: (berkas) =>
        berkas.test({
          name: 'cek-berkas',
          message: 'Tambahkan berkas',
          test: (nilai) => nilai !== undefined && nilai.length ===1,
        }),
    }),
  })
}

export const skemaArsipUbah = (dataPenyimpanan) => {
  return yup.object({
    kode: yup.string(),
    jenis: yup.string().oneOf(['Fisik', 'Digital']),
    penyimpanan: yup.string().when('jenis', {
      is: 'Fisik',
      then: (penyimpanan) =>
        penyimpanan
          .oneOf(dataPenyimpanan, 'Pilih salah satu')
          .required('Pilih salah satu'),
    }),
    perihal: yup.string().required('Perihal arsip wajib diisi'),
    keterangan: yup.string().required('Keterangan wajib diisi'),
    /*
    visibilitas: yup.string().when('jenis', {
      is: 'Digital',
      then: (visibilitas) => visibilitas.required('Pilih salah satu'),
    }),*/
  })
}

export const skemaProfil = () => {
  return yup.object({
    nama: yup.string().required('Nama lengkap wajib diisi'),
    tanggal: yup
      .date()
      .required('Tanggal wajib diisi')
      .typeError('Tanggal wajib diisi'),
    kelamin: yup
      .string()
      .oneOf(['1', '2'], 'Pilih jenis kelamin')
      .required('Pilih jenis kelamin'),
    telepon: yup
      .string()
      .required('Nomor telepon wajib diisi')
      .matches(/^\d+$/, 'Nomor telepon hanya mengandung angka'),
    alamat: yup.string().required('Alamat wajib diisi'),
  })
}

export const skemaSandi = () => {
  return yup.object({
    sandi: yup
      .string()
      .required('Wajib diisi')
      .min(8, 'Kata sandi minimal 8 karakter'),
    konfirmasi: yup
      .string()
      .required('Wajib diisi')
      .min(8, 'Kata sandi minimal 8 karakter')
      .oneOf([yup.ref('sandi'), null], 'Konfirmasi kata sandi tidak sama'),
  })
}

export const skemaLaporan = () => {
  return yup.object({
    kategori: yup
      .array()
      .of(yup.string())
      .min(1, 'Pilih kategori minimal satu')
      .required('Pilih kategori'),
    tujuan: yup.string().required('Tujuan pembuatan laporan wajib diisi'),
    awal: yup
      .date()
      .required('Periode awal wajib diisi')
      .typeError('Periode awal wajib diisi'),
    akhir: yup
      .date()
      .required('Periode akhir wajib diisi')
      .typeError('Periode akhir wajib diisi'),
  })
}
