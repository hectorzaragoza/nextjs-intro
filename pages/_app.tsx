import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import next from 'next'

type NextpageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextpageWithLayout
} 
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return <Component {...pageProps} />
}

export default MyApp
