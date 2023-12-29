'use client'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

export default function D3Test({ data, width, height, className }) {
  const ref = useRef()
  useEffect(() => {
    const elemen = d3.select(ref.current)
    elemen.attr('width', width).attr('height', height).attr('class', className)
  }, [height, width, className])

  return <svg ref={ref}></svg>
}
