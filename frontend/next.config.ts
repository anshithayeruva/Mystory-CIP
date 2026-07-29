import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Disable symlinks resolution to prevent EINVAL readlink errors on Windows / OneDrive folders
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
