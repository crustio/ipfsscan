import React, {useCallback, useMemo, useState} from "react";
import {BaseProps} from "./types";
import {Input} from "semantic-ui-react";
import {useRouter} from "next/router";
import styled from "styled-components";
import classNames from "classnames";
import {InputOnChangeData} from "semantic-ui-react/dist/commonjs/elements/Input/Input";

export interface Props extends BaseProps {
  defCid?: string
}

function InputCID_(p: Props) {
  const {className, defCid} = p
  const r = useRouter()
  const [CID, setCID] = useState(defCid)
  const _onClickSearch = useCallback(() => {
    if (CID) {
      r.push(`/?cid=${CID}`)
    } else {
      r.push('/')
    }
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
    placeholder="CID"
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
    border: unset !important;
    line-height: 1.6rem !important;
  }

  .icon {
    z-index: 1;
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
  }
`)

export default InputCID
