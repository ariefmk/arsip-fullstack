exports.pengguna = {
  tambah: (hasil) => {
    return {
      nama_pengguna: hasil.namaPengguna,
      kata_sandi: '***',
      dibuat: hasil.dibuat
    }
  }
}
