const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.albank.ru",
      },
      {
        protocol: "http",
        hostname: "*.albank.ru",
      },
    ],
  },
};

module.exports = nextConfig;
