import React from "react";

export interface BaseProps {
  className?: string
}

export interface BasePropsWithChildren extends BaseProps {
  children: React.ReactNode
}

export interface GatewayItem {
  name: string,
  city?: string,
  country?: string,
  baseUrl: string,
  id: number,
  is_thunder: number,
  latitude: string,
  longitude: string
}

export interface Peer {
  id: string
}

export interface GatewayInfo extends GatewayItem {
  peers: Peer[],
  loading: boolean
}
