let canvas = new fabric.Canvas('canvas')

function draw(shapes, needClear = false)
{
	if (needClear)
		canvas.clear()
	if (shapes instanceof Array)
		shapes.map((shape) => canvas.add(shape))
}

function drawMap(mapArray, rows, cols, squareSize, x, y)
{
    let shapes = getGrid(mapArray, rows, cols, squareSize, x, y)
    draw(shapes, true)
}

function getGrid(mapArray, rows, cols, x, y, size)
{
    let shapes = [] 
    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols; j++) 
        {
            const color = mapArray[i * cols + j] === '1' 
                ? 'black' : mapArray[i * cols + j] === 'C' ? 'gray' : 'white' 
            
            const square = new fabric.Rect({
                left: x + (j * size),
                top: y + (i * size),
                width: size,
                height: size,
                fill: color,
                selectable: false,
            })
            shapes.push(square)
        }
    }
    return shapes
}

const MAP = `
    111111
    100001
    100C01
    100001
    100001
    111111
`

const lines = MAP.trim().split('\n')
const MAP_ARRAY_MATRIX = lines.map(line => line.trim().split(''))
const MAP_ARRAY = MAP_ARRAY_MATRIX.flat()

const MAP_ROWS = MAP_ARRAY_MATRIX.length
const MAP_COLS = MAP_ARRAY_MATRIX.length > 0 ? MAP_ARRAY_MATRIX[0].length : 0

let CAM_COORDINATES = getTokenCoordinates(MAP_ARRAY, MAP_COLS, 'C')

console.log('MAP_ARRAY_MATRIX:', MAP_ARRAY_MATRIX)
console.log('MAP_ARRAY:', MAP_ARRAY)
console.log('MAP_ROWS:', MAP_ROWS)
console.log('MAP_COLS:', MAP_COLS)
console.log('CAM_COORDINATES:', CAM_COORDINATES)


drawMap(MAP_ARRAY, MAP_ROWS, MAP_COLS, 10, 10, 10)


// Events

function handleClick(direction) 
{
    const coordinatesTo = {
        x: CAM_COORDINATES.x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0),
        y: CAM_COORDINATES.y + (direction === 'up' ? -1 : direction === 'down' ? 1 : 0),
    }

    if (moveIfCan(MAP_ARRAY, MAP_COLS, CAM_COORDINATES, coordinatesTo)) 
    {
        CAM_COORDINATES = coordinatesTo
        drawMap(MAP_ARRAY, MAP_ROWS, MAP_COLS, 10, 10, 10)
    }
}

document.querySelector('.btn-left').addEventListener('click', () => handleClick('left'))
document.querySelector('.btn-right').addEventListener('click', () => handleClick('right'))
document.querySelector('.btn-up').addEventListener('click', () => handleClick('up'))
document.querySelector('.btn-down').addEventListener('click', () => handleClick('down'))

document.addEventListener('keydown', function (event) {
    switch (event.key) 
    {
        case 'ArrowUp':
            handleClick('up')
            break
        case 'ArrowDown':
            handleClick('down')
            break
        case 'ArrowLeft':
            handleClick('left')
            break
        case 'ArrowRight':
            handleClick('right')
            break
        default:
            break
    }
})




