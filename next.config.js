/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    MYSQL_HOST: 'localhost',
    MYSQL_PORT: '3306',
    MYSQL_DATABASE: 'udemy_eko',
    MYSQL_USER: 'root',
    MYSQL_PASSWORD: '12345678',
  },
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  // Uncoment to add domain whitelist
  // images: {
  //   domains: [
  //     'res.cloudinary.com',
  //   ],
  // },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};
