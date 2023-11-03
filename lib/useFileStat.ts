import { useApp } from "./AppContext";
import { useCall } from "./hooks/useCall";
import { BlockNumber } from "@polkadot/types/interfaces";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatBalance } from "@polkadot/util";
import { useFilePrice } from "./useFilePrice";
import BN from "bn.js";
import { ApiPromise } from "@polkadot/api";
import axios from "axios";

export type Status = "Loading" | "Submitted" | "Expired" | "Success" | "Failed";

export interface Replica {
  anchor: string;
  created_at: number;
  is_reported: boolean;
  valid_at: number;
  who: string;
}

export interface FileStat {
  amount: number;
  file_size: number;
  expired_at: number;
  reported_replica_count?: number;
  prepaid: string;
  replicas: Replica[];
  spower: number;
}

export interface FStat {
  status: Status;
  file?: FileStat;
  pool?: string;
  months?: number;
  fDuration?: string;
}

function parseStat(stat: any): FileStat | null {
  try {
    return JSON.parse(JSON.stringify(stat));
  } catch (e) {
    return null;
  }
}

function formatTime(months = 0) {
  console.info("months::", months);
  if (!months && months !== 0) return "-";
  if (months < 12) return `${months} Months`;
  if (months < 11988) return `${Math.round(months / 12)} Years`;
  return `999+ Years`;
}

function useMemoBestNumber(api?: ApiPromise): number {
  const bestNum = useCall<BlockNumber>(api?.derive?.chain?.bestNumber) || 0;
  const bestNumber = bestNum && bestNum.toNumber();
  const [num, setNum] = useState(bestNumber);
  useEffect(() => {
    if (bestNumber && bestNumber - num > 14400) {
      setNum(bestNumber);
    }
  });
  return num;
}

async function rootCid1(cid: string): Promise<string | null> {
  try {
    const res = await axios.get<string>(`https://folderanalyzer.crustapps.net/api/v1/root?cid=${cid}`, {
      timeout: 5000,
    });
    if (res.status === 200) return res.data;
  } catch (e) {
    console.info(e);
  }
  return null;
}

async function rootCid2(cid: string): Promise<string | null> {
  try {
    const res = await axios.get<any>(`https://graph.crustnetwork.io/api/file/${cid}/detail`, { timeout: 5000 });
    if (
      res.status === 200 &&
      res.data &&
      res.data.data &&
      res.data.data.parentFileStat &&
      res.data.data.parentFileStat.length
    ) {
      const index = res.data.data.parentFileStat.length - 1;
      return res.data.data.parentFileStat[index].parentCid;
    }
  } catch (e) {
    console.info(e);
  }
  return null;
}

function covertStat(ps: FileStat, bestNumber: number, fStat: FStat = { status: "Loading" }): FStat {
  const rp = [];
  Object.keys(ps.replicas).forEach((e) => {
    if (ps.replicas[e].is_reported) {
      rp.push(ps.replicas[e]);
    }
  });
  ps.replicas = rp;
  fStat.file = ps;
  fStat.pool = formatBalance(ps.prepaid, { decimals: 12, withUnit: "CRU" });
  const { expired_at, reported_replica_count } = ps;
  if (expired_at && expired_at < bestNumber) {
    // expired
    fStat.status = "Expired";
  }
  if (reported_replica_count < 1) {
    // pending
    fStat.status = "Submitted";
  }
  if (expired_at && expired_at > bestNumber && reported_replica_count > 0) {
    // success
    fStat.status = "Success";
  }
  return fStat;
}

export function useFileStat(cid: string): FStat {
  const { api } = useApp();
  const queryFileApi = api && api.query?.market && api.query?.market.filesV2;
  const bestNumber = useMemoBestNumber(api);
  const refLoading = useRef(false);
  const [fileStat, setFileStat] = useState<FStat>({ status: "Loading" });
  useEffect(() => {
    const safe = { safe: true };
    const task = async () => {
      if (refLoading.current || !queryFileApi) return;
      refLoading.current = true;
      setFileStat({ status: "Loading" });
      await new Promise((resolve) => setTimeout(resolve, 100));
      const bestNumber = (await api.derive.chain.bestNumber()).toNumber();
      console.info("bestNum:", bestNumber);
      if (!safe.safe) return;
      const checkStat = (mStat: any) => {
        if (!safe.safe) return true;
        const ps: FileStat = parseStat(mStat);
        const { expired_at, reported_replica_count } = ps || {};
        if (ps && expired_at && expired_at > bestNumber && reported_replica_count > 0) {
          refLoading.current = false;
          setFileStat(covertStat(ps, bestNumber));
          return true;
        }
        return false;
      };
      // FirstGetOnChain
      let stat = await queryFileApi(cid);
      if (checkStat(stat)) return;
      // getRootCid1
      let rootCid = await rootCid1(cid);
      if (rootCid) stat = await queryFileApi(rootCid);
      if (checkStat(stat)) return;
      // rootCid2
      rootCid = await rootCid2(cid);
      if (rootCid) stat = await queryFileApi(rootCid);
      if (checkStat(stat)) return;
      refLoading.current = false;
      setFileStat({ ...fileStat, status: "Failed" });
    };
    task().catch((error) => {
      console.info("eeror", error);
      refLoading.current = false;
      setFileStat({ ...fileStat, status: "Failed" });
    });
    return () => {
      refLoading.current = false;
      safe.safe = false;
    };
  }, [cid, queryFileApi]);

  const prepaid = fileStat.file?.prepaid ?? 0;
  const expired = fileStat.file?.expired_at ?? 0;
  const filePrice = useFilePrice(fileStat.file?.file_size || 1024);
  const _isZeroPrice = filePrice.isZero();
  const _filePrice = filePrice.toString();
  fileStat.months = useMemo<number>(() => {
    console.info("month::", prepaid, expired, _filePrice, bestNumber);
    if (_isZeroPrice) {
      return 0;
    }
    let current = 0;
    if (expired) {
      current = Math.round(((expired - bestNumber) * 6) / 2592000);
    }
    if (prepaid) {
      return new BN(prepaid).div(new BN(_filePrice)).mul(new BN(6)).add(new BN(current)).toNumber();
    }
    return current;
  }, [prepaid, expired, _isZeroPrice, _filePrice, bestNumber]);
  fileStat.fDuration = useMemo(() => formatTime(fileStat.months), [fileStat.months]);
  return fileStat;
}
