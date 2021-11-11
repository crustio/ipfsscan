import React from "react";
import {BasePropsWithChildren} from "./types";
import styled from "styled-components";

export const TitleTwo = React.memo<BasePropsWithChildren>(styled.div`
  font-size: 2.57rem;
  color: white;
  white-space: nowrap;
  font-family: OpenSans-Bold;
  line-height: 2.57rem;

  span {
    color: #6ACAD1;
    margin-left: 0.7rem;
  }
`)

export const TitleTwo2 = styled(TitleTwo)`
  color: #6ACAD1;
  font-size: 3.14rem;
  line-height: 3.14rem;
  margin-top: 1.7rem;

  span {
    font-weight: normal;
    color: white;
    font-size: 1.7rem;
    line-height: 1.94rem;
    vertical-align: baseline;
  }
`
export const TitleTwo3 = styled(TitleTwo)`
  font-size: 1.43rem;
  margin: 0 1rem;
  white-space: pre-wrap;

  span {
    margin: 0 0.7rem;
  }
`

export const TitleTwo4 = styled(TitleTwo)`
  margin-top: 1.1rem;
  font-size: 1.57rem;
  color: #CCCCCC;
  font-weight: normal;
  line-height: 1.58rem;

  span {
    margin-left: 0;
    margin-right: 10px;
  }
`

export const LabelText = styled.div`
  font-size: 1.71rem;
  line-height: 1.71rem;
  color: white;
  font-weight: bold;
  display: inline-block;
  position: relative;
  white-space: nowrap;

  span {
    position: absolute;
    left: 100%;
    bottom: 100%;
    padding: 4px 6px;
    background: #3D9641;
    border-radius: 0.71rem 0;
    font-size: 0.71rem;
    line-height: 0.71rem;
    font-weight: normal;
  }
`
