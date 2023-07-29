type drawLineProps = Draw & {
    // merging with other types
    color : string
}
// line calculation preparing to render
export const drawLine = ({ prevPoint ,currentPoint , ctx , color }:drawLineProps)=>{
    // connecting prevpoint with currentPoint instead of a seperate dots 
    const { x : currX , y : currY } = currentPoint
    const lineColor = color
    const linWidth = 5

    let startPoint = prevPoint ?? currentPoint 
    // if there is a prev point otherwise assign currentPoint
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
