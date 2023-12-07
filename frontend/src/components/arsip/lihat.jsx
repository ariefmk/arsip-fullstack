import { TutupModal } from '@/lib/button'

export default function Lihat({ referensi, berkas }) {

  const pengguna = berkas.pembuat
  const tahun1 = new Date(berkas.retensi)
  const tahun2 = new Date()
  const retensi = tahun1.getFullYear() - tahun2.getFullYear()
  //console.log(berkas.penyimpanan)
  return (
    <dialog className={`daisy-modal`} ref={referensi}>
      <div className={`daisy-modal-box ${berkas.jenis==='Digital' &&'max-w-[900px]'}`}>
        <div>
          <h1 className={`text-center text-2xl font-bold`}>Rincian Arsip</h1>
          <div className={`flex flex-row justify-center gap-x-3`}>
            {berkas.jenis === 'Digital' && (
              <div className={`w-[800px] border-2 border-black`}>
                <object
                  data={URL.createObjectURL(
                    new Blob(
                      [new Uint8Array(berkas.lampiran.data).buffer],
                      {
                        type: 'application/pdf',
                      }
                    )
                  )}
                  width='100%'
                  height='100%'
                />
              </div>
            )}
            <div className={`flex flex-col gap-y-3`}>
              <div className={`border-2 border-black`}>
                <table className={`mx-2`}>
                  <tbody>
                    <tr className={`border-b-2 border-gray-200`}>
                      <td>Kode Arsip</td>
                      <td>:</td>
                      <td>{}{berkas.kode}</td>
                    </tr>
                    <tr className={`border-b-2 border-gray-200`}>
                      <td>Perihal</td>
                      <td>:</td>
                      <td>{berkas.perihal}</td>
                    </tr>
                    <tr className={`border-b-2 border-gray-200`}>
                      <td>Kategori</td>
                      <td>:</td>
                      <td>{berkas.kategori}</td>
                    </tr>
                    <tr className={`border-b-2 border-gray-200`}>
                      <td>Jenis Arsip</td>
                      <td>:</td>
                      <td>{berkas.jenis}</td>
                    </tr>
                    {berkas.jenis === 'Fisik' && (
                      <tr className={`border-b-2 border-gray-200`}>
                        <td>Kode Penyimpanan</td>
                        <td>:</td>
                        <td>
                          {berkas.penyimpanan !== null
                            ? berkas.penyimpanan
                            : 'Tidak ada'}
                        </td>
                      </tr>
                    )}
                    <tr className={`border-b-2 border-gray-200`}>
                      <td>Status Arsip</td>
                      <td>:</td>
                      <td>
                        {new Date() >= new Date(berkas.retensi)
                          ? 'Tidak Aktif'
                          : 'Aktif'}
                      </td>
                    </tr>
                    <tr className={`border-b-2 border-gray-200`}>
                      <td>Retensi</td>
                      <td>:</td>
                      <td>{`${retensi} Tahun (${new Date(
                        berkas.retensi
                      ).toLocaleString('id-ID', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })})`}</td>
                    </tr>
                    {berkas.jenis === 'Digital' && (
                      <>
                        <tr className={`border-b-2 border-gray-200`}>
                          <td>Visibilitas</td>
                          <td>:</td>
                          <td>
                            {berkas.visibilitas ? 'Aktif' : 'Tidak Aktif'}
                          </td>
                        </tr>
                        <tr className={`border-b-2 border-gray-200`}>
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
                          <td>
                            {berkas.persetujuan
                              ? 'Disetujui'
                              : 'Belum Disetujui'}
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div>
                <h2 className={`text-center`}>Keterangan</h2>
                <div
                  className={`h-[4rem] w-full overflow-y-auto border-2 border-black`}
                >
                  <p className={`mx-2`}>{berkas.keterangan}</p>
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
