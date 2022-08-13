import { scene, renderer, updateRenderer } from 'scene/scene.js'
import { camera, updateCamera, controls } from 'scene/camera.js'
import stats from 'tools/stats.js'
import gui from 'tools/dat.gui.js'
import Earth from 'objects/earth.js'

import Database from 'database'
import Airport from 'objects/airport'

class App {
  constructor() {
    this.renderer = renderer
    this.scene = scene

    this.camera = camera
    this.controls = controls
    this.stats = stats
    this.gui = gui

    this.init()
    this.initDatabase()
    this.renderAirport()
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
  initDatabase() {
    this.database = new Database()
  }
  renderAirport() {
    const chinaAirports = this.database.find('country', 'china')
    const usAirports = this.database.find('country', 'united state')
    const airportManager = new Airport()

    airportManager.add(usAirports)
    airportManager.update(chinaAirports)
    airportManager.on('hover', target => console.log('hover', target))
    airportManager.on('click', target => console.log('click', target))

    this.scene.add(airportManager.points)
  }
  render() {
    requestAnimationFrame(this.render.bind(this))
    this.stats.update()
    this.renderer.render(this.scene, this.camera)
  }
}

export default App
