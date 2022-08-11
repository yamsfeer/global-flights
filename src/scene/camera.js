import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { cameraOpts, controlOpts } from 'config'
import { scene, renderer } from './scene.js'

const { fov, aspect, near, far, position } = cameraOpts

export const camera = new PerspectiveCamera(fov, aspect, near, far)
Object.assign(camera.position, position)
camera.lookAt(scene.position)

export const controls = new OrbitControls(camera, renderer.domElement)
Object.assign(controls, controlOpts)

export function updateCamera() {
  camera.aspect = aspect
  camera.updateProjectionMatrix()
}
