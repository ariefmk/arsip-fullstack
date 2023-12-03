'use client'
import ChartJS from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import { TutupModal } from '@/lib/button'

export default function KategoriArsip({ grafik, referensi }) {
  const kategori = [
    {
      kode: 'BBK',
      kategori: 'Berkas Bulanan Keuangan',
      berkas: 10,
    },
    {
      kode: 'BSM',
      kategori: 'Berkas Surat Masuk',
      berkas: 10,
    },
  ]
  const data = {
    labels: grafik.map((row) => row.kode),
    datasets: [
      {
        label: 'Berkas',
        data: grafik.map((row) => row.berkas),
        borderWidth: 0,
      },
    ],
  }
  const options = {
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Arsip',
        position: 'bottom',
        font: {
          size: 18,
          weight: 300,
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          title: (a) => {
            const dataKategori = grafik.find(({ kode }) => kode === a[0].label)
            return `${dataKategori.kode} - ${dataKategori.kategori}`
          },
        },
      },
    },
  }
  return (
    <dialog className={`daisy-modal`} ref={referensi}>
      <div className={`daisy-modal-box flex items-center justify-center`}>
        <div className={`h-[400px] w-[400px]`}>
          <Pie data={data} options={options} redraw={false} />
        </div>
        <TutupModal
          onClick={() => {
            referensi.current.close()
          }}
        />
      </div>
      <button
        onClick={() => {
          referensi.current.close()
        }}
        className='daisy-modal-backdrop'
      />
    </dialog>
  )
}
