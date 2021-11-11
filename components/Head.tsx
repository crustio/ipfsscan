import React from "react";
import {BaseProps} from "./types";
import styled from "styled-components";
import {Input} from "semantic-ui-react";
import {useRouter} from "next/router";
import InputCID from "./InputCID";

export interface Props extends BaseProps {
  cid?: string
}

function Head_(p: Props) {
  const {className, cid} = p
  const r = useRouter();

  return <div className={className}>
    <span className="logo left"/>
    {
      cid && <InputCID defCid={r.query.cid as string}/>
    }
    <span className="right"/>
  </div>
}

export const Head = React.memo<Props>(styled(Head_)`
  height: 5rem;
  border-bottom: #cccccc;
  box-shadow: 0 0.2rem 1.5rem rgba(200, 200, 200, 0.3);
  text-align: center;
  display: flex;
  align-items: center;

  .left.logo {
    flex: 1;
  }

  .input.cid {
    display: inline-block;
    width: 50%;
    padding: 0.8rem 1rem;
    border-radius: 0.6rem;
    border: unset !important;
    box-shadow: unset !important;
    position: relative;

    input {
      width: 100%;
    }

    span {
      position: absolute;
      float: right;
      right: 2rem;
      top: 1.6rem;
    }
  }

  .right {
    flex: 1;
  }
`)
export default Head
