'use client'
import { FC , useEffect, useState} from "react";
import styles from './page.module.css'
import { useDraw } from "../../hooks/useDraw";
import { ChromePicker } from 'react-color'
import { io } from 'socket.io-client'
import { drawLine } from "../../utils/drawLine";
interface pageProps {}
type DrawLineProps = {
  color : string
  prevPoint : Point | null
  currentPoint : Point
}
// establishing web socket connection 
const socket = io("ws://localhost:3001");

const page: FC<pageProps> = ({}) =>{
  const {canvasRef, onMouseDwn ,clear} = useDraw(createLine)
  const [ color , setColor ] = useState<string>('#000')
  // line calculation preparing to render// 
  
  // * sender side *
  function createLine({ prevPoint ,currentPoint , ctx }:Draw){
    // emit to server socket
    socket.emit('draw-line' , ({prevPoint , currentPoint , color}))
    drawLine({ prevPoint ,currentPoint , ctx , color})
  }
  // * receiver side * for other socket's channel subscribers  
  useEffect(()=>{
    const ctx = canvasRef.current?.getContext('2d')
    // if socket server is emiting messages back to client
    socket.on('draw-line' , ({prevPoint ,currentPoint , color}: DrawLineProps)=>{
    if (!ctx) return
    drawLine({ prevPoint ,currentPoint , ctx , color})
    })

    // adding clear event socket integratiob
    socket.on('clear' , clear)
  },[canvasRef])


  return (
    <div className={styles.main}>
      <div className="container">
      <div></div>
      <ChromePicker 
        color={color}
        onChange={(e) => setColor(e.hex)}
        />
      <button 
        onClick={() => socket.emit('clear')}>
        clear
      </button>
    <canvas
      onMouseDown={onMouseDwn}
      ref = {canvasRef}
      width={750}
      height={750}
      />
      </div>
    </div>
    )
}

export default page