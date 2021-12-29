import filesize from "filesize";
import React from "react";
import styled from "styled-components";
import { FStat } from "../lib/useFileStat";
import { LoadingItem } from "./LoadingItem";
import { LabelText, LabelText2, TitleTwo, TitleTwo4, TitleTwo7 } from "./texts";
import { BaseProps } from "./types";

export interface Props extends BaseProps {
  cid: string,
  fStat: FStat,
}

function formatSize(size: number) {
  return filesize(size, { round: 2 }).toUpperCase()
}

function PinningService_(p: Props) {
  const { className, cid, fStat } = p


  const notAvailable = fStat.status !== "Loading" && fStat.status !== "Success"
  const crustAppCidLink = `https://apps.crust.network/?rpc=wss%3A%2F%2Frpc.crust.network/#/storage_files/status/${cid}`
  return <div className={className}>
    <TitleTwo>Results from:<span>IPFS Pinning Service</span></TitleTwo>
    {
      fStat.status === "Loading" && <LoadingItem />
    }
    {
      notAvailable && <div className="not_available">
        Whoops! No replica reported from trusted pinning services.<br />
        Want to get more IPFS replicas and longer (even permanent) storage guaranteed for your file/data?<br />
        <br />
        Use <a target="_blank" href="https://apps.crust.network/?rpc=wss%3A%2F%2Frpc.crust.network/#/pins"
          rel="noreferrer">Crust Pins</a> or learn more from <a
            target="_blank"
            href="https://wiki.crust.network/docs/en/storageUserGuide" rel="noreferrer">this guide</a>.
      </div>
    }
    {
      fStat.status === "Success" && fStat.file &&
      <div className="stats">
        <div className="border left">
          <LabelText className="ps_link" onClick={() => window.open('https://crust.network', '_blank')}>
            Crust Network<span>Trusted Pinning Service</span>
          </LabelText>
          <TitleTwo4>
            <span>{fStat.file.reported_replica_count}</span>Replicas available
          </TitleTwo4>
          <TitleTwo7>
            <span>{fStat.fDuration}</span>Storage Guaranteed
          </TitleTwo7>

          <LabelText2 className="mr-t1">
            FILE INFO<span onClick={() => window.open(crustAppCidLink, '_blank')}>On-Chain Data</span>
          </LabelText2>
          <div className="text_info">
            File CID:<br />
            {cid}<br />
            File Size: {formatSize(fStat.file.file_size)}
          </div>

          <LabelText2 className="mr-t1">
            STORAGE INFO<span onClick={() => window.open(crustAppCidLink, '_blank')}>On-Chain Data</span>
          </LabelText2>
          <div className="text_info">
            Renew Pool Balance: {fStat.pool}<br />
            Est.Storage Duration: {fStat.fDuration.toLowerCase()}
          </div>

          <LabelText className="mr-t1">MORE ACTION</LabelText>
          <a className="to_link" target="_blank"
            href={crustAppCidLink}
            rel="noreferrer">
            Want more replicas and duration guaranteed?<br />
            Visit more info about this CID in Crust Apps
          </a>
          <a className="to_link to_ps_docs" target="_blank"
            href="https://github.com/crustio/ipfsscan/blob/main/docs/trusted-pinning-service.md" rel="noreferrer">
            Want to apply for a Trusted Pinning Service?
          </a>
        </div>
        <div className="space" />
        <div className="border right">
          <LabelText style={{ marginLeft: '0.61rem', marginTop: '1.1857rem' }}>Details: the list of Crust Network nodes who store a replica </LabelText>
          <div className="peers">
            {
              fStat.file.replicas.map((rep, index) => {
                return <div className="peer" key={`rep_peer_${index}`}>
                  <span className="peer_order">{index + 1}</span>
                  <a
                    className="peer_id"
                    target={'_blank'}
                    rel="noreferrer"
                    href={`https://crust.subscan.io/account/${rep.who}`}
                  >{rep.who}</a>
                </div>
              })
            }
          </div>
        </div>
      </div>
    }

  </div>
}

export const PinningService = React.memo<Props>(styled(PinningService_)`
  width: 100%;
  border-radius: 1rem;
  padding: 0 40px 40px 40px;


  .not_available {
    font-size: 1.2857rem;
    line-height: 1.7857rem;
    margin-top: 2.2857rem;
    color: white;
  }

  .stats {
    display: flex;
    width: 100%;
    margin-top: 1.71rem;

    .border {
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 16px;
    }

    .space {
      width: 2.14rem;
      flex-shrink: 0;
    }

    .mr-t1 {
      margin-top: 5.143rem;
    }

    .text_info {
      margin-top: 1.1rem;
      white-space: pre-wrap;
      word-break: break-all;
      overflow: hidden;
    }

    .left {
      width: calc(13rem + 182px);
      height: calc(43.5rem + 203px);
      flex-shrink: 0;
      padding: 2.2857rem 1.71rem;
      position: relative;
    }

    .right {
      flex: 1;
      padding: 1.1rem;
      height: calc(43.5rem + 203px);
      flex-shrink: 6;
      display: flex;
      flex-direction: column;
    }

    .to_link {
      margin-top: 1.1rem;
      display: block;
      color: #CCCCCC;
      text-decoration: #cccccc underline;
      font-size: 1rem;
    }

    .to_ps_docs {
      position: absolute;
      bottom: 1.71rem;
      left: 1.71rem;
    }

    .peers {
      position: relative;
      color: #cccccc;
      font-size: 1rem;
      margin-top: 1.857rem;
      overflow-y: auto;
      height: 100%;
      flex: 1;

      .peer {
        padding: 0.7rem 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .peer_order {
        margin-left: 4rem;
        width: 1rem;
        overflow: visible;
      }

      .peer_id {
        margin-left: 4rem;
        color: #cccccc;
        text-decoration-color: #cccccc;
      }

      .peer:nth-child(2n - 1) {
        background: rgba(255, 255, 255, 0.06);
        border-radius: 0.57rem;
      }
    }

  }
  .ps_link {
    cursor: pointer;
    border-bottom: #CCCCCC solid 1px;
  }

`)

export default PinningService
