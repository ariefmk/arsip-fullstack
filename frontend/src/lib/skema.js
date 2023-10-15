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

export const skemaPenggunaTambah = yup.object({
  hak: yup.string().oneOf(['admin', 'pengguna'], 'Pilih salah satu'),
  nik: yup.string().when('hak', {
    is: (hak) => hak === 'pengguna' || hak === 'admin',
    then: (hak) =>
      hak
        .required('NIK wajib diisi')
        .matches(/^\d+$/, 'NIK hanya mengandung angka')
        .min(16, 'Panjang NIK harus 16 karakter'),
  }),
  kataSandi: yup.string().when('hak', {
    is: (hak) => hak === 'pengguna' || hak === 'admin',
    then: (kataSandi) =>
      kataSandi
        .required('Kata Sandi wajib diisi')
        .min(8, 'Kata sandi minimal 8 karakter'),
  }),
  nama: yup.string().when('hak', {
    is: 'pengguna',
    then: (nama) => nama.required('Nama lengkap wajib diisi'),
  }),
  jabatan: yup.string().when('hak', {
    is: 'pengguna',
    then: (jabatan) =>
      jabatan.oneOf(
        ['kepala desa', 'sekretaris', 'kepala bidang'],
        'Pilih salah satu'
      ),
  }),
  bidang: yup.string().when(['hak', 'jabatan'], {
    is: (hak, jabatan) => hak === 'pengguna' && jabatan === 'kepala bidang',
    then: (bidang) =>
      bidang.oneOf(
        ['kesra', 'pemerintahan', 'kewilayahan', 'keuangan', 'umum'],
        'Pilih salah satu'
      ),
  }),
  nomor: yup.string().when('hak', {
    is: 'pengguna',
    then: (nomor) =>
      nomor
        .required('Nomor telepon wajib diisi')
        .matches(/^\d+$/, 'Nomor telepon hanya mengandung angka'),
  }),
  alamat: yup.string().when('hak', {
    is: 'pengguna',
    then: (alamat) => alamat.required('Alamat wajib diisi'),
  }),
})

export const skemaPenggunaUbah = yup.object({
  kataSandi: yup
    .string()
    .required('Kata Sandi wajib diisi')
    .min(8, 'Kata sandi minimal 8 karakter'),
  nama: yup.string().required('Nama lengkap wajib diisi'),
  jabatan: yup
    .string()
    .oneOf(['kepala desa', 'sekretaris', 'kepala bidang'], 'Pilih salah satu'),
  bidang: yup.string().when('jabatan', {
    is: (jabatan) => jabatan === 'kepala bidang',
    then: (bidang) =>
      bidang.oneOf(
        ['kesra', 'pemerintahan', 'kewilayahan', 'keuangan', 'umum'],
        'Pilih salah satu'
      ),
  }),
  nomor: yup
    .string()
    .required('Nomor telepon wajib diisi')
    .matches(/^\d+$/, 'Nomor telepon hanya mengandung angka'),
  alamat: yup.string().required('Alamat wajib diisi'),
})
