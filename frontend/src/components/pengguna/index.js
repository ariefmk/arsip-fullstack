import Header from './header'
import Tabel from './tabel'

export default function Pengguna({ datalist }) {
  return (
    <>
      <Header />
      <Tabel datalist={datalist} />
    </>
  )
}
