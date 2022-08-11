import texture from 'resource/images/cloud.jpg'

export const earthConfig = {
  radius: 150,
  horFragment: 40,
  verFragment: 40,
  texture: true,
  textureUrl: texture
}

export const sceneConfig = {
  camera: {
    position: {
      x: -30,
      y: 40,
      z: 500,
    }
  }
}
