'use client'
import { FC } from "react";
import Image from 'next/image'
import styles from './page.module.css'
import { useDraw } from "../../hooks/useDraw";

interface pageProps {}

const page: FC<pageProps> = ({}) =>{
  const {canvasRef, onMouseDwn} = useDraw(drawLine)

  // line calculation preparing to render// 
  function drawLine({ prevPoint ,currentPoint , ctx }:Draw){
    // connecting prevpoint with currentPoint instead of a seperate dots 
    const { x : currX , y : currY } = currentPoint
    const color = '#000'
    const linWidth = 5

    let startPoint = prevPoint ?? currentPoint 
    // if there is a prev point otherwise assing currentPoint
    ctx.beginPath()
    ctx.lineWidth = linWidth
    ctx.strokeStyle = color 
    ctx.moveTo(startPoint.x , startPoint.y)
    // connecting line
    ctx.lineTo(currX , currY)
    ctx.stroke()

    ctx.fillStyle = color
    ctx.beginPath()
    // arc(x: number, y: number, radius: number,
    ctx.arc(startPoint.x , startPoint.y , 2 ,0 ,2 * Math.PI) // get full circle??
    ctx.fill()

  }
  return (
    <div className={styles.main}>
    <canvas
      onMouseDown={onMouseDwn}
      ref = {canvasRef}
      width={750}
      height={750}
    />
    </div>
    )
}

export default page