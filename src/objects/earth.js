import {
  SphereGeometry,
  TextureLoader,
  MeshBasicMaterial,
  Mesh,
} from 'three'
import { earthOpts } from 'config'

class Earth {
  constructor() {
    const { radius, horFragment, verFragment, textureUrl } = earthOpts

    const geo = new SphereGeometry(radius, horFragment, verFragment)
    const loader = new TextureLoader()
    const material = new MeshBasicMaterial({
      map: loader.load(textureUrl),
    })

    this.mesh = new Mesh(geo, material)
    return this.mesh
  }
}

let instance = null // 单例模式
let proxy = new Proxy(Earth, {
  construct(target, args) { // 对 new 操作代理
    return instance
      ? instance
      : instance = Reflect.construct(target, args)
  }
})

export default proxy
