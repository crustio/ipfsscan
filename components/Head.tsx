import React from "react";
import {BaseProps} from "./types";
import styled from "styled-components";
import {useRouter} from "next/router";
import InputCID from "./InputCID";

export interface Props extends BaseProps {
  cid?: string
}

function Head_(p: Props) {
  const {className, cid} = p
  const r = useRouter();
  const toHome = () => r.push('/')
  return <div className={className}>
    <div className="left">
      <img className="logo" src="/images/ipfs_scan_logo.png" onClick={toHome}/>
    </div>
    {cid && <InputCID defCid={r.query.cid as string}/>}
  </div>
}

export const Head = React.memo<Props>(styled(Head_)`
  height: 76px;
  border-bottom: #cccccc;
  //box-shadow: 0 0.2rem 1.5rem rgba(200, 200, 200, 0.3);
  text-align: center;
  background: rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;

  .left {
    flex: 1;

    .logo {
      cursor: pointer;
      margin-left: 60px;
      height: 44px;
      object-fit: contain;
    }
  }

  .input {
    width: 50%;
    max-width: 720px;
    margin-right: 60px;

    input {
      font-size: 14px !important;
      background-color: #041727 !important;
      border-radius: 8px !important;
      width: 100%;
      padding: 13px 26px 12px 16px !important;
      color: #60757B !important;
    }

    .icon {
      color: #60757B !important;
      right: 12px;
    }
  }

`)
export default Head
