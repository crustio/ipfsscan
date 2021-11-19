import {IpfsGateway} from "./types";

export const BaseUrl = "https://api-ipfs-scan.decoo.io"

const devList: IpfsGateway[] = [
  {
    id: 1,
    name: "LocalIpfs",
    city: "Local",
    // country: "",
    value: "http://localhost:5002",
    peerId: "12D3KooWJ3ndg5ZuyQXNnhwv3StAkPCJyEesMbDNVfKxZa6p8rFS",
  },
  {
    id: 2,
    name: "Local2-Ipfs",
    city: "Singapore",
    country: "China",
    value: "http://localhost:5002",
    peerId: "12D3KooWJ3ndg5ZuyQXNnhwv3StAkPCJyEesMbDNVfKxZa6p8rFR"
  },
  {
    id: 3,
    name: "Thunder Gateway",
    city: "Berlin",
    country: "Germany",
    value: "http://localhost:5002",
    peerId: "12D3KooWJ3ndg5ZuyQXNnhwv3StAkPCJyEesMbDNVfKxZa6p8rFD"
  },
]

const prodList: IpfsGateway[] = [
  {
    id: 1,
    name: "Crust Network",
    city: "Seattle",
    country: "America",
    value: "https://crustwebsites.net",
    peerId: "12D3KooWSKBFUN9L89PK9NyctxB8aKoCcKF9m8iSXM8M7qj6aqXd",
  },
  {
    id: 2,
    name: "Crust Network",
    city: "Shanghai",
    country: "China",
    value: "https://ipfs-gw.decloud.foundation",
    peerId: "12D3KooWDbPeYWubpE2tyDs3Gp7UgNGmHRgMvyALRNCeL3s77fgv",
  },
  {
    id: 3,
    name: "⚡ Thunder Gateway",
    city: "Berlin",
    country: "Germany",
    value: "https://gw.crustapps.net",
    peerId: "12D3KooWMcAHcs97R49PLZjGUKDbP1fr9iijeepod8fkktHTLCgN",
  },
  {
    id: 4,
    name: "DCF",
    city: "Singapore",
    // country: "",
    value: "https://crustipfs.xyz",
    peerId: "12D3KooWCHsXmvBkXRoGdXgppsxf7wiuq4vAwLho1Q6rrU9LpapN",
  },
]

export const isDev = process.env.NODE_ENV === 'development'
export const GatewayList: IpfsGateway[] = isDev ? devList : prodList
