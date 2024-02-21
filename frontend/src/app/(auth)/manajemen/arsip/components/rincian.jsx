import { forwardRef, useState, useEffect } from 'react'
import { TutupModal } from '@/lib/button'

function Tr(props) {
  const { judul, isi, key } = props

  return (
    <tr key={key} className={`border-b-2 border-gray-200`}>
      <td className={`px-4 py-2 font-bold`}>{judul}</td>
      <td className={`px-4 py-2`}>:</td>
      <td className={`px-4 py-2`}>{isi}</td>
    </tr>
  )
}

const Rincian = forwardRef(function Rincian(props, ref) {
  const { datalist } = props

  return (
    <dialog className={`daisy-modal backdrop-blur-[2px]`} ref={ref}>
      <div className={`daisy-modal-box`}>
        <div className={`grid grid-cols-2 gap-2`}>
          <h1 className={`col-span-2 text-center text-2xl font-bold`}>
            Rincian Arsip
          </h1>
          <div className={`col-span-2`}>
            <table className={`mx-auto`}>
              <tbody>
                <Tr judul='Kode Arsip' isi={datalist.kode} />
                <Tr judul='Perihal Arsip' isi={datalist.perihal} />
                <Tr
                  judul='Kategori Arsip'
                  isi={`${datalist.kategori?.nama} (${datalist.kategori?.kode})`}
                />
                <Tr judul='Jenis Arsip' isi={datalist.jenis} />
                {datalist.penyimpanan?.kode && (
                  <Tr judul='Penyimpanan Fisik'
                    isi={`${datalist.penyimpanan.kode} - ${datalist.penyimpanan.nama}`}
                  />
                )}
                <Tr
                  judul='Retensi Arsip'
                  isi={`${datalist.retensi?.sisa} (${datalist.retensi?.berakhir})`}
                />
                <Tr
                  judul='Dibuat Oleh'
                  isi={`${datalist.pengguna?.nama} (Bidang ${datalist.pengguna?.bidang})`}
                />
                <Tr
                  judul='Status Persetujuan'
                  isi={
                    datalist.persetujuan
                      ? `${datalist.persetujuan.length} Persetujuan`
                      : 'Belum Disetujui'
                  }
                />
                {datalist.persetujuan?.map((data, index) => (
                  <Tr
                    key={index}
                    judul={`Persetujuan ${index + 1}`}
                    isi={`${data.jabatan} (${new Date(
                      data.waktu
                    ).toLocaleString('id-ID', {
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                    })})`}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className={`col-span-2`}>
            <h2 className={`text-1xl text-center font-bold`}>
              Keterangan Arsip
            </h2>
            <div
              className={`h-[4rem] w-full overflow-y-auto border-2 border-black`}
            >
              <p className={`mx-2`}>{datalist.keterangan}</p>
            </div>
          </div>
        </div>
        <TutupModal
          onClick={() => {
            ref.current.close()
          }}
        />
      </div>
    </dialog>
  )
})

export default Rincian
