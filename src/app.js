import { scene, renderer, updateRenderer } from 'scene/scene.js'
import { camera, updateCamera, controls } from 'scene/camera.js'
import stats from 'tools/stats.js'
import gui from 'tools/dat.gui.js'
import Earth from 'objects/earth.js'

class App {
  constructor() {
    this.renderer = renderer
    this.scene = scene

    this.camera = camera
    this.controls = controls

    this.stats = stats
    this.gui = gui

    this.init()
    this.render()
  }
  init() {
    this.earth = new Earth()
    this.scene.add(this.earth)

    window.addEventListener('resize', () => {
      updateCamera()
      updateRenderer()
    }, false)

    document.getElementById('app').appendChild(this.renderer.domElement)
    document.getElementById('app').appendChild(this.stats.domElement)
  }
  render() {
    requestAnimationFrame(this.render.bind(this))
    this.stats.update()
    this.renderer.render(this.scene, this.camera)
  }
}

export default App
