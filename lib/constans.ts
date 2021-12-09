import {IpfsGateway} from "./types";

export const BaseUrl = "https://api-ipfs-scan.decoo.io"

const devList: IpfsGateway[] = [
  {
    id: 1,
    name: "LocalIpfs",
    city: "Seattle",
    // country: "",
    value: "http://localhost:5002"
  },
  {
    id: 2,
    name: "Local2-Ipfs",
    city: "Singapore",
    // country: "",
    value: "http://localhost:5002"
  },
  {
    id: 3,
    name: "Thunder Gateway",
    city: "Berlin",
    country: "Germany",
    value: "http://localhost:5002"
  },
]

const prodList: IpfsGateway[] = [
  {
    id: 1,
    name: "⚡ Thunder Gateway",
    city: "Seattle",
    country: "US",
    value: "https://crustwebsites.net"
  },
  {
    id: 2,
    name: "Crust Network",
    city: "Shanghai",
    country: "China",
    value: "https://ipfs-gw.decloud.foundation"
  },
  {
    id: 3,
    name: "⚡ Thunder Gateway",
    city: "Berlin",
    country: "Germany",
    value: "https://gw.crustapps.net"
  },
  {
    id: 4,
    name: "DCF",
    city: "Singapore",
    // country: "",
    value: "https://crustipfs.xyz"
  },
]

export const isDev = process.env.NODE_ENV === 'development'
export const GatewayList: IpfsGateway[] = isDev ? devList : prodList
