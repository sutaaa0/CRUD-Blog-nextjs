/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "1drv.ms",
      },
    ],
  },
};

export default nextConfig;
