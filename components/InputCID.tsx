import React, {useCallback, useState} from "react";
import {BaseProps} from "./types";
import {Input} from "semantic-ui-react";
import {useRouter} from "next/router";
import styled from "styled-components";
import classNames from "classnames";
import {InputOnChangeData} from "semantic-ui-react/dist/commonjs/elements/Input/Input";
import {isCID} from "../lib/utils";

export interface Props extends BaseProps {
  defCid?: string
}

function InputCID_(p: Props) {
  const {className, defCid} = p
  const r = useRouter()
  const [CID, setCID] = useState(defCid)
  const _onClickSearch = useCallback(() => {
    if (!CID) {
      r.push('/')
      return;
    }
    const isCid = isCID(CID)
    if (!isCid) {
      console.error('CID not true')
      return
    }
    r.push(`/?cid=${CID}`)
  }, [r, CID])

  const _onKeyDown = useCallback((e) => {
    if (e.code === 'Enter') {
      _onClickSearch()
    }
  }, [_onClickSearch])

  const _onChangedCID = useCallback((_, data: InputOnChangeData) => {
    setCID(data.value)
  }, [])

  return <Input
    className={classNames(className)}
    placeholder="Search by IPFS CID"
    defaultValue={defCid}
    onChange={_onChangedCID}
    onKeyDown={_onKeyDown}
    icon={<span className="icon cru-fo-search" onClick={_onClickSearch}/>}
  />
}

export const InputCID = React.memo<Props>(styled(InputCID_)`
  position: relative;
  width: 60rem;

  input {
    border-radius: 1.1rem !important;
    border: unset !important;
    font-size: 1.4rem !important;
    line-height: 1.6rem !important;
    padding: 1.45rem 3rem 1.45rem 1.2rem !important;
  }

  .icon {
    z-index: 1;
    font-size: 30px;
    position: absolute;
    right: 12px;
    top: calc(50% - 15px);
    cursor: pointer;
  }
`)

export default InputCID
