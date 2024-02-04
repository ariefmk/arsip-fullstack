import { useState, useEffect, useMemo } from 'react'

export default function useUrut(datalist, searchTerm) {
  const [dataUrut, setDataUrut] = useState([...datalist])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  useEffect(() => {
    setDataUrut([...datalist])
  }, [datalist])

  useEffect(() => {
    const filteredData = datalist.filter((data) => {
      return Object.values(data).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })

    setDataUrut(filteredData)
  }, [searchTerm, datalist])

  const urut = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
    const sorted = [...dataUrut].sort((a, b) => {
      if (direction === 'asc') {
        return a[key] < b[key] ? -1 : 1
      } else {
        return a[key] > b[key] ? -1 : 1
      }
    })
    setDataUrut(sorted)
  }
  return { dataUrut, urut }
}
