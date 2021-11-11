import {useCall} from "./hooks/useCall";
import {useApp} from "./AppContext";
import BN from "bn.js";
import {useMemo} from "react";

const ZERO = new BN(0)

export function useFilePrice(size: number) {
  const {api} = useApp()
  const isApiReady = api && api.isConnected
  const filePrice = useCall<BN>(isApiReady && api.query.market.fileByteFee) || ZERO;
  const fileBaseFee = useCall<BN>(isApiReady && api.query.market.fileBaseFee) || ZERO
  const fileKeysCountFee = useCall<BN>(isApiReady && api.query.market.fileKeysCountFee) || ZERO
  const _filePrice = filePrice.toString()
  const _fileBaseFee = fileBaseFee.toString()
  const _fileKeysCountFee = fileKeysCountFee.toString()
  return useMemo<BN>(() => {
    console.info("price:::", size, _filePrice, _fileBaseFee, _fileKeysCountFee)
    return new BN(_filePrice)
      .mul(new BN(size))
      .divn(1024 * 1024)
      .add(new BN(_fileKeysCountFee))
      .add(new BN(_fileBaseFee))
  }, [_filePrice, _fileBaseFee, _fileKeysCountFee, size])
}
