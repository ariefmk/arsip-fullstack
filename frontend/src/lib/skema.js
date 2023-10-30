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

export const skemaPenggunaTambah = (datalist) => {
  const nik = datalist.map((data) => {
    return data.nik
  })
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
        jabatan
          .oneOf(
            ['Kepala Desa', 'Sekretaris', 'Kepala Bidang'],
            'Pilih salah satu'
          )
          .required('Pilih salah satu'),
    }),
    bidang: yup.string().when(['hak', 'jabatan'], {
      is: (hak, jabatan) => hak === 'Standar' && jabatan === 'Kepala Bidang',
      then: (bidang) =>
        bidang
          .oneOf(
            ['kesra', 'pemerintahan', 'kewilayahan', 'keuangan', 'umum'],
            'Pilih salah satu'
          )
          .required('Pilih salah satu'),
    }),
    tanggal: yup.date().required('Wajib diisi').typeError('Format salah'),
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
export const skemaKategoriTambah = () => {
  return yup.object({
    bidang: yup
      .string()
      .oneOf(
        ['kesra', 'pemerintahan', 'kewilayahan', 'keuangan', 'umum'],
        'Pilih salah satu'
      ),
    kategori: yup.string().required('Nama kategori wajib diisi'),
    kode: yup.string().required('Kode kategori wajib diisi'),
  })
}

export const skemaArsipTambah = () => {
  return yup.object({
    kode: yup.string(),
    kategori: yup.string(),
    jenis: yup.string().oneOf(['1', '2'], 'Pilih salah satu'),
    retensi: yup.date().typeError('Format salah'),
    penyimpanan: yup.string(),
    perihal: yup.string(),
    visibilitas: yup.string(),
    pengguna: yup.string(),
    berkas: yup.mixed().when('jenis', {
      is: '2',
      then: (berkas) =>
        berkas.test('cek-berkas', 'Wajib diisi', (nilai) => nilai.length === 1),
    }),
  })
}
