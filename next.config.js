module.exports = {
  extends: [
    //...
    'plugin:@next/next/recommended',
  ],
  images: {
    domains: ['i.ytimg.com'],
  },
  env: {
    DOMAIN_API: process.env.DOMAIN_API,
    APP_ENV: process.env.APP_ENV,
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
}
