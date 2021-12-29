import classNames from 'classnames';
import { AppProps } from 'next/app';
import Head from "next/head";
import { useRouter } from 'next/router';
import React from 'react';
import styled from "styled-components";
import { BaseProps } from '../types';

interface Menu {
    name: string,
    path: string,
}

const menus: Menu[] = [
    { name: 'Welcome', path: '/docs/welcome' },
]

function _MDocs({ Component, pageProps, className }: AppProps & BaseProps) {
    const r = useRouter()
    return <div className={classNames(className)}>
        <Head>
            <title>{'IPFS Scan Docs'}</title>
            <link rel='shortcut icon' href='/favicon.png'></link>
        </Head>
        <div className="docs_head">
            <img className="logo" src="/images/ipfs_scan_logo.svg" />
        </div>
        <div className="docs_panel">
            <div className="left_menu">
                {menus.map((m,index) =>
                    <div
                        key={`docs_menu_${index}`}
                        className={classNames("item", { active: m.path === r.pathname })}
                        onClick={() => { r.push(m.path) }}>{m.name}</div>)}
            </div>
            <div className="md_content">
                <Component {...pageProps} />
            </div>
        </div>

    </div>
}

export const MDocs = styled(_MDocs)`
    font-family: ---apple-system, BlinkMacSystemFont, "微软雅黑", 'OpenSans', sans-serif;
    color: #333333;
    .docs_head{
        width: 100vw;
        height: 68px;
        background-color: black;
        .logo {
            display: inline-block;
            height: 26px;
            width: auto;
            margin-top: 21px;
            margin-left: 28px;
        }
    }
    .docs_panel {
        display: flex;
        width:  100vw;
        height: calc(100vh - 68px);
        overflow-y: auto;
    }
    
    .left_menu {
        width: 206px;
        background-color: #f7f7f7;
        border-right: 1px solid rgba(0,0,0,0.1);
        padding-top: 20px;
        color: #666666;
        font-size: 18px;
        font-family: OpenSans-SemiBold;
        .item {
            line-height: 51px;
            height: 51px;
            padding-left: 20px;
            cursor: pointer;
            color: #666666;
            &:hover {

            }
            &.active {
                color: #333333;
                border-right: solid 0.2rem var(--primary-color);
                background-color: #eeeeee;
            }
        }
    }
    .md_content {
        background-color: white;
        padding: 2.285714rem;
        flex: 1;
        height: 100%;
        overflow-y: auto;
    }
`

export default MDocs