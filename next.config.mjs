/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mmccfysafxyicjygouxt.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/property-images/**",
      },
    ],
  },
};

export default nextConfig;
