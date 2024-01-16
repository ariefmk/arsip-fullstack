'use client'
import { useRef } from 'react'
import Header from './header'
import Sidebar from './sidebar'
import Keluar from './keluar'

export default function Menu (props) {
  const {profil, pengguna} = props
  const keluarRef = useRef()
  return (
    <div>
      <Header profil={profil} keluar={keluarRef}/>
      <Sidebar pengguna={pengguna} keluar={keluarRef}/>
      <Keluar referensi={keluarRef}/>
    </div>
  )
}
