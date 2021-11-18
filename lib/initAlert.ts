import {useCallback, useMemo, useState} from "react";

export interface AlertMsg {
  title?: string;
  type?: 'success' | 'info' | 'error' | 'warn',
  msg: string,
}

export interface WrapAlert {
  alert: (msg: AlertMsg) => void,
  alerts: AlertMsg[],
  error: (msg: string, title?: string) => void,
  info: (msg: string, title?: string) => void,
  warn: (msg: string, title?: string) => void,
  success: (msg: string, title?: string) => void,
}

const Tasks: any = {
  last: 0
}

export function initAlert(): WrapAlert {
  const [alerts, setAlerts] = useState<AlertMsg[]>([])
  const alert = useCallback((msg: AlertMsg) => {
    if (Tasks.last) {
      clearTimeout(Tasks.last)
      Tasks.last = 0
    }
    setAlerts(() => {
      // return _.concat(old, msg)
      return [msg]
    })
    Tasks.last = setTimeout(() => {
      Tasks.last = 0
      setAlerts(() => {
        // return _.drop(old)
        return []
      })
    }, 5000)
  }, [])

  const error = useCallback((msg: string, title?: string) => {
    alert({
      type: "error",
      msg,
      title
    })
  }, [alert])

  const info = useCallback((msg: string, title?: string) => {
    alert({
      type: "info",
      msg,
      title
    })
  }, [alert])

  const warn = useCallback((msg: string, title?: string) => {
    alert({
      type: "warn",
      msg,
      title
    })
  }, [alert])

  const success = useCallback((msg: string, title?: string) => {
    alert({
      type: "success",
      msg,
      title
    })
  }, [alert])

  return useMemo(() => ({alert, alerts, error, info, warn, success}), [alerts, alert, error, info, warn, success])
}
