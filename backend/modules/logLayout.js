exports.pengguna = {
  tambah: (hasil) => {
    return {
      id: hasil.id,
      nik: hasil.nik,
      kataSandi: '***',
      dibuat: hasil.dibuat,
      diubah: hasil.diubah
    }
  }
}
