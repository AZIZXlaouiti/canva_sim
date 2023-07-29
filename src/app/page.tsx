'use client'
import { FC , useState} from "react";
import Image from 'next/image'
import styles from './page.module.css'
import { useDraw } from "../../hooks/useDraw";
import { ChromePicker } from 'react-color'
import { io } from 'socket.io-client'
interface pageProps {}

const socket = io('http://localhost:3000/')

const page: FC<pageProps> = ({}) =>{
  const {canvasRef, onMouseDwn ,clear} = useDraw(drawLine)
  const [ color , setColor ] = useState<string>('#000')
  // line calculation preparing to render// 
  function drawLine({ prevPoint ,currentPoint , ctx }:Draw){
    

  }
  function createLine({ prevPoint ,currentPoint , ctx }:Draw){
    // emit to server
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