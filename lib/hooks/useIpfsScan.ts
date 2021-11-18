import {useEffect, useState} from "react";
import {GatewayList, isDev} from "../constans";
import axios, {CancelTokenSource} from "axios";

export interface IpfsScan {
  gatewayId: number,
  peers: any[]
  isLoadPeers: boolean,

  isLoadDag: boolean,
  dag: any
}

interface Peer {
  id: string
}

interface UpdateIpfsScan {
  gatewayId: number,
  peers?: Peer[]
  isLoadPeers?: boolean,

  isLoadDag?: boolean,
  dag?: any
}

function parseJson(data: string): any {
  try {
    return JSON.parse(data)
  } catch (_) {
    return null
  }
}

function parseData(data: any): any[] {
  if (typeof data === 'string') {
    return data.split('\n')
      .map(parseJson).filter(item => !!item)
  } else {
    return [data]
  }
}

export function useIpfsScan(cid: string): IpfsScan[] {
  const [scans, setScans] = useState<IpfsScan[]>([])
  const updateScan = (scan: UpdateIpfsScan) => {
    setScans((oldScans) => oldScans.map<IpfsScan>(item => {
      if (item.gatewayId === scan.gatewayId)
        return {...item, ...scan}
      return item
    }))
  }
  // init data
  useEffect(() => {
    if (cid) {
      setScans(GatewayList.map<IpfsScan>((g) => ({
        gatewayId: g.id,
        peers: [],
        isLoadPeers: true,
        dag: null,
        isLoadDag: true
      })))
    }
  }, [cid])

  useEffect(() => {
    const tasks: CancelTokenSource[] = []
    if (cid) {
      for (const ipfsGateway of GatewayList) {
        // dht/findprovs
        const findTask = axios.CancelToken.source()
        tasks.push(findTask)
        const params = isDev ? '&num-providers=5' : ''
        axios.post<string>(`${ipfsGateway.value}/api/v0/dht/findprovs?arg=${cid}&verbose=false&${params}`, {}, {
          cancelToken: findTask.token,
        })
          .then(res => {
            const peers = parseData(res.data).filter(item => item?.Type === 4)
              .map<Peer>(item => ({id: item.Responses[0].ID}))
            updateScan({gatewayId: ipfsGateway.id, isLoadPeers: false, peers})
          })
          .catch((e) => {
            console.error(e)
            updateScan({gatewayId: ipfsGateway.id, isLoadPeers: false, peers: []})
          })

        // dag/get
        const dagTask = axios.CancelToken.source()
        tasks.push(dagTask)
        axios.post<any>(`${ipfsGateway.value}/api/v0/dag/get?arg=${cid}`, {}, {
          cancelToken: dagTask.token
        })
          .then(res => {
            updateScan({gatewayId: ipfsGateway.id, isLoadDag: false, dag: res.data})
          })
          .catch(() => {
            updateScan({gatewayId: ipfsGateway.id, isLoadDag: false, dag: null})
          })
      }
    }
    return () => {
      for (const task of tasks) {
        try {
          task.cancel()
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [cid])

  return scans
}
