import React from "react";
import {BaseProps} from "./types";
import styled from "styled-components";
import MapSvg from "./MapSvg";


function LoadingPeers_(p: BaseProps) {
  return <div className={p.className}>
    <div className="bg">
      <MapSvg/>
    </div>
    <div className="flex1"/>
    <div className="anim">
      <img className="coffee" src={"/images/coffee.png"}/>
      <img className="coffee1" src={"/images/coffee.png"}/>
      <img className="search" src={"/images/search.png"}/>
    </div>
    <div className="tips">
      IPFS Scan is busy communicating with several globally distributed IPFS Gateways/Nodes and
      Pinning Services to ask for results for this CID, which may be time-consuming. Please be patient and wait for a
      while for full reports.
    </div>
    <div className="flex1"/>
  </div>
}

export const LoadingPeers = React.memo(styled(LoadingPeers_)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #041727 0%, #062B3F 100%);

  .bg {
    height: 0;
    position: absolute;
    overflow: visible;
    top: 50%;
    display: flex;
    align-items: center;
    z-index: 0;
    width: 100%;

    svg {
      path {
        fill: rgba(81, 110, 119, 0.5)
      }
    }
  }

  .flex1 {
    flex: 1;
  }

  @keyframes search {
    to {
      transform: translate(-40px, 20px);
    }
  }
  @keyframes coffee {
    to {
      opacity: 0.1;
      transform: translateY(100px);
    }
  }
  @keyframes coffee1 {
    from {
      opacity: 0.1;
      transform: translateY(-20px)
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .anim {
    width: 348px;
    height: auto;
    position: relative;
    z-index: 1;


    .coffee {
      width: 100%;
      height: auto;
      animation: coffee 1s ease-out infinite;
    }

    .coffee1 {
      width: 100%;
      height: auto;
      position: absolute;
      top: 0;
      left: 0;
      animation: coffee1 1s ease-out infinite;
    }

    .search {
      width: 116px;
      position: absolute;
      top: 39px;
      right: 38px;
      animation: search 1s linear infinite alternate;
    }
  }

  .tips {
    z-index: 1;
    margin-top: 100px;
    font-size: 18px;
    line-height: 25px;
    width: 80%;
    max-width: 956px;
    color: white;
    text-align: center;
  }

`)
