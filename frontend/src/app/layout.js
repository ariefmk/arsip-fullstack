import './globals.css'

export const metadata = {
  title: 'E-Arsip Mampari'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
