
// const input = `
// 0 0 0 0 0 0 0
// 0 0 4 -10 0 0 0
// 0 10 0 2 1 0 0
// 0 0 9 0 3 0 0
// 0 0 0 0 0 0 0
// `

function convertMapToPoints(input) 
{
	const lines = input.trim().split('\n')

	// 2D Array
	const field = lines.map(line => line.split(' ').map(Number))

  const points = []

  for (let row = 0; row < field.length; row++) 
	{
    for (let col = 0; col < field[row].length; col++) 
		{
      const x = col * 10
      const y = row * 10
      const z = field[row][col]
      points.push({ x, y, z , type: field[row][col] !== 0 ? 2 : 1})
    }
  }

  return points
}

// Transform Functions

function rotateX(points, degree) 
{
  const rotatedPoints = points.map((point) => ({ ...point }))

  const radians = (degree * Math.PI) / 180

  const cosTheta = Math.cos(radians)
  const sinTheta = Math.sin(radians)

  for (let index = 0; index < rotatedPoints.length; index++) 
  {
    const x = rotatedPoints[index].x
    const y = rotatedPoints[index].y
    const z = rotatedPoints[index].z

    rotatedPoints[index].x = x
    rotatedPoints[index].y = y * cosTheta - z * sinTheta
    rotatedPoints[index].z = y * sinTheta + z * cosTheta
  }

  return rotatedPoints
}

function rotateY(points, degree) 
{
  const rotatedPoints = points.map((point) => ({ ...point }))

  const radians = (degree * Math.PI) / 180

  const cosTheta = Math.cos(radians)
  const sinTheta = Math.sin(radians)

  for (let index = 0; index < rotatedPoints.length; index++) 
  {
    const x = rotatedPoints[index].x
    const y = rotatedPoints[index].y
    const z = rotatedPoints[index].z

    rotatedPoints[index].x = x * cosTheta + z * sinTheta
    rotatedPoints[index].y = y
    rotatedPoints[index].z = -x * sinTheta + z * cosTheta
  }

  return rotatedPoints
}

function rotateZ(points, degree) 
{
  const rotatedPoints = points.map((point) => ({ ...point }))

  const radians = (degree * Math.PI) / 180

  const cosTheta = Math.cos(radians)
  const sinTheta = Math.sin(radians)

  for (let index = 0; index < rotatedPoints.length; index++) 
  {
    const x = rotatedPoints[index].x
    const y = rotatedPoints[index].y
    const z = rotatedPoints[index].z

    rotatedPoints[index].x = x * cosTheta - y * sinTheta
    rotatedPoints[index].y = x * sinTheta + y * cosTheta
    rotatedPoints[index].z = z
  }

  return rotatedPoints
}

function translateX(points, dx) 
{
  const translatedPoints = points.map((point) => ({ ...point }))

  for (let index = 0; index < translatedPoints.length; index++) 
    translatedPoints[index].x += dx

  return translatedPoints
}

function translateY(points, dy) 
{
  const translatedPoints = points.map((point) => ({ ...point }))

  for (let index = 0; index < translatedPoints.length; index++) 
    translatedPoints[index].y += dy

  return translatedPoints
}

function translateZ(points, dz) 
{
  const translatedPoints = points.map((point) => ({ ...point }))

  for (let index = 0; index < translatedPoints.length; index++) 
    translatedPoints[index].z += dz

  return translatedPoints
}

function zoom(points, zoomFactor) 
{
  if (zoomFactor < -1.0)
    zoomFactor = -1.0
  else if (zoomFactor > 1.0)
    zoomFactor = 1.0

  const zoomedPoints = points.map((point) => ({ ...point }))

  for (let index = 0; index < zoomedPoints.length; index++) 
  {
    zoomedPoints[index].x *= 1.0 + zoomFactor
    zoomedPoints[index].y *= 1.0 + zoomFactor
    zoomedPoints[index].z *= 1.0 + zoomFactor
  }

  return zoomedPoints
}
