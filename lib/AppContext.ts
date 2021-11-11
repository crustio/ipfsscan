import React, {useContext} from "react";
import {ApiPromise} from "@polkadot/api";

export interface AppType {
  api?: ApiPromise,
}

export const AppContext = React.createContext<AppType>(null)
export const AppProvider = AppContext.Provider

export function useApp(): AppType {
  return useContext(AppContext)
}
