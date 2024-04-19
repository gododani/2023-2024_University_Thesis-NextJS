/** @type {import('next').NextConfig} */

const withNextIntl = require("next-intl/plugin")();

const getCorsHeaders = () => {
  const headers = {};
  
  headers["Access-Control-Allow-Origin"] = "https://bekautomotor.hu/";
  headers["Access-Control-Allow-Credentials"] = "true";
  headers["Access-Control-Allow-Methods"] =
    "GET,OPTIONS,PATCH,DELETE,POST,PUT";
  headers["Access-Control-Allow-Headers"] =
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization";

  return Object.entries(headers).map(([key, value]) => ({ key, value }));
};

const nextConfig = {
  headers: async () => {
    return [
      {
        source: "/api/(.*)",
        headers: getCorsHeaders(),
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
    ],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
};

module.exports = withNextIntl(nextConfig);
