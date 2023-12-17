let canvas = new fabric.Canvas('canvas')

function draw(shapes, needClear = false)
{
	if (needClear)
		canvas.clear()
	if (shapes instanceof Array)
		shapes.map((shape) => canvas.add(shape))
}

function drawMap(mapArray, rows, cols, squareSize, x, y, radius, angle)
{
    let shapes = getGrid(mapArray, rows, cols, squareSize, x, y)
    draw(shapes, true)
    shapes = getDial(rows, cols, squareSize, x, y, radius, angle)
    draw(shapes)
}

function getGrid(mapArray, rows, cols, size, x, y)
{
    let shapes = [] 
    for (let i = 0; i < rows; i++) 
    {
        for (let j = 0; j < cols; j++) 
        {
            const square = new fabric.Rect({
                left: x + (j * size),
                top: y + (i * size),
                width: size,
                height: size,
                fill: 'white',
                stroke: 'black', 
                strokeWidth: 1,
                selectable: false,
            })
            shapes.push(square)
            
            if (mapArray[i * cols + j] === 'C')
            {
                const circle = new fabric.Circle({
                    left: x + (j * size + (size / 2)),
                    top: y + (i * size + (size / 2)),
                    originX: 'center', 
                    originY: 'center',
                    radius: 5,
                    fill: 'red',
                    selectable: false,
                })
                shapes.push(circle)   
            }
        }
    }
    
    return shapes
}

function getDial(rows, cols, size, x, y, radius, angle)
{
    let shapes = [] 
    const circle = new fabric.Circle({
        left: x + (cols * size / 2),
        top: y + (rows * size / 2),
        originX: 'center', 
        originY: 'center',
        radius: radius,
        fill: 'transparent',
        stroke: 'red', 
        strokeWidth: 1,
        selectable: false,
    })
    shapes.push(circle)

    const rayCoordEnd = getRayCoordinatesEnd(x + (cols * size / 2), y + (rows * size / 2), radius, angle)
    const ray = new fabric.Line(
        [x + (cols * size / 2), y + (rows * size / 2), rayCoordEnd.x, rayCoordEnd.y],
        {
            stroke: 'green',  // Couleur de la ligne
            strokeWidth: 1,
            selectable: false,
        }
    );
    shapes.push(ray);

    return shapes
}

const MAP = `
    00000
    00000
    00C00
    00000
    00000
`

const lines = MAP.trim().split('\n')
const MAP_ARRAY_MATRIX = lines.map(line => line.trim().split(''))
const MAP_ARRAY = MAP_ARRAY_MATRIX.flat()

const MAP_ROWS = MAP_ARRAY_MATRIX.length
const MAP_COLS = MAP_ARRAY_MATRIX.length > 0 ? MAP_ARRAY_MATRIX[0].length : 0

let CAM_COORDINATES = getTokenCoordinates(MAP_ARRAY, MAP_COLS, 'C')

let SQUARE_SIZE = 30
let RADIUS = SQUARE_SIZE * 2
let ANGLE = 270

console.log('MAP_ARRAY_MATRIX:', MAP_ARRAY_MATRIX)
console.log('MAP_ARRAY:', MAP_ARRAY)
console.log('MAP_ROWS:', MAP_ROWS)
console.log('MAP_COLS:', MAP_COLS)
console.log('CAM_COORDINATES:', CAM_COORDINATES)


drawMap(MAP_ARRAY, MAP_ROWS, MAP_COLS, SQUARE_SIZE, 10, 10, RADIUS, ANGLE)


// Events

function handleClick(direction) 
{
   if (direction === 'left')
   {
        ANGLE--;
        if (ANGLE < 0)
            ANGLE = 359;
   }
   else
   {
        ANGLE++;
        if (ANGLE >= 360)
            ANGLE = 0;
   }

   drawMap(MAP_ARRAY, MAP_ROWS, MAP_COLS, SQUARE_SIZE, 10, 10, RADIUS, ANGLE)
}

document.querySelector('.btn-left').addEventListener('click', () => handleClick('left'))
document.querySelector('.btn-right').addEventListener('click', () => handleClick('right'))

document.addEventListener('keydown', function (event) {
    switch (event.key) 
    {
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
