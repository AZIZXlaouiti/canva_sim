import { useEffect, useRef, useState } from "react"

// custom hooks for drawing / rendering 
export const useDraw  = (onDraw : ({ctx , currentPoint , prevPoint} : Draw) => void)=>{
    // use useRef hook for refrencing the mouse click / stop action (redering is active when mouse is pressed)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const prevPoint = useRef<null | Point>(null)
    // checking for mouse down to presume rendering 
    const [mouseDwn , setMouseDwn] = useState(false)

    const onMouseDwn = () => setMouseDwn(true)
    const clear = ()=>{
        const canvas = canvasRef.current
        if (!canvas) return
        
        const ctx  = canvasRef.current?.getContext('2d')
        if (!ctx) return

        ctx.clearRect( 0 , 0 , canvas.width , canvas.height)
    }
    useEffect(()=>{
        const handler = (e:MouseEvent)=>{
            if (!mouseDwn) return
            const currentPoint = computePoints(e)
            // ctx = context
            // provides methods and properties for drawing and manipulating images and graphics on a canvas
            const ctx  = canvasRef.current?.getContext('2d')
            if (!ctx || !currentPoint) {
                // if ctx does not exist or currenpoint is null useRef()
                return 
            }
            // object notation {}
            onDraw({ ctx , currentPoint , prevPoint: prevPoint.current })
            // this line will cause canvas to render unconnnected dots 
            prevPoint.current = currentPoint
            // setting this will connect dots to form a smooth line 

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
        const mouseUpHandler = ()=>{
            setMouseDwn(false)
            prevPoint.current = null
        }
        // useEffect cleaner to prevent memory leak 
        canvasRef.current?.addEventListener('mousemove', handler)
        // add mouse event listener 
        window.addEventListener('mouseup' , mouseUpHandler)
        return () =>{
            canvasRef.current?.removeEventListener('mousemove', handler)
            window.removeEventListener('mouseup' , mouseUpHandler)
        }
    },[onDraw])

    return {canvasRef , onMouseDwn , clear} 
}