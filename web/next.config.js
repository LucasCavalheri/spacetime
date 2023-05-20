/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      String(process.env.NEXT_PUBLIC_API_URL),
    ],
  },
}

module.exports = nextConfig
