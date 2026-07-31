import type { NextConfig } from "next";
import fs from "fs";
import fsp from "fs/promises";

const handleEinval = (err: any, fallbackPath: any) => {
  if (err && (err.code === 'EINVAL' || err.code === 'UNKNOWN')) {
    return String(fallbackPath);
  }
  throw err;
};

// Patch fs.readlink & fs.readlinkSync
const origReadlink = fs.readlink;
// @ts-ignore
fs.readlink = function (path: any, ...args: any[]) {
  const cb = typeof args[args.length - 1] === 'function' ? args.pop() : null;
  if (cb) {
    // @ts-ignore
    return origReadlink.call(fs, path, ...args, (err: any, linkString: any) => {
      if (err && (err.code === 'EINVAL' || err.code === 'UNKNOWN')) {
        return cb(null, String(path));
      }
      return cb(err, linkString);
    });
  }
  // @ts-ignore
  return origReadlink.apply(fs, [path, ...args]);
};

const origReadlinkSync = fs.readlinkSync;
// @ts-ignore
fs.readlinkSync = function (path: any, options: any) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err: any) {
    return handleEinval(err, path);
  }
};

// Patch fs.promises.readlink & fsp.readlink
if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  // @ts-ignore
  fs.promises.readlink = async function (path: any, options: any) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err: any) {
      return handleEinval(err, path);
    }
  };
}

if (fsp && fsp.readlink) {
  const origFspReadlink = fsp.readlink;
  // @ts-ignore
  fsp.readlink = async function (path: any, options: any) {
    try {
      return await origFspReadlink.call(fsp, path, options);
    } catch (err: any) {
      return handleEinval(err, path);
    }
  };
}

// Patch fs.realpathSync & fs.promises.realpath
const origRealpathSync = fs.realpathSync;
// @ts-ignore
fs.realpathSync = function (path: any, options: any) {
  try {
    return origRealpathSync.call(fs, path, options);
  } catch (err: any) {
    return handleEinval(err, path);
  }
};

if (fs.promises && fs.promises.realpath) {
  const origPromisesRealpath = fs.promises.realpath;
  // @ts-ignore
  fs.promises.realpath = async function (path: any, options: any) {
    try {
      return await origPromisesRealpath.call(fs.promises, path, options);
    } catch (err: any) {
      return handleEinval(err, path);
    }
  };
}

if (fsp && fsp.realpath) {
  const origFspRealpath = fsp.realpath;
  // @ts-ignore
  fsp.realpath = async function (path: any, options: any) {
    try {
      return await origFspRealpath.call(fsp, path, options);
    } catch (err: any) {
      return handleEinval(err, path);
    }
  };
}

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
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
    // Disable symlinks resolution to prevent EINVAL readlink errors on Windows / OneDrive folders
    config.resolve.symlinks = false;
    return config;
  },
};

export default nextConfig;
