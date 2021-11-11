
### Introduction

`IPFS SCAN` is open for application as `Trusted Pinning Services`. 

A `Trusted Pinning Service` should provide an open API for `IPFS SCAN` to query storage information of a specified CID. The authentication mechanism and API signature could be self-defined. Nevertheless, below is a sample API defination as a reference.

### API

#### URL

```
https://api.example.com/query
```

#### Arguments
- `cid` [string]: The CID to query for storage information


#### Response

On success, the API returns with 200 and the following body:

```JSON
{
    "CID": "<string>",
    "Name": "<string>",
    "Description": "<string>",
    "Size": "<int64>",
    "ExpireTime": "<timestamp>",
    "ReplicaCount": "<int>",
    "Replicas": [
        {
            "PeerID": "<string>",
            "Addrs": [
                "<multiaddr-string>"
            ],
            "Identity": "<string>",
            "City": "<string>",
            "Country": "<string>",
            "Longitude": "<float>",
            "Latitude": "<float>",
        },
    ]
}
```

### Contact Us for Application

- Email: <hi@crust.network>
- Telegram: <https://t.me/CrustNetwork>
- Discord: <https://discord.gg/Jbw2PAUSCR>
