import Stats from 'stats.js'

const stats = new Stats()
const style = stats.domElement.style

style.position = 'absolute'
style.left = '12px'
style.top = '12px'

export default stats
