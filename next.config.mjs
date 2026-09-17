/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  cacheComponents: true,
  reactCompiler: true,
};

export default nextConfig;
