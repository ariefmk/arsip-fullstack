/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
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
  async redirects() {
    return [
      {
        source: '/:path',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'hakAkses',
          }
        ],
        destination: '/'
      },
      {
        source: '/pengaturan/:path*',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'hakAkses',
          }
        ],
        destination: '/'
      },
      {
        source: '/arsip/:path*',
        permanent: false,
        missing: [
          {
            type: 'cookie',
            key: 'hakAkses',
          }
        ],
        destination: '/'
      },
    ]
  },
  */
}

module.exports = nextConfig
