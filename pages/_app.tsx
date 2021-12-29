import '@decooio/crust-fonts/style.css';
import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import I18NextHttpBackend from "i18next-http-backend";
import { AppProps } from 'next/app';
import Head from "next/head";
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from "react";
import { initReactI18next } from "react-i18next";
import 'semantic-ui-css/semantic.min.css';
import AlertMessage from "../components/AlertMessage";
import MDocs from '../components/root/MDocs';
import { AppProvider, AppType } from "../lib/AppContext";
import { initAlert } from "../lib/initAlert";
import { initApi } from "../lib/initApi";
import '../styles/global.css';

function initI18n() {
  const [init, setInit] = useState(false)
  useEffect(() => {
    i18next.use(new I18NextHttpBackend())
      .use(I18nextBrowserLanguageDetector)
      .use(initReactI18next)
      .init({
        backend: {
          loadPath: '/locales/{{lng}}.json'
        },
        fallbackLng: 'zh-CN',
        interpolation: {
          escapeValue: false
        }
      }, () => {
        setInit(true)
      })
  }, [])
  return init;
}

function MApp({ Component, pageProps }: AppProps) {
  // const init = initI18n()
  const api = initApi()
  const alert = initAlert()
  const appType = useMemo<AppType>(() => ({ api, alert }), [api, alert])
  return <AppProvider value={appType}>
    <Head>
      <link rel='shortcut icon' href='/favicon.png'></link>
    </Head>
    <div>
      <Component {...pageProps} />
      <AlertMessage />
    </div>
  </AppProvider>
}

export default function App({ Component, ...props }: AppProps) {
  const r = useRouter()
  if (r.pathname.startsWith('/docs')) {
    return <MDocs Component={Component} {...props} />
  }
  return <MApp Component={Component} {...props} />
}
