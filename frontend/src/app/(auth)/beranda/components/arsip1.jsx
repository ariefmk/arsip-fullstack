'use client'
import ChartJS from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'
import { useRef } from 'react'
import { TutupModal } from '@/lib/button'

export default function Arsip1(props) {
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
        labels: {
          color: '#fff',
        },
      },

      title: {
        display: true,
        text: 'Kategori Arsip',
        position: 'bottom',
        font: {
          size: 18,
          weight: 300,
        },
        color: '#fff',
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
    <div
      className={`rounded-md flex items-center justify-center bg-gray-100 bg-green-500`}
    >
      <div className={`h-[400px] w-[400px]`}>
        <Pie data={data} options={opsi} redraw={false} />
      </div>
    </div>
  )
}
