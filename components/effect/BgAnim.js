import {useEffect, useRef } from 'react'
import { initBgAnim, onResize, destroyAnim } from '../../lib/bgAnim'
import React from "react";

export default function BgAnim(){

    const divRef = useRef()
    const canvasRef = useRef()
    useEffect(()=> {
        let bgAnim
        if(canvasRef.current){
            bgAnim = initBgAnim(canvasRef.current, document.body)
            window.__bgAnim = bgAnim
            console.info('---initBgAnim-->')
        }
        return () => {
            console.info('---DestroyAnim-->')
            destroyAnim(bgAnim)
        }
    }, [canvasRef.current])

    useEffect(() => {
        if(!divRef.current || !canvasRef.current){
            return
        }
        let lastW = canvasRef.current.offsetWidth;
        let lastH = canvasRef.current.offsetHeight;
        const checkTask = setInterval(() => {
            const needResize = lastW !== divRef.current.offsetWidth || lastH !== divRef.current.offsetHeight
            if(needResize){
                lastW = divRef.current.offsetWidth;
                lastH = divRef.current.offsetHeight;
                // setSize([lastW,lastH])
                onResize(lastW, lastH)
                console.info('--->', needResize)
            }
        }, 1000)
        return () => { clearInterval(checkTask) }
    }, [divRef.current,canvasRef.current])

    return <div ref={divRef} style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: "rgb(45,45,45)"
    }}>
        {/*<div style={{ width: '100vw', height: '100vh', position: 'absolute', left: 0, top: 0, pointerEvents: ''}}/>*/}
        <canvas ref={canvasRef} />
    </div>
}
