import { useState, useEffect } from 'react'

export default function Info({ pesan, info }) {
  const { toast, setToast } = info
  const [progress, setProgress] = useState(100)
  useEffect(() => {
  if (toast) {
    let nilai = 100
    const interval = setInterval(() => {
      nilai -= 1
      setProgress(nilai)
      if (nilai === 0) {
        setToast(false)
        clearInterval(interval)
      }
    }, 25)
  }
  }, [toast, setToast])

  return (
    <div className={`daisy-toast`}>
      <div className={`daisy-alert daisy-alert-info flex flex-col`}>
        <span>{pesan}</span>
        <progress
          className={`daisy-progress w-[200px]`}
          value={progress}
          max='100'
        ></progress>
      </div>
    </div>
  )
}
