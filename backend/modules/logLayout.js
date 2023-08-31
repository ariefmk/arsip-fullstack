exports.pengguna = {
  tambah: (hasil) => {
    return {
      id: hasil.id,
      namaPengguna: hasil.namaPengguna,
      kataSandi: '***',
      dibuat: hasil.dibuat,
      diubah: hasil.diubah
    }
  }
}
