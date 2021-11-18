import React, {useEffect, useMemo, useState} from "react";
import {BaseProps} from "./types";
import styled from "styled-components";
import MapSvg from "./MapSvg";
import _ from 'lodash';
import {LoadingPeers} from "./LoadingPeers";
import {Gateway, getLocationName} from "./Gateway"
import {TitleTwo, TitleTwo2, TitleTwo3} from "./texts";
import {IpfsScan, useIpfsScan} from "../lib/hooks/useIpfsScan";
import {IpfsGateway} from "../lib/types";
import {GatewayList} from "../lib/constans";
import classNames from "classnames";

export interface Props extends BaseProps {
  CID: string
}

const City_Style = {
  Local: {
    top: '39%',
    left: '84%'
  },
  // Shanghai
  Shanghai: {
    top: '39%',
    left: '84%'
  },
  // Jinhua
  Jinhua: {
    top: '41%',
    left: '83%'
  },
  // Singapore
  Singapore: {
    top: '65%',
    left: '78%'
  },
  // Seattle
  Seattle: {
    top: '40%',
    left: '14%'
  },
}


function WorldMap_(p: Props) {
  const {className, CID} = p
  const [currentGatewayId, setCurrentGatewayID] = useState<number | null>(null)
  const scans = useIpfsScan(CID);
  // isLoad
  const isLoadAvailable = useMemo(() => {
    return !!scans.filter(item => item.isLoadDag).length
  }, [scans])
  const isLoadPeers = useMemo(() => {
    return !!scans.filter(item => item.isLoadPeers).length
  }, [scans])

  const availableNum = useMemo(() => {
    return scans.filter((item) => !!item.dag).length
  }, [scans])
  const currentGatewayScan = useMemo<IpfsScan | null>(() => {
    console.info('scans:', scans)
    if (currentGatewayId) {
      return scans.find(item => item.gatewayId === currentGatewayId)
    }
    return null
  }, [currentGatewayId, scans])
  const currentGateway = useMemo<IpfsGateway | null>(() => {
    if (currentGatewayId) {
      return GatewayList.find(item => item.id === currentGatewayId)
    }
    return null
  }, [currentGatewayId])
  const data = useMemo<[IpfsGateway, IpfsScan][]>(() => {
    return scans.map((scan) => {
      return [GatewayList.find(item => item.id === scan.gatewayId), scan]
    })
  }, [scans])

  const totalReplicas = useMemo(() => {
    return _.chain(scans)
      .reduce((a, b) => a.concat(b.peers), [])
      .map(item => item.id)
      .uniq()
      .value()
      .length
  }, [scans])

  useEffect(() => {
    if (!currentGatewayId) {
      const find = scans.find(item => !item.isLoadPeers || !item.isLoadDag)
      if (find) {
        setCurrentGatewayID(find.gatewayId)
      }
    }
  }, [scans])

  const loading = useMemo(() => {
    return !scans.find(item => !item.isLoadPeers || !item.isLoadDag)
  }, [scans])
  if (!currentGateway || loading) return <LoadingPeers/>

  return <div className={className}>
    <div className="info_content">
      <div className="total_peers">
        <TitleTwo>Results from: <span>IPFS Peers</span></TitleTwo>
        <TitleTwo2>Available at <span className={classNames({textLoadAnim: isLoadAvailable})}>
          {`${availableNum}/${scans.length}`}</span> Peers
        </TitleTwo2>
        <TitleTwo2>
          <span className={classNames({textLoadAnim: isLoadPeers})}>{totalReplicas}</span> Replicas Found
        </TitleTwo2>
      </div>
      <div className="flex1"/>
      <div className="current_gateway">
        <TitleTwo3>
          Details from:<span>{currentGateway.name}</span> gateway
        </TitleTwo3>
        <div className="location">
          <span className="icon cru-fo-map-pin"/>
          {getLocationName(currentGateway)}
        </div>
        <TitleTwo3>
          Availability: <span>{currentGatewayScan.dag ? 'YES' : 'NO'}</span>
        </TitleTwo3>
        <div className="availability_text">
          {`Your file is ${currentGatewayScan.dag ? 'available' : 'unavailable'} at this gateway`}
        </div>
        <div className="peers_title">
          The list of peers that have this file’s replica:
        </div>
        <div className="peers">
          {
            currentGatewayScan.peers.map((peer, index) =>
              <div className="item" key={`peers_${index}`}>
                {`${index + 1}`}<span className="peer_id">{`Peer ID: ${peer.id}`}</span>
              </div>)
          }
        </div>
      </div>
      <a target="_blank" href="https://github.com/crustio/ipfsscan/blob/main/docs/contribute-gateway.md"
         rel="noreferrer">How to contribute a gateway?</a>
    </div>
    <div className="map">
      <MapSvg/>
      {
        data.map((item, index) =>
          <Gateway
            className="gateway scale"
            key={`gateway_${index}`}
            data={item}
            position={City_Style[item[0].city]}
            onClick={setCurrentGatewayID}
            active={item[0].id === currentGateway.id}/>)
      }
    </div>
  </div>
}

export const WorldMap = React.memo<Props>(styled(WorldMap_)`
  @keyframes textLoad {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.5;
    }
  }

  .textLoadAnim {
    animation: textLoad 500ms ease-in-out infinite reverse;
  }

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
    display: flex;
    flex-direction: column;

    .current_gateway {
      margin-top: 5.7rem;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 1.14rem;
      padding: 1.7rem 0.7rem 0.7rem 0.7rem;
      color: white;

      .location {
        font-size: 1rem;
        line-height: 1rem;
        margin: 0.9rem 1rem 2.3857rem 0.9rem;

        .icon {
          font-size: 1.14rem;
          margin-right: 0.7rem;
          position: relative;
          top: 0.14rem;
        }
      }

      .availability_text {
        padding: 0.3rem 0 1.7rem 0;
        margin: 0 1rem;
        font-size: 1rem;
        border-bottom: solid 1px rgba(238, 238, 238, 0.5);
      }

      .peers_title {
        font-size: 1.14rem;
        line-height: 1.57rem;
        margin-top: 1.7rem;
        margin-left: 1rem;
      }

      .peers {
        position: relative;
        color: #cccccc;
        font-size: 1rem;
        margin-top: 0.57rem;
        height: calc(112px + 5.7857rem);
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

    a {
      color: #CCCCCC;
      margin-left: 1.7rem;
      margin-top: 1rem;
      text-decoration: #CCCCCC underline;
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
