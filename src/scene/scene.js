import { Scene, WebGLRenderer, Group } from 'three'

const _scene = new Scene()
const _renderer = new WebGLRenderer()
const _group = new Group()

_renderer.setClearColor(0x000000)
_renderer.setSize(window.innerWidth, window.innerHeight)

_scene.add(_group)

export const scene = _scene
export const renderer = _renderer
export const group = _group