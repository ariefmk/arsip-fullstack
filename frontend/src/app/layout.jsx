import './globals.css'
export const metadata = {
  title: 'E-Arsip Mampari'
}

export default function Layout(props) {
  return (
    <html lang='id'>
      <body className=''>
        {props.children}
      </body>
    </html>
  )
}
