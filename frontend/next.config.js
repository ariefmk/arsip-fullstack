/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
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
}

module.exports = nextConfig
