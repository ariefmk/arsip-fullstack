import Header from './components/header'
import Sidebar from './components/sidebar'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  )
}
