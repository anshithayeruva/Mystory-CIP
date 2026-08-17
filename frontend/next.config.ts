import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      { source: "/student/grades", destination: "/student", permanent: false },
      { source: "/student/assignments", destination: "/student", permanent: false },
      { source: "/student/announcements", destination: "/student", permanent: false },
      { source: "/student/messages", destination: "/student", permanent: false },
      { source: "/student/profile", destination: "/student/settings", permanent: false },
      { source: "/student/attendance", destination: "/student/reports", permanent: false },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
