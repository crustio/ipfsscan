import { CID } from "multiformats";

export function isCID(cid: any): boolean {
  if (!cid) return false
  try {
    return !!CID.asCID(CID.parse(cid))
  } catch (_) {
    return false
  }
}


export function openDocs(path: string) {
  window.open(`${window.location.origin}${path}`, '_blank')
}