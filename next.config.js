/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/7/70/Big.Buck.Bunny.-.Opening.Screen.png'
      },
      {
        protocol: 'http',
        hostname: 'uhdtv.io',
        port: '',
        pathname: '/wp-content/uploads/2020/10/Sintel-3.jpg'
      },
      {
        protocol: 'https',
        hostname: 'mango.blender.org',
        port: '',
        pathname: '/wp-content/uploads/2013/05/01_thom_celia_bridge.jpg'
      },
      {
        protocol: 'https',
        hostname: 'download.blender.org',
        port: '',
        pathname: '/ED/cover.jpg'
      }
    ]
  }
}

module.exports = nextConfig
