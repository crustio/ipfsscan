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
  // {
  //   id: 4,
  //   name: "Deklod",
  //   city: "Beijing",
  //   country: "China",
  //   value: "http://localhost:5002"
  // },
  {
    id: 5,
    name: "Crust Network",
    city: "Shanghai",
    country: "China",
    value: "https://ipfs-gw.decloud.foundation"
  },
]

const prodList: IpfsGateway[] = [
  {
    id: 1,
    name: "⚡ Thunder Gateway",
    city: "Seattle",
    country: "US",
    value: "https://crustipfs.mobi"
  },
  // {
  //   id: 2,
  //   name: "⚡ Deklod",
  //   city: "Beijing",
  //   country: "China",
  //   value: "https://ipfs-gw.dkskcloud.com"
  // },
  {
    id: 3,
    name: "Crust Network",
    city: "Shanghai",
    country: "China",
    value: "https://crustipfs.online"
  },
  {
    id: 4,
    name: "⚡ Thunder Gateway",
    city: "Berlin",
    country: "Germany",
    value: "https://crustipfs.info"
  },
  {
    id: 5,
    name: "DCF",
    city: "Singapore",
    // country: "",
    value: "https://crustipfs.tech"
  }
]

export const isDev = process.env.NODE_ENV === 'development'
export const GatewayList: IpfsGateway[] = isDev ? devList : prodList
