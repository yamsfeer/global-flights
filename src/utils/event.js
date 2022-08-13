export default class Event {
  constructor() {
    this.handler = new Map()
  }
  on(event, fn) {
    if (this.handler.has(event)) {
      this.handler.get(event).push(fn)
    } else {
      this.handler.set(event, new Set([fn]))
    }
    return fn
  }
  off(event, fn) {
    const set = this.handler.get(event)
    if (!set) {
      return
    }
    set.delete(fn)
    if (set.size === 0) {
      this.handler.delete(event)
    }
  }
  trigger(event, ...args) {
    const set = this.handler.get(event)
    set.forEach(fn => fn(...args))
  }
}
