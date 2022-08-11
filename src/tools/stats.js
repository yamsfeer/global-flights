import Stats from 'stats.js'

const stats = new Stats()
const statsStyle = stats.domElement.style
statsStyle.position = 'absolute'
statsStyle.left = '12px'
statsStyle.top = '12px'

export default stats