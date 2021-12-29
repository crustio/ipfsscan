import React, { useCallback, useMemo } from "react";
import { BaseProps } from "./types";
import styled from "styled-components";
import classNames from "classnames";
import { IpfsScan } from "../lib/hooks/useIpfsScan";
import { IpfsGateway } from "../lib/types";
import { TitleTwo5, TitleTwo6 } from "./texts";

export interface Props extends BaseProps {
  data: [IpfsGateway, IpfsScan],
  position: {
    top: string,
    left: string
  },
  active: boolean,
  onClick?: (id: number) => void
}

const MAX = 50;
const MIN = 10

export function getLocationName(gate: IpfsGateway): string {
  if (gate.country) return `${gate.city}, ${gate.country}`
  return gate.city
}

function Gateway_(p: Props) {
  const { className, data, position, active, onClick } = p
  const [gate, scan] = data
  const loading = scan.isLoadDag
  const size = useMemo<number>(() => {
    const count = scan.peers.length
    if (count === 0) return 0
    const s = Math.round(scan.peers.length * MAX / 50)
    if (s < MIN) return MIN
    return s
  }, [scan.peers])

  const showRound = size >= MIN
  const panelOffSize = Math.max(size, 5)
  const _onClick = useCallback(() => {
    if (onClick && !active) onClick(gate.id)
  }, [onClick, data, active])

  return <div className={className} style={position}>
    {
      showRound && !loading &&
      <div
        className="dot_round"
        style={{
          width: size * 2,
          height: size * 2,
          left: -size,
          top: -size,
          borderRadius: size
        }} />
    }
    {loading && <div className="dot_anim" />}
    <div className="dot" />
    {
      !loading &&
      <div
        className={classNames("info_panel", { active })}
        onClick={_onClick}
        style={{
          left: -150,
          top: -(panelOffSize + 142 + 22),
        }}>
        <TitleTwo5 className="title">Reported gateway: <span>{gate.name}</span></TitleTwo5>
        <div className="location text">
          <span className="cru-fo cru-fo-map-pin" /> {getLocationName(gate)}
        </div>
        <div className="flex1" />
        <div className="line" />
        <div className="flex1" />
        <TitleTwo6 className="text">Availability: <span>{scan.dag ? 'YES' : 'NO'}</span></TitleTwo6>
        <TitleTwo6 className="text">/dht/findprovs returns: <span className={classNames({ textLoadAnim: scan.isLoadPeers })}>{scan.peers.length}</span> peers</TitleTwo6>
        <div className="arrow" />
      </div>
    }
  </div>
}

export const Gateway = React.memo<Props>(styled(Gateway_)`
  position: absolute;
  overflow: visible;
  width: 0;
  height: 0;

  ${({ active }) => `z-index:${active ? 11 : 10};`};

  .dot_round {
    z-index: 4;
    position: absolute;
    border: solid 1px #6ACAD1;
    background-color: rgba(106, 202, 209, 0.3);
    animation: showDotRound 1s ease-in-out 1;
  }

  .dot_anim {
    animation: dotAnim 1s linear infinite;
    animation-delay: 20ms;
    z-index: 5;
    left: -0.3rem;
    top: -0.3rem;
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    border-radius: 2rem;
    border: solid 2px #6ACAD1;
    background-color: rgba(106, 202, 209, 0.3);
  }

  .dot {
    z-index: 6;
    position: absolute;
    left: -5px;
    top: -5px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: #6ACAD1;
  }

  .info_panel {
    width: 308px;
    height: 142px;
    border-radius: 16px;
    background-color: white;
    padding: 10px 14px;
    color: #333333;
    cursor: pointer;
    position: relative;
    overflow: visible;
    animation: showInfo 1s ease-in-out 1;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border: 2px solid #3D8F96;

    .line {
      width: 100%;
      height: 1px;
      background-color: #eeeeee;
      flex-shrink: 0;
    }

    .text {
      color: #666666;
    }

    .location {
      font-size: 14px;
      line-height: 19px;
      margin-top: 5px;

      .cru-fo {
        position: relative;
        font-size: 16px;
        top: 2px;
      }
    }

    .arrow {
      width: 20px;
      height: 20px;
      position: absolute;
      bottom: -11px;
      left: 140px;
      transform: rotate(45deg);
      background-color: white;
      border-bottom: 2px solid #3D8F96;
      border-right: 2px solid #3D8F96;
    }
  }

  .info_panel.active {
    background-color: #3D8F96;;

    &, .text {
      color: white !important;
    }

    .line {
      background-color: rgba(238, 238, 238, 0.5);
    }

    .arrow {
      background-color: #3D8F96;;
    }

    .location_peers {
      color: white;
    }
  }

  @keyframes dotAnim {
    from {
      opacity:1;
    }

    to {
      left: -2rem;
      top: -2rem;
      width: 4rem;
      height: 4rem;
      opacity: 0;
    }
  }

  @keyframes showInfo {
    from {
      transform: translateY(-300px);
      opacity: 0.1;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes showDotRound {
    from {
      transform: scale(0.1);
    }
    to {
      transform: scale(1);
    }
  }
`)
