/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 31536000, // 1 year in seconds
  },
}

export default nextConfig
