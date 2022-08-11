import { assert } from 'chai'
import { scene } from '../src/scene/scene.js'

describe('scene', () => {
  it('create scene', () => {
    assert.equal(scene.abc, 'abc')
  })
})
