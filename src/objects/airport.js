import {
  BufferGeometry,
  Points,
  PointsMaterial,
  Vector2,
  Float32BufferAttribute,
  Raycaster
} from 'three'

import { airportOpts, earthOpts } from 'config'
import { LatLong2Coor } from 'utils'
import Event from 'utils/event.js'
import { renderer } from 'scene/scene.js'
import { camera } from 'scene/camera.js'

export default class Airport extends Event {
  constructor() {
    super()
    const geometry = new BufferGeometry()
    const material = new PointsMaterial(airportOpts.particleMaterial)
    const points = new Points(geometry, material)

    this.airports = []
    this.geometry = geometry
    this.points = points // 机场用粒子系统实现
    this.vertices = []

    // renderIndex 保存每个粒子的 index 对应的机场
    points.userData.renderIndex = []
    this.renderIndex = points.userData.renderIndex

    this.handleEvent()
  }
  _airportToVertices(airports) {
    const vertices = []
    airports.forEach(airport => {
      const { latitude, longitude } = airport
      const { x, y, z } = LatLong2Coor(earthOpts.radius, latitude, longitude)

      vertices.push(x, y, z)
    })
    return vertices
  }
  add(airports = []) {
    this.vertices.push(...this._airportToVertices(airports))
    this.renderIndex.push(...airports)
    this.draw()
  } // 添加机场
  update(airports = []) {
    this.vertices = this._airportToVertices(airports)
    this.renderIndex = [...airports]
    this.draw()
  } // 只渲染传入的机场
  clear() {
    this.vertices = []
    this.renderIndex = []
    this.draw()
  } // 清空所有机场
  draw() {
    this.geometry.setAttribute(
      'position',
      new Float32BufferAttribute(this.vertices, 3)
    )
  }
  handleEvent() {
    // mousemove、click 事件监听委托给 renderer
    const delegate = renderer.domElement
    delegate.addEventListener('mousemove', e => {
      const airport = this.detect(this.points, e)
      if (airport === null) {
        return
      }
      this.trigger('hover', airport)
    })
    delegate.addEventListener('click', e => {
      const airport = this.detect(this.points, e)
      if (airport === null) {
        return
      }
      this.trigger('click', airport)
    })
  }
  // 找出被 hover 或 click 的机场
  detect(points, e) {
    e.preventDefault()
    e.stopPropagation()

    const mouse = new Vector2()
    mouse.x = (e.clientX / renderer.domElement.width) * 2 - 1
    mouse.y = -(e.clientY / renderer.domElement.height) * 2 + 1

    // 发出射线检测相交
    const raycaster = new Raycaster();
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObject(points)

    // 返回距离屏幕最近的物体
    function cloest(intersects) {
      if (!intersects.length) {
        return null
      }
      let closest = intersects[0]
      for (const obj of intersects) {
        if (obj.distanceToRay < closest.distanceToRay) {
          closest = obj
        }
      }
      return closest
    }

    const detected = cloest(intersects)
    if (detected === null) {
      return detected
    }

    console.log(detected);

    return detected.object.userData.renderIndex[detected.index]
  }
}
