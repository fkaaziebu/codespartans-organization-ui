import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "3.68.98.186",
      },
      {
        protocol: "http",
        hostname: "ec2-35-156-40-144.eu-central-1.compute.amazonaws.com",
      },
    ],
  },
  output: "standalone",
  env: {
    GRAPHQL_BASE_URL: process.env.GRAPHQL_BASE_URL,
    GRAPHQL_WS_BASE_URL: process.env.GRAPHQL_WS_BASE_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: ["graphql-tag/loader"],
    });
    return config;
  },
};

export default nextConfig;
