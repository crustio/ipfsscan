import React from "react";
import {BaseProps} from "./types";
import styled from "styled-components";

export interface Props extends BaseProps {

}

function PinningService_(p: Props) {
  const {className} = p
  return <div className={className}>

  </div>
}

export const PinningService = React.memo<Props>(styled(PinningService_)`
  width: 100%;
  min-height: 60rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.2);
`)

export default PinningService
