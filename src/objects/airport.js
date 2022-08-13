import {
  BufferGeometry,
  Points,
  PointsMaterial,
  Vector3,
  TextureLoader,
  Float32BufferAttribute
} from 'three'

import { airportOpts, earthOpts } from 'config'
import { LatLong2Coor } from 'utils'

export default class Airport {
  constructor() {
    const geometry = new BufferGeometry()
    const material = new PointsMaterial(airportOpts.particleMaterial)
    const points = new Points(geometry, material)

    this.airports = []
    this.geometry = geometry
    this.points = points
  }
  draw(airports = []) {
    const vertices = []
    airports.forEach(airport => {
      const { latitude, longitude } = airport
      const { x, y, z } = LatLong2Coor(earthOpts.radius, latitude, longitude)

      vertices.push(x, y, z)
    })
    this.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  }
}
