import React from "react";
import {BasePropsWithChildren} from "./types";
import styled from "styled-components";

export type Props = BasePropsWithChildren

function ContentLayout_(p: Props) {
  const {className, children} = p
  return <div className={className}>
    {children}
  </div>
}

export const ContentLayout = React.memo<Props>(styled(ContentLayout_)`
  max-width: 1900px;
  width: 100%;

  @media screen and (min-width: 1900px) {
    margin-left: calc(50vw - 950px);
  }
`)
export default ContentLayout
