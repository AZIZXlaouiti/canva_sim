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
  
  
  // * sender side *
  function createLine({ prevPoint ,currentPoint , ctx }:Draw){
    // emit to server socket
    socket.emit('draw-line' , ({prevPoint , currentPoint , color}))
    drawLine({ prevPoint ,currentPoint , ctx , color})
  }
  // * receiver side * for other socket's channel subscribers 
  // * server side calculation (socket server)
  useEffect(()=>{
    const ctx = canvasRef.current?.getContext('2d')
   
    // if new client connect (get older state to show on his end) from other subscriber
    socket.emit('client-ready')

    socket.on('get-canvas-state' , ()=>{
      // toDataURL ==> Returns the content of the current canvas as an image (string type PROBLEM: throttling )
      if (!canvasRef.current?.toDataURL()) return
      // send canvas state to new user
      socket.emit('canvas-state' , canvasRef.current.toDataURL())
      
    })
    socket.on('canvas-state-server' , (state: string)=>{
      console.log('message received!!')
      const img = new Image()
      img.src = state
      // whenever the image loads render it in the canvas 
      img.onload = () => {
        ctx?.drawImage(img , 0 , 0) // position of the image if set to (x= 0 , y=0) offset
      }
    })
    
    // if socket server is emiting messages back to client
      socket.on('draw-line' , ({prevPoint ,currentPoint , color}: DrawLineProps)=>{
    
      if (!ctx) return
      drawLine({ prevPoint ,currentPoint , ctx , color})
    })
    // adding clear event socket integration
    socket.on('clear' , clear)
    
    // clean socket connection to prevent memory leak
    return () =>{
      socket.off('canvas-state-server')
      socket.off('canvas-state')
      socket.off('draw-line')
      socket.off('clear')
    }
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