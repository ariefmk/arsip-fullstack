'use client'
import ChartJS from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import { useRef } from 'react'
import { TutupModal } from '@/lib/button'

export default function Arsip(props) {
  const ref = useRef()
  const { jumlah, grafik, referensi } = props
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
  const opsi = {
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
          title: (data) => {
            const judul = grafik.find(({ kode }) => kode === data[0].label)
            return `${judul.kode} - ${judul.kategori}`
          },
        },
      },
    },
  }
  return (
    <div>
      <div
        className={`rounded-md  bg-green-500 p-4 text-white`}
        onClick={() => {
          ref.current.showModal()
        }}
      >
        <p className={`text-xl font-semibold`}>Arsip</p>
        <p className={`text-lg`}>{jumlah}</p>
      </div>
      <dialog className={`daisy-modal`} ref={ref}>
        <div className={`daisy-modal-box  flex items-center justify-center`}>
          <div className={`h-[400px] w-[400px]`}>
            <Pie data={data} options={opsi} redraw={false} />
          </div>
          <TutupModal
            onClick={() => {
              ref.current.close()
            }}
          />
        </div>
      </dialog>
    </div>
  )
}
