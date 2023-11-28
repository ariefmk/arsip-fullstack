/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  distDir: 'build',
  // Konfigurasi
  /*
  async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'hakAkses'
          }
        ],
        destination: '/beranda'
      }
    ]
  },
  */
  async redirects() {
    return [
      {
        source: '/(beranda|manajemen.*|riwayat.*|laporan.*)',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'hakAkses',
          },
        ],
        destination: '/',
      },
      {
        source: '/',
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: 'hakAkses',
          },
        ],
        destination: '/beranda',
      },
    ]
  },
  env: {
    publicServer: 'http://localhost:3001',
    publicKey: 'kantordesamampari1212'
  }
}

module.exports = nextConfig
