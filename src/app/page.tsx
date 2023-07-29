'use client'
import { FC , useState} from "react";
import Image from 'next/image'
import styles from './page.module.css'
import { useDraw } from "../../hooks/useDraw";
import { ChromePicker } from 'react-color'

interface pageProps {}

const page: FC<pageProps> = ({}) =>{
  const {canvasRef, onMouseDwn ,clear} = useDraw(drawLine)
  const [ color , setColor ] = useState<string>('#000')
  // line calculation preparing to render// 
  function drawLine({ prevPoint ,currentPoint , ctx }:Draw){
    // connecting prevpoint with currentPoint instead of a seperate dots 
    const { x : currX , y : currY } = currentPoint
    const lineColor = color
    const linWidth = 5

    let startPoint = prevPoint ?? currentPoint 
    // if there is a prev point otherwise assing currentPoint
    ctx.beginPath()
    ctx.lineWidth = linWidth
    ctx.strokeStyle = lineColor 
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
      <ChromePicker 
        color={color}
        onChange={(e) => setColor(e.hex)}
      />
      <button 
        onClick={clear}>
        clear
      </button>
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