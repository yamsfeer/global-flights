import {
  SphereGeometry,
  TextureLoader,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import { earthConfig } from 'config'

class Earth {
  constructor(opts = earthConfig) {
    this.opts = Object.assign({}, earthConfig, opts)
    const {
      radius,
      horFragment,
      verFragment,
    } = this.opts
    const geo = new SphereGeometry(
      radius,
      horFragment,
      verFragment,
    )
    const loader = new TextureLoader()
    const texture = loader.load(this.opts.textureUrl)
    const material = new MeshBasicMaterial({
      color: 0xffffff,
      // wireframe: true,
      map: texture,
    })
    const mesh = new Mesh(geo, material)

    this.mesh = mesh
  }
}

const singleInstance = (() => {
  let single = null
  return new Proxy(Earth, {
    construct(target, args) {
      if (single) {
        return single
      }
      single = Reflect.construct(target, args)
      return single
    },
  })
})()

export default new singleInstance()
