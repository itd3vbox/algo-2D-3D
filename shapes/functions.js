// Function to obtain a series of points along the line
const getLinePoints = (pointA, pointB) => {
    const points = []
    let numPoints = null
    
    const distance = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2))
    numPoints = Math.ceil(distance)
    
    for (let i = 0; i < numPoints; i++) 
    {
        const t = i / (numPoints - 1)
        const x = pointA.x + t * (pointB.x - pointA.x)
        const y = pointA.y + t * (pointB.y - pointA.y)
        points.push({ x, y })
    }
    return points
}

// Function to obtain a series of points along the circle
const getCirclePoints = (pointCenter, radius, numPoints) => {
    const points = []

    for (let i = 0; i < numPoints; i++) 
    {
        const theta = (i / numPoints) * 2 * Math.PI
        const x = pointCenter.x + radius * Math.cos(theta)
        const y = pointCenter.y + radius * Math.sin(theta)
        points.push({ x, y })
    }

    return points
}
