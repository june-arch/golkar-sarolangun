/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  extends: [
    //...
    'plugin:@next/next/recommended',
  ],
  images: {
    domains: ['i.ytimg.com','mdbcdn.b-cdn.net'],
  },
  env: {
    DOMAIN_API: process.env.DOMAIN_API,
    APP_ENV: process.env.APP_ENV,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
}
module.exports = nextConfig
