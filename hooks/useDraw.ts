import { useEffect, useRef } from "react"

export const useDraw  = ()=>{
    // custom hooks for drawing / rendering 
    // use useRef hook for refrencing the mouse click / stop action (redering is active when mouse is pressed)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    useEffect(()=>{
        const handler = (e:MouseEvent)=>{
            const currentPoint = computePoints(e)
        }
        const computePoints = (e: MouseEvent)=>{
            const canvas = canvasRef.current
            if (!canvas){
                return 
            }
            const rect = canvas.getBoundingClientRect()
            // get relative canvas position
            const x = e.clientX - rect.left 
            const y = e.clientY - rect.top

            return {x , y}
        }   
        // useEffect cleaner to prevent memory leak 
        canvasRef.current?.addEventListener('mousemove', handler)
        return () =>{
            canvasRef.current?.addEventListener('mousemove', handler)
        }
    },[])

    return {canvasRef}
}