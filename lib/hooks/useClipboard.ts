import {useCallback, useContext} from "react";
import {AppContext} from "../AppContext";
import copy from 'copy-to-clipboard';

export function useClipboard() {
  const {alert} = useContext(AppContext)
  const clip = useCallback((data: any) => {
    copy(data)
    alert.alert({msg: 'Copied', type: "success"})
  }, [alert])
  return clip
}
