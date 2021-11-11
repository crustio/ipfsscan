import 'semantic-ui-css/semantic.min.css'
import '../styles/global.css'
import '@decooio/crust-fonts/style.css'
import {AppProps} from 'next/app'
import i18next from "i18next";
import I18NextHttpBackend from "i18next-http-backend";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import React, {useEffect, useMemo, useState} from "react";
import {Container, Dimmer, Loader} from "semantic-ui-react";
import {initApi} from "../lib/initApi";
import {AppType, AppProvider} from "../lib/AppContext";

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
  const appType = useMemo<AppType>(() => ({api}), [api])
  if (!init) return <Container className="hFull">
    <Dimmer active inverted>
      <Loader size='large' inverted content="Loading"/>
    </Dimmer>
  </Container>
  return <AppProvider value={appType}>
    <Component {...pageProps} />
  </AppProvider>
}
