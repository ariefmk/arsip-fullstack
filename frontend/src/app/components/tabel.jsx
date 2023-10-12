'use client'
import { IconEdit, IconCircleMinus } from '@tabler/icons-react'
import { useEffect, useState, useRef } from 'react'

export default function Daftar({
  className,
  thead,
  tbody,
  action
}) {
  const ref = useRef()
  useEffect(() => {
    const getTbody = ref.current.children[1]
    const getChildren = getTbody.children
  },[])

  return (
    <table className={className.table} ref={ref}>
      <thead className={Array.isArray(className.thead)? className.thead[0] : className.thead}>
        <tr className={Array.isArray(className.thead) && className.thead.length >= 2 ? className.thead[1] : ''}>
          {thead.before && thead.before.map((data) => data)}
          {thead.data && thead.data.map((data) => (
            <th key={data} className={`${Array.isArray(className.thead) && className.thead.length >= 3? ` ${className.thead[2]}` : ''}${Array.isArray(data) && data.length >= 2? data[1] : ''}`}>{Array.isArray(data)? data[0] : data}</th>
          ))}
          {thead.after && thead.after.map((data) => data)}
        </tr>
      </thead>
      <tbody className={Array.isArray(className.tbody)? className.tbody[0] : className.tbody}>
        {tbody.data && tbody.data.map((dataMap1) => (
          <tr key={dataMap1} className={Array.isArray(className.tbody) && className.tbody.length >= 2? className.tbody[1]: ''}>
            {tbody.before && tbody.before.map((data) => data)}
            {dataMap1.map((dataMap2) => (
              <td key={dataMap2} className={`${Array.isArray(className.tbody) && className.tbody.length >= 3? ` ${className.tbody[2]}` : ''}${Array.isArray(dataMap2)? dataMap2[1]: ''}`}>{Array.isArray(dataMap2)? dataMap2[0] : dataMap2}</td>
            ))}
            {tbody.after && tbody.after.map((data) => data)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
