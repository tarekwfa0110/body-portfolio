// Photos added from /admin live in Supabase Storage; allow next/image to load them.
const supabaseHost = process.env.SUPABASE_URL ? new URL(process.env.SUPABASE_URL).hostname : null

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    minimumCacheTTL: 31536000, // 1 year in seconds
    remotePatterns: supabaseHost
      ? [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/**' }]
      : [],
  },
  experimental: {
    // Vercel rejects request bodies over 4.5 MB; the admin shrinks photos before upload.
    serverActions: { bodySizeLimit: '4mb' },
  },
}

export default nextConfig
