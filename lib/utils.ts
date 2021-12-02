import { CID } from "multiformats";
import lodash from 'lodash';
const axios = require('axios');
const dnsLinkPrefix = '/ipfs/';
const ipnsPrefix = '/ipns/'

export function isCID(cid: any): boolean {
  if (!cid) return false
  try {
    return !!CID.asCID(CID.parse(cid))
  } catch (_) {
    return false
  }
}

export async function getCID(queryStr: string) {
  try {
    if (queryStr) {
      if (!!CID.asCID(CID.parse(queryStr))) {
        return queryStr;
      }
      return undefined
    } else {
      return undefined
    }
  } catch (error) {
    // get cid if dnslink
    var config = {
      method: 'get',
      url: `https://dns.google/resolve?name=${queryStr}&type=TXT`,
      headers: { }
    };
    return axios(config).then(function (response) {
      const dnsResult = response.data;
      const answer = dnsResult.Answer    
      if (answer) {
        if (answer.length) {
          for (const dnsDetail of answer) {
            const data = dnsDetail.data
            if (data.includes(dnsLinkPrefix)) {
              const [_, pathWithCID] = lodash.split(data, dnsLinkPrefix);
              const [cid, suffix] = lodash.split(pathWithCID, '/');
              return cid;
            }
          }
          return undefined;
        }
      } else {
        return getCidFromIpnsLink(queryStr);
      }
    }).catch(function (error) {
      console.log(error);
      return getCidFromIpnsLink(queryStr);
    });
  }
}

const getCidFromIpnsLink = (queryStr: string) => {
  if (queryStr.includes(ipnsPrefix)) {
    const [_, pathWithCID] = lodash.split(queryStr, ipnsPrefix);
    const [cid, suffix] = lodash.split(pathWithCID, '/');
    return cid
  } else {
    return undefined;
  }
}
