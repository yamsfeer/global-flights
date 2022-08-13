import { assert } from 'chai'
import { describe } from 'mocha'
import Event from '../src/utils/event.js'

describe('event', () => {
  let str = ''
  const event = new Event
  const handleClick = () => str = 'click'
  const handleMove = () => str = 'move'

  it('add event listener', () => {
    event.on('click', handleClick)
    event.on('move', handleMove)

    assert.equal(event.handler.has('click'), true)
    assert.equal(event.handler.has('move'), true)
  })

  it('trigger event', () => {
    event.trigger('click')
    assert.equal(str, 'click')

    event.trigger('move')
    assert.equal(str, 'move')
  })

  it('remove event listener', () => {
    event.off('click', handleClick)
    assert.equal(event.handler.has('click'), false)
    assert.equal(event.handler.has('move'), true)

    event.trigger('move')
    assert.equal(str, 'move')

    event.off('move')
    assert.equal(event.handler.has('click'), false)
    assert.equal(event.handler.has('move'), true)
  })
})
