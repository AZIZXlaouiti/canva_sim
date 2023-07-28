'use client'
import { FC } from "react";
import Image from 'next/image'
import styles from './page.module.css'
import { useDraw } from "../../hooks/useDraw";
interface pageProps {}

const page: FC<pageProps> = ({}) =>{
  const {canvasRef} = useDraw()
  return (
    <div className={styles.main}>
    <canvas
      ref = {canvasRef}
      width={750}
      height={750}
    />
    </div>
    )
}

export default page