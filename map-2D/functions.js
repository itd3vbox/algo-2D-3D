
function isWall(map, index)
{
    return map[index] === '1'
}

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

function moveIfCan(map, cols, coordinatesFrom, coordinatesTo)
{
    const indexFrom = getIndexFromCoordinates(cols, coordinatesFrom)
    const indexTo = getIndexFromCoordinates(cols, coordinatesTo)
    if (isWall(map, indexTo) === false)
    {
        map[indexFrom] = '0'
        map[indexTo] = 'C'
        return true
    }
    return false
}




