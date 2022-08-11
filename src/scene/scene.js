import { Scene, WebGLRenderer, Group } from 'three'
import { rendererOpts } from 'config'

const { antialias, clearColor, width, height } = rendererOpts

export const scene = new Scene()
export const renderer = new WebGLRenderer({ antialias })

renderer.setClearColor(clearColor)
renderer.setSize(width, height)

export function updateRenderer() {
  renderer.setSize(window.innerWidth, window.innerHeight)
}
