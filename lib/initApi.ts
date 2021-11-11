import {useEffect, useState} from "react";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {typesBundleForPolkadot} from '@crustio/type-definitions'

export function initApi(): ApiPromise | null {
  const [api, setApi] = useState<ApiPromise | null>(null)
  useEffect(() => {
    const init = () => {
      const provider = new WsProvider(['wss://rpc-crust-mainnet.decoo.io', 'wss://rpc-subscan.crust.network'])
      return ApiPromise.create({
        provider,
        typesBundle: typesBundleForPolkadot,
      })
        .then(setApi)
        .catch(console.error)
    };
    init().then()
  }, [])
  return api
}
