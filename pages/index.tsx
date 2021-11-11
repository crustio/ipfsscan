import React, {useEffect, useState} from "react";
import Page from '../components/page'
import {BaseProps, GatewayItem} from "../components/types";
import styled from 'styled-components';
import Head from "../components/Head";
import ContentLayout from "../components/ContentLayout";
import WorldMap from "../components/WorldMap";
import {useRouter} from "next/router";
import PinningService from "../components/PinningService";
import InputCID from "../components/InputCID";
import classNames from "classnames";
import axios from "axios";

function Home(p: BaseProps) {
  const {className} = p
  const r = useRouter()
  const CID = r.query.cid as string
  const [gatewayData, setGatewayData] = useState<GatewayItem[]>([])
  useEffect(() => {
    if (CID) {
      axios.get("", {})
    }
  }, [CID])
  useEffect(() => {
    if (CID) {

    }
  }, [CID])

  return (
    <Page className={className}>
      {CID && <Head cid={CID}/>}
      <ContentLayout className={classNames({main_page: !CID})}>
        {
          CID ?
            <>
              <WorldMap/>
              <PinningService/>
            </> :
            <>
              <InputCID className={"input_cid"}/>
            </>
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

  .main_page {
    margin-top: 44vh;
    max-width: 60rem;
    width: 100%;
    @media screen and (min-width: 840px) {
      margin-left: calc(50vw - 30rem);
    }
  }

  .input_cid {
    width: 80%;
    margin-left: 10%;
  }
`)
