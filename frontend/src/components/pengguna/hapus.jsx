export default function Hapus({ referensi, data }) {
  return (
    <dialog className='daisy-modal' ref={referensi}>
      <div className='daisy-modal-box'>
        {/*Kode hapus disini*/}
        <div>
          <h1 className='text-center text-lg'>
            Apa anda ingin menghapus data berikut?
          </h1>
          <table>
            <tbody>
              <tr>
                <td>Hak Akses</td>
                <td>{data.hak}</td>
              </tr>
              <tr>
                <td>NIK</td>
                <td>{data.nik}</td>
              </tr>
              <tr>
                <td>Nama</td>
                <td>{data.nama}</td>
              </tr>
              <tr>
                <td>Jabatan</td>
                <td>{data.jabatan}</td>
              </tr>
              <tr>
                <td>Bidang</td>
                <td>{data.bidang}</td>
              </tr>
              <tr>
                <td>Tanggal Lahir</td>
                <td>{data.tanggal}</td>
              </tr>
              <tr>
                <td>Jenis Kelamin</td>
                <td>{data.kelamin}</td>
              </tr>
              <tr>
                <td>Nomor Telepon</td>
                <td>{data.telepon}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>{data.alamat}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <button
              className='h-2rem w-[80px] rounded-[5px] border-2'
              onClick={() => console.log(referensi.current)}
            >
              Hapus
            </button>
            <button
              className='h-2rem w-[80px] rounded-[5px] border-2'
              onClick={() => referensi.current.close()}
            >
              Tidak
            </button>
          </div>
        </div>
        <form method='dialog'>
          <button className='daisy-btn daisy-btn-circle daisy-btn-ghost daisy-btn-sm absolute right-2 top-2'>
            ✕
          </button>
        </form>
      </div>
      <form method='dialog' className='daisy-modal-backdrop'>
        <button />
      </form>
    </dialog>
  )
}
