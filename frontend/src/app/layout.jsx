import './globals.css'
export const metadata = {
  title: 'E-Arsip Mampari',
  description: 'Aplikasi Arsip Kantor Desa Mampari'
}

export default function Layout(props) {
  return (
    <html lang={`id`}>
      <body>{props.children}</body>
    </html>
  )
}
