/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org', // já usado nos posters do TMDB
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // fallback que você usou
      },
    ],
  },
};

module.exports = nextConfig;
