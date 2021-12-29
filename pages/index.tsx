import React, { useMemo } from "react";
import Page from '../components/page'
import { BaseProps } from "../components/types";
import styled from 'styled-components';
import Head from "../components/Head";
import ContentLayout from "../components/ContentLayout";
import WorldMap from "../components/WorldMap";
import { useRouter } from "next/router";
import PinningService from "../components/PinningService";
import InputCID from "../components/InputCID";
import classNames from "classnames";
import MapSvg from "../components/MapSvg";
import { isCID, openDocs } from "../lib/utils";
import { useFileStat } from "../lib/useFileStat";

function Home(p: BaseProps) {
  const { className } = p
  const r = useRouter()
  const CID = r.query.cid as string
  const isCid = useMemo(() => isCID(CID), [CID])
  const fStat = useFileStat(CID)
  const _onClickDocs = () => openDocs('/docs/welcome')

  return (
    <Page className={classNames(className)}>
      {CID && <Head cid={CID} />}
      <ContentLayout>
        {
          isCid && <>
            <WorldMap CID={CID} fStat={fStat} />
            <PinningService cid={CID} fStat={fStat} />
          </>}
        {
          !CID && <div className="main_content">
            <div className="bg">
              <MapSvg />
            </div>
            <div className="flex1" />
            <img className="logo" src="/images/ipfs_scan_logo.svg" />
            <span className="docs" onClick={_onClickDocs}>docs</span>
            <InputCID defCid={CID} className={"input_cid"} />
            <div className="search-tip">
              Please input an IPFS CID.
              <a target="_blank" href="https://docs.ipfs.io/concepts/content-addressing/#identifier-formats"
                rel="noreferrer">
                What is an IPFS CID?
              </a>
            </div>
            <div className="flex1" />
            <div className="power_by">Powered by <a href="https://crust.network" target="_blank" rel="noreferrer">Crust Network</a></div>
          </div>}
        {
          !isCid && CID && <div className="invalid_cid">
            <span className="cru-fo-alert-circle" />
            <div className="search-tip">
              Please input an valid IPFS CID!
              <a target="_blank" href="https://docs.ipfs.io/concepts/content-addressing/#identifier-formats"
                rel="noreferrer">
                What is an IPFS CID?
              </a>
            </div>
          </div>}
      </ContentLayout>
    </Page>
  )
}

export default React.memo(styled(Home)`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;

  .main_content {
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    .flex1 {
      flex: 1;
    }

    .bg {
      height: 0;
      position: absolute;
      overflow: visible;
      top: 50%;
      display: flex;
      align-items: center;
      z-index: 0;
      width: 100%;
      max-height: 100vh;

      svg {
        width: 100%;
        height: auto;

        path {
          fill-opacity: 0.5;
        }
      }
    }


    .logo {
      z-index: 1;
      width: 25rem;
      height: auto;
      margin-bottom: 3.2rem;
    }
    .docs {
      cursor: pointer;
      font-size: 18px;
      line-height: 15px;
      position: absolute;
      right: 36px;
      top: 18px;
    }
    .input_cid {
      z-index: 1;
      width: 80%;
      max-width: 900px;

      input::selection {
        color: #333333;
      }
    }

  }

  .invalid_cid {
    width: 100%;
    margin-top: 18.57rem;
    text-align: center;

    span {
      font-size: 10rem;
      color: #516E77;
    }
  }

  .search-tip {
    z-index: 1;
    font-size: 1.4285rem;
    margin-top: 1.7rem;
    color: white;

    a {
      margin-left: 1rem;
    }
  }

  .power_by {
    font-size: 1.29rem;
    z-index: 1;
    color: #ffffff;
    margin-bottom: 2.57rem;
    a {
      color: #ffffff;
      text-decoration: underline;
      text-decoration-color: #ffffff;
    }
  }
`)
