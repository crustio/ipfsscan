import 'semantic-ui-css/semantic.min.css'
import '../styles/global.css'
import '@decooio/crust-fonts/style.css'
import {AppProps} from 'next/app'
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import React, {useEffect, useMemo, useState} from "react";
import {initApi} from "../lib/initApi";
import {AppProvider, AppType} from "../lib/AppContext";
import {initAlert} from "../lib/initAlert";
import AlertMessage from "../components/AlertMessage";

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

export default function App({Component, pageProps}: AppProps) {
  const init = initI18n()
  const api = initApi()
  const alert = initAlert()
  const appType = useMemo<AppType>(() => ({api, alert}), [api, alert])
  return <AppProvider value={appType}>
    <div>
      {init && <Component {...pageProps} />}
      {init && <AlertMessage/>}
    </div>
  </AppProvider>
}
