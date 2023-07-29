'use client'
import { FC , useState} from "react";
import styles from './page.module.css'
import { useDraw } from "../../hooks/useDraw";
import { ChromePicker } from 'react-color'
import { io } from 'socket.io-client'
import { drawLine } from "../../utils/drawLine";
interface pageProps {}

// establishing web socket connection 
const socket = io("ws://localhost:3001");

const page: FC<pageProps> = ({}) =>{
  const {canvasRef, onMouseDwn ,clear} = useDraw(createLine)
  const [ color , setColor ] = useState<string>('#000')
  // line calculation preparing to render// 
  
  function createLine({ prevPoint ,currentPoint , ctx }:Draw){
    // emit to server socket
    socket.emit('draw-line' , ({prevPoint , currentPoint , color}))
    drawLine({ prevPoint ,currentPoint , ctx , color})
  }
  return (
    <div className={styles.main}>
      <div className="container">
      <div></div>
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
    </div>
    )
}

export default page