import React, {useCallback, useMemo} from "react";
import {BaseProps, GatewayInfo} from "./types";
import styled from "styled-components";
import classNames from "classnames";

export interface Props extends BaseProps {
  data: GatewayInfo,
  position: {
    top: string,
    left: string
  },
  active: boolean,
  loading: boolean
  onClick?: (id: number) => void
}

const MAX = 50;
const MIN = 10

function Gateway_(p: Props) {
  const {className, data, position, active, onClick, loading} = p
  const size = useMemo<number>(() => {
    const count = data.peers.length
    if (count === 0) return 0
    const s = Math.round(data.peers.length * MAX / 50)
    if (s < MIN) return MIN
    return s
  }, [data.peers])

  const showRound = size >= MIN
  const panelOffSize = Math.max(size, 5)
  const _onClick = useCallback(() => {
    if (onClick && !active) onClick(data.id)
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
        }}/>
    }
    {loading && <div className="dot_anim"/>}
    <div className="dot"/>
    {
      !loading &&
      <div
        className={classNames("info_panel", {active})}
        onClick={_onClick}
        style={{
          left: -150,
          top: -(panelOffSize + 128 + 22),
        }}>
        <div className="title">
          Reported by<span className="name">{data.name}</span>gateway:
        </div>
        <div className="flex1"/>
        <div className="location_peers">
          {`${data.city ? data.city + ',' : ""}`}{data.country}<br/>
          <span className="count">{data.peers.length}</span>
          IPFS Peers found available for this file.
        </div>
        <div className="arrow"/>
      </div>
    }
  </div>
}

export const Gateway = React.memo<Props>(styled(Gateway_)`
  position: absolute;
  overflow: visible;
  width: 0;
  height: 0;

  ${({active}) => `z-index:${active ? 11 : 10};`};
  
  .dot_round {
    z-index: 4;
    position: absolute;
    border: solid 1px #6ACAD1;
    background-color: rgba(106, 202, 209, 0.3);
    animation: showDotRound 1s ease-in-out 1;
  }

  .dot_anim {
    animation: dotAnim 1s linear infinite;
    z-index: 5;
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
    width: 300px;
    height: 128px;
    border-radius: 16px;
    background-color: white;
    padding: 16px;
    color: #333333;
    cursor: pointer;
    position: relative;
    overflow: visible;
    animation: showInfo 1s ease-in-out 1;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 16px;
      line-height: 22px;
      font-weight: bold;

      .name {
        color: #FF8D00;
        margin: 0 6px;
      }
    }

    .location_peers {
      font-size: 14px;
      line-height: 19px;
      color: #666666;

      .count {
        color: #FF8D00;
        margin-right: 6px;
      }
    }

    .arrow {
      width: 20px;
      height: 20px;
      position: absolute;
      bottom: -10px;
      left: 140px;
      transform: rotate(45deg);
      background-color: white;
    }
  }

  .info_panel.active {
    background-color: #3D8F96;;
    color: white;

    .arrow {
      background-color: #3D8F96;;
    }

    .location_peers {
      color: white;
    }
  }

  @keyframes dotAnim {
    from {
      left: -0.3rem;
      top: -0.3rem;
      width: 0.6rem;
      height: 0.6rem;
      opacity: 1;
    }
    to {
      left: -2rem;
      top: -2rem;
      width: 4rem;
      height: 4rem;
      opacity: 0.1;
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
