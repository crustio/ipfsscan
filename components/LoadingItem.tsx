import React from "react";
import {BaseProps} from "./types";
import styled from "styled-components";

function LoadingItem_(p: BaseProps) {
  return <div className={p.className}>
    <span className="cru-fo cru-fo-rotate-cw"/>
  </div>
}

export const LoadingItem = React.memo<BaseProps>(styled(LoadingItem_)`
  width: 100%;
  height: 100%;
  min-height: 40rem;
  display: flex;
  align-items: center;
  justify-content: center;
  //background-color: #062B3F;
  top: 0;
  left: 0;
  z-index: 1000;

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  span.cru-fo {
    font-size: 2.5rem;
    animation: rotate 1s ease-in-out infinite;
  }
`)
