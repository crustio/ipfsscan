import React from "react";
import {BasePropsWithChildren} from "./types";
import styled from "styled-components";

export interface Props extends BasePropsWithChildren {

}

function ContentLayout_(p: Props) {
  const {className, children} = p
  return <div className={className}>
    {children}
  </div>
}

export const ContentLayout = React.memo<Props>(styled(ContentLayout_)`
  max-width: 100rem;
  width: 100%;
  @media screen and (min-width: 1400px) {
    margin-left: calc(50vw - 50rem);
  }
`)
export default ContentLayout
