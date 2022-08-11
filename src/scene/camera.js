import * as THREE from 'three'
import { sceneConfig } from 'config'
import { scene, renderer } from './scene'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const { x, y, z } = sceneConfig.camera.position

const _camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth,
  window.innerHeight,
  0.1,
  1000
)

_camera.position.x = x
_camera.position.y = y
_camera.position.z = z

_camera.lookAt(scene.position)

const _controls = new OrbitControls(_camera, renderer.domElement)
_controls.enableZoom = true
_controls.maxDistance = 1500
_controls.minDistance = 0

export const camera = _camera
export const controls = _controls
