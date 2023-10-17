/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites(){
    return[
      {
        source:"/terms",
        destination:"/T&C"
      }
    ]
  },
  reactStrictMode: true,
  swcMinify:true,
  
}

module.exports = nextConfig
