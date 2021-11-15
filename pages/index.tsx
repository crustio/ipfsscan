import React from "react";
import Page from '../components/page'
import {BaseProps} from "../components/types";
import styled from 'styled-components';
import Head from "../components/Head";
import ContentLayout from "../components/ContentLayout";
import WorldMap from "../components/WorldMap";
import {useRouter} from "next/router";
import PinningService from "../components/PinningService";
import InputCID from "../components/InputCID";
import classNames from "classnames";
import MapSvg from "../components/MapSvg";

function Home(p: BaseProps) {
  const {className} = p
  const r = useRouter()
  const CID = r.query.cid as string

  return (
    <Page className={classNames(className)}>
      {CID && <Head cid={CID}/>}
      <ContentLayout>
        {
          CID ?
            <>
              <WorldMap CID={CID}/>
              <PinningService cid={CID}/>
            </> :
            <div className="main_content">
              <div className="bg">
                <MapSvg/>
              </div>
              <div className="flex1"/>
              <img className="logo" src="/images/ipfs_scan_logo.png"/>
              <InputCID className={"input_cid"}/>
              <div className="search-tip">
                Please input a valid IPFS CID!
                <a target="_blank" href="https://docs.ipfs.io/concepts/content-addressing/#identifier-formats" rel="noreferrer">
                  What is an IPFS CID?
                </a>
              </div>
              <div className="flex1"/>
            </div>
        }
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

    .input_cid {
      z-index: 1;
      width: 80%;
      max-width: 900px;
    }

    .search-tip {
      z-index: 1;
      font-size: 1.2857rem;
      margin-top: 1.7rem;
      color: white;

      a {
        margin-left: 1rem;
      }
    }

  }

`)
