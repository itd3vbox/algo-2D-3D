
function getIndexFromCoordinates(cols, coordinates)
{
    let index = coordinates.x + (coordinates.y * cols)
    return index
}

function getCoordinatesFromIndex(cols, index)
{
    let coordinates = {
        x: index % cols,
        y: Math.floor(index / cols)
    }
    return coordinates
}

function getTokenCoordinates(map, cols, token)
{
    let index = map.indexOf(token)
    return index !== -1 ? getCoordinatesFromIndex(cols, index) : null
}

function getRayCoordinatesEnd(centerX, centerY, radius, angle)
{
    const angleInRadians = (angle * Math.PI) / 180

    const coord = {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    }
    
    return coord
}
