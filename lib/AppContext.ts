import React, {useContext} from "react";
import {ApiPromise} from "@polkadot/api";
import {WrapAlert} from "./initAlert";

export interface AppType {
  api?: ApiPromise,
  alert: WrapAlert
}

export const AppContext = React.createContext<AppType>(null)
export const AppProvider = AppContext.Provider

export function useApp(): AppType {
  return useContext(AppContext)
}
