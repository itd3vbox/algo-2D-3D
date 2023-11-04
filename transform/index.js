let canvas = new fabric.Canvas('canvas')

function getGrid(points) 
{
  let shapes = []

  for (const point of points) 
  {
    const left = point.x
    const top = point.y
    const size = 10
    
    // Path - Square 10x10
    const pathData = `M ${left} ${top} L ${left + size} ${top} L ${left + size} ${top + size} L ${left} ${top + size} Z`

    const path = new fabric.Path(pathData, {
      fill: 'transparent',
      stroke: 'black',
    })

    shapes.push(path)
  }

  return shapes;
}

function getField(points)
{
	let shapes = []

	const circleDiameter = 5
  const circleRadius = circleDiameter / 2
  const circleColor = 'blue'

  for (let index = 0; index < points.length; index++) 
	{
		const value = points[index].type
		if (value === 2) 
    {
			const left = points[index].x - (circleDiameter / 2)
			const top = points[index].y - (circleDiameter / 2)

			const circle = new fabric.Circle({
				left: left,
				top: top,
				radius: circleRadius,
				fill: circleColor,
			})

			shapes.push(circle)
		}
  }

	return shapes
}

function draw(shapes, needClear = false)
{
	if (needClear)
		canvas.clear()
	if (shapes instanceof Array)
		shapes.map((shape) => canvas.add(shape))
}

function drawRotatedPoints() 
{
  const rotatedPoints = rotateX(rotateY(rotateZ(points, Z), Y), X);
  draw(getGrid(rotatedPoints), true);
  draw(getField(rotatedPoints));
}

// map
const input = `
0 0 0 0 0 0 0
0 0 4 -10 0 0 0
0 10 0 2 1 0 0
0 0 9 0 3 0 0
0 0 0 0 0 0 0
`

let points = convertMapToPoints(input)
console.log(points)

draw(getGrid(points))
draw(getField(points))

function deepCopy(obj) 
{
  return JSON.parse(JSON.stringify(obj))
}

// Coordinates
let X = 0
let Y = 0
let Z = 0


let resetPoints = deepCopy(points)

function drawRotatedPoints() 
{
  const rotatedPoints = rotateX(rotateY(rotateZ(points, Z), Y), X)
  draw(getGrid(rotatedPoints), true)
  draw(getField(rotatedPoints))
}

// Events - Reset

const bntReset = document.querySelector('#reset').addEventListener('click', () => {
	X = 0
	Y = 0
	Z = 0
	points = deepCopy(resetPoints)
	draw(getGrid(points), true)
	draw(getField(points))
})


// Events - Rotation X
const bntRotXAdd = document.querySelector('#rot-x-add').addEventListener('click', () => {
  X++
  console.log('rotate X', X)
  drawRotatedPoints()
})

const bntRotXMin = document.querySelector('#rot-x-min').addEventListener('click', () => {
  X--
  console.log('rotate X', X)
  drawRotatedPoints();
})

// Events - Rotation Y
const bntRotYAdd = document.querySelector('#rot-y-add').addEventListener('click', () => {
  Y++
  console.log('rotate Y', Y)
  drawRotatedPoints()
})

const bntRotYMin = document.querySelector('#rot-y-min').addEventListener('click', () => {
  Y--
  console.log('rotate Y', Y)
  drawRotatedPoints()
})

// Events - Rotation Z
const bntRotZAdd = document.querySelector('#rot-z-add').addEventListener('click', () => {
  Z++
  console.log('rotate Z', Z)
  drawRotatedPoints()
})

const bntRotZMin = document.querySelector('#rot-z-min').addEventListener('click', () => {
  Z--
  console.log('rotate Z', Z)
  drawRotatedPoints()
})


let zoomFactor = 0.0

const bntZoomAdd = document.querySelector('#zoom-add').addEventListener('click', () => {
  if (zoomFactor < 1.0)
    zoomFactor += 0.1
  console.log('zoom', zoomFactor)
  drawZoomedPoints()
})

const bntZoomMin = document.querySelector('#zoom-min').addEventListener('click', () => {
  if (zoomFactor > -1.0)
    zoomFactor -= 0.1
    console.log('zoom', zoomFactor)
    drawZoomedPoints()
})

function drawZoomedPoints() 
{
  const rotatedPoints = rotateX(rotateY(rotateZ(points, Z), Y), X)
  const zoomedPoints = zoom(rotatedPoints, zoomFactor)
  draw(getGrid(zoomedPoints), true)
  draw(getField(zoomedPoints))
}