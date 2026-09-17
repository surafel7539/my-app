/** @type {import('next').NextConfig} */
const nextConfig = {
  
  images:[
    {
      protocols: 'https',
      hostname: 'res.cloudinary.com'
    }
  ],
  cacheComponents: true,
  reactCompiler: true,
};

export default nextConfig;
