/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "secure.gravatar.com",
      "picsum.photos",
    ],
  },
};

export default nextConfig;
