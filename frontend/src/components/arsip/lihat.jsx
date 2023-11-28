import { TutupModal } from '@/lib/button'

export default function Lihat({ referensi, berkas }) {
  const pengguna = berkas.pembuat
  const tahun1 = new Date(berkas.retensi)
  const tahun2 = new Date()
  const retensi = tahun1.getFullYear() - tahun2.getFullYear()
  return (
    <dialog className={`daisy-modal`} ref={referensi}>
      <div className={`daisy-modal-box max-w-[800px]`}>
        <div>
          <h1 className={`text-center text-2xl font-bold`}>Rincian Arsip</h1>
          <div className={`flex flex-row gap-x-3`}>
            <div className={`w-[400px] border-2 border-black`}>
              <object data='/berkas.pdf' width='100%' height='100%' />
            </div>
            <div className={`flex flex-col gap-y-3`}>
              <div className={`border-2 border-black`}>
                <table>
                  <tbody>
                    <tr>
                      <td>Kode Arsip</td>
                      <td>:</td>
                      <td>{berkas.kode}</td>
                    </tr>
                    <tr>
                      <td>Perihal</td>
                      <td>:</td>
                      <td>{berkas.perihal}</td>
                    </tr>
                    <tr>
                      <td>Kategori</td>
                      <td>:</td>
                      <td>{berkas.kategori}</td>
                    </tr>
                    <tr>
                      <td>Jenis Arsip</td>
                      <td>:</td>
                      <td>{berkas.jenis}</td>
                    </tr>
                    <tr>
                      <td>Status Arsip</td>
                      <td>:</td>
                      <td>Aktif</td>
                    </tr>
                    <tr>
                      <td>Retensi</td>
                      <td>:</td>
                      <td>{`${retensi} Tahun (${berkas.retensi})`}</td>
                    </tr>
                    <tr>
                      <td>Visibilitas</td>
                      <td>:</td>
                      <td>{berkas.visibilitas? 'Aktif':'Tidak Aktif'}</td>
                    </tr>
                    <tr>
                      <td>Pembuat</td>
                      <td>:</td>
                      <td>
                        {pengguna &&
                          `${pengguna.nama} ${
                            pengguna.bidang
                              ? `(Bidang: ${pengguna.bidang})`
                              : ''
                          }`}
                      </td>
                    </tr>
                    <tr>
                      <td>Persetujuan</td>
                      <td>:</td>
                      <td>{berkas.persetujuan ? 'Disetujui': 'Belum Disetujui'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className={`text-center`}>Riwayat</h2>
                <div
                  className={`h-[4rem] overflow-y-auto border-2 border-black`}
                >
                  <ul className={`list-inside list-[circle] px-[5px]`}>
                    <li>
                      Arsip ditambahkan (20/08/2023, 15.28.42) Oleh KAUR Umum &
                      Perencanaan
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      <button
        type='button'
        className='daisy-modal-backdrop'
        onClick={() => {
          referensi.current.close()
        }}
      />
    </dialog>
  )
}
