import React from "react";

export interface BaseProps {
  className?: string
}

export interface BasePropsWithChildren extends BaseProps {
  children: React.ReactNode
}

export interface GatewayItem {

}
