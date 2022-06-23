
import { getLayout } from '@vercel/examples-ui'
import type { LayoutProps } from '@vercel/examples-ui/layout'
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import type { AppProps } from 'next/app'

import '@vercel/examples-ui/globals.css'
import '@/styles/globals.css';
TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = getLayout<LayoutProps>(Component)

  return (
    <Layout
      title="JWT Authentication"
      path="edge-functions/jwt-authentication"
      deployButton={{ env: ['JWT_SECRET_KEY'] }}
    >
      <Component {...pageProps} />
    </Layout>
  )
}