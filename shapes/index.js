let canvas = new fabric.Canvas('canvas')

function draw(shapes, needClear = false)
{
	if (needClear)
		canvas.clear()
	if (shapes instanceof Array)
		shapes.map((shape) => canvas.add(shape))
}

function getLine(pointA, pointB, color) 
{
	let shapes = []

	const points = getLinePoints(pointA, pointB)

	points.forEach(point => {
        const circle = new fabric.Circle({
            left: point.x,
            top: point.y,
            radius: 1,
            fill: color,
        });

        shapes.push(circle)
	})

	return shapes
}

function getRect(pointA, pointB, pointC, pointD, color)
{
	let shape = []
	shape = shape.concat(getLine(pointA, pointB, color))
	shape = shape.concat(getLine(pointB, pointC, color))
	shape = shape.concat(getLine(pointC, pointD, color))
	shape = shape.concat(getLine(pointD, pointA, color))

	return shape
}

function getGrid(x, y, rows, cols, gap, color)
{
	let shapes = []

	for (let i = 0; i < rows; i++)
	{
		for (let j = 0; j < cols; j++) 
		{
			let rectX = x + j * gap;
			let rectY = y + i * gap;
			let A = { x: rectX, y: rectY };
			let B = { x: rectX + gap, y: rectY };
			let C = { x: rectX + gap, y: rectY + gap };
			let D = { x: rectX, y: rectY + gap };
			shapes = shapes.concat(getRect(A, B, C, D, color));
		}		
	}

	return shapes
}

function getCircle(x, y, radius, numPoints, color)
{
	let shapes = []

	const points = getCirclePoints({x: x, y: y}, radius, numPoints)

	points.forEach(point => {
        const circle = new fabric.Circle({
            left: point.x,
            top: point.y,
            radius: 1,
            fill: color,
        });
        shapes.push(circle)
	})

	console.log(points, shapes)

	return shapes
}

let A = { x: 120, y: 100}
let B = { x: 150, y: 120 }

let shape = getLine(A, B, 'blue')

A = { x: 10, y: 10}
B = { x: 100, y: 10 }
let C = { x: 100, y: 100 }
let D = { x: 10, y: 100 }

shape = getRect(A, B, C, D, 'red')
draw(shape)

shape = getGrid(10, 150, 2, 2, 10, 'teal')
draw(shape)

shape = getCircle(100, 100, 20, 100, 'aqua')
draw(shape)