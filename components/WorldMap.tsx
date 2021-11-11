import React, {useEffect, useMemo, useState} from "react";
import {BaseProps, GatewayInfo, GatewayItem, Peer} from "./types";
import styled from "styled-components";
import MapSvg from "./MapSvg";
import {isCID} from "../lib/utils";
import axios, {CancelTokenSource} from "axios";
import {BaseUrl} from "../lib/constans";
import _ from 'lodash';
import {LoadingPeers} from "./LoadingPeers";
import {Gateway} from "./Gateway"
import {TitleTwo, TitleTwo2, TitleTwo3} from "./texts";

export interface Props extends BaseProps {
  CID: string
}

const ID_Style = {
  1: {
    top: '40%',
    left: '14%'
  },
  2: {
    top: '31%',
    left: '46%'
  },
  3: {
    top: '39%',
    left: '84%'
  },
  4: {
    top: '74%',
    left: '88%'
  },
}


function WorldMap_(p: Props) {
  const {className, CID} = p
  const [loading, setLoading] = useState(true)
  const [gatewayList, setGatewayList] = useState<GatewayItem[]>([])
  const [data, setData] = useState<GatewayInfo[]>([])
  const [currentGatewayId, setCurrentGatewayID] = useState<number | null>(null)
  const currentGateway = useMemo<GatewayInfo | null>(() => {
    if (currentGatewayId) {
      return data.find(item => item.id === currentGatewayId)
    }
    return null
  }, [currentGatewayId, data])
  const totalReplicas = useMemo(() => {
    return _.chain(data)
      .reduce((a, b) => a.concat(b.peers), [])
      .map(item => item.id)
      .uniq()
      .value()
      .length
  }, [data])
  // load GatewayAll
  useEffect(() => {
    axios.get<GatewayItem[]>(`${BaseUrl}/gateway/all`)
      .then((data) => {
        setGatewayList(data.data)
      })
      .catch(console.error)
  }, [])
  // set First Select Gateway and Load GatewayInfos
  useEffect(() => {
    const cancelList: CancelTokenSource[] = []
    const isCid = isCID(CID)
    if (isCid && gatewayList.length) {
      setLoading(true)
      setCurrentGatewayID(null)
      const list: GatewayInfo[] = gatewayList.map(item => {
        return {...item, peers: [], loading: true}
      });
      setData(list)
      for (const gatewayItem of gatewayList) {
        const gatewayId = gatewayItem.id
        const cancelTokenSource = axios.CancelToken.source()
        cancelList.push(cancelTokenSource)
        axios.post<Peer[]>(`${BaseUrl}/ipfs/dht/findprovs`, {
          gatewayId,
          cid: CID
        }, {cancelToken: cancelTokenSource.token}).then(data => {
          setData((old) => {
            return _.map(old, item => {
              if (item.id === gatewayId) {
                return {...item, peers: data.data, loading: false}
              }
              return item
            })
          })
          setCurrentGatewayID((oldId) => {
            if (oldId) return oldId
            return gatewayId
          })
        })
          .then(() => setLoading(false))
          .catch(console.error)
      }
    }
    return () => {
      try {
        for (const cancelTokenSource of cancelList) {
          cancelTokenSource.cancel()
        }
      } catch (e) {
        console.error(e)
      }
    }
  }, [CID, gatewayList])

  if (!currentGateway || loading) return <LoadingPeers/>

  return <div className={className}>
    <div className="info_content">
      <div className="total_peers">
        <TitleTwo>Results from:<span>IPFS Peers</span></TitleTwo>
        <TitleTwo2>{totalReplicas}<span>Replicas Found</span></TitleTwo2>
      </div>
      <div className="current_gateway">
        <TitleTwo3>
          Details from:<span>{currentGateway.name}</span> gateway
        </TitleTwo3>
        <div className="location">
          <span className="icon cru-fo-map-pin"/>
          {`${currentGateway.city ?? ''} ${currentGateway.country}`}
        </div>
        <div className="peers">
          {
            currentGateway.peers.map((peer, index) =>
              <div className="item" key={`peers_${index}`}>
                {`${index + 1}`}<span className="peer_id">{`Peer ID: ${peer.id}`}</span>
              </div>)
          }
        </div>
      </div>
    </div>
    <div className="map">
      <MapSvg/>
      {
        data.map((item, index) =>
          <Gateway
            className="gateway scale"
            key={`gateway_${index}`}
            data={item}
            position={ID_Style[item.id]}
            onClick={setCurrentGatewayID}
            loading={item.loading}
            active={item.id === currentGateway.id}/>)
      }
    </div>
  </div>
}

export const WorldMap = React.memo<Props>(styled(WorldMap_)`
  width: 100%;
  padding: 40px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  align-items: flex-start;

  &::-webkit-scrollbar {
    display: none;
  }

  .info_content {
    width: 31rem;

    .current_gateway {
      margin-top: 5.7rem;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 1.14rem;
      padding: 1.7rem 0.7rem 0.7rem 0.7rem;
      color: white;

      .location {
        font-size: 1rem;
        line-height: 1rem;
        margin: 1.1rem 1rem;

        .icon {
          font-size: 1.7rem;
          margin-right: 0.7rem;
          position: relative;
          top: 0.2857rem;
        }
      }

      .peers {
        position: relative;
        color: #cccccc;
        font-size: 1rem;
        margin-top: 0.57rem;
        height: 25.14rem;
        overflow-y: auto;

        .item {
          padding: 0.7rem 1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .peer_id {
          margin-left: 1.43rem;
        }

        .item:nth-child(2n - 1) {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 0.57rem;
        }
      }
    }
  }

  .map {
    flex: 4;
    min-width: 620px;
    height: min-content;
    position: relative;
    display: inline-block;
  }
`)

export default WorldMap
