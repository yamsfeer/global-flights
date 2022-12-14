import texture from 'resource/images/blue.jpg'
import particle from 'resource/images/particle.png'
import { Vector3, TextureLoader } from 'three'

export const earthOpts = {
  radius: 300,
  horFragment: 50,
  verFragment: 50,
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
  position: new Vector3(30, 40, 500)
}

export const controlOpts = {
  enableZoom: true,
  maxDistance: 2000,
  minDistance: 500
}

// 机场粒子
export const airportOpts = {
  particleMaterial: {
    size: 3,
    map: new TextureLoader().load(particle),
  }
}
