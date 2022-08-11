import texture from 'resource/images/map.png'
import { Vector3 } from 'three'

export const earthOpts = {
  radius: 200,
  horFragment: 50,
  verFragment: 50,
  texture: true,
  textureUrl: texture
}

export const rendererOpts = {
  antialias: true,
  clearColor: 0xdddddd,
  width: window.innerWidth,
  height: window.innerHeight
}

export const cameraOpts = {
  fov: 75,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
  position: new Vector3(-30, 40, 500)
}

export const controlOpts = {
  enableZoom: true,
  maxDistance: 1500,
  minDistance: 500
}
