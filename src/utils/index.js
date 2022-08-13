// 一些工具函数

// 经纬度转换成直角坐标或三维向量
export function LatLong2Coor(radius, latitude, longitude) {
  // 角度转弧度
  const phi = latitude * Math.PI / 180
  const theta = -longitude * Math.PI / 180

  const x = radius * Math.cos(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi)
  const z = radius * Math.cos(phi) * Math.sin(theta)

  return { x, y, z }
}

// 求三维空间中两点的中点
export function midPoint3(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
    z: (p1.z + p2.z) / 2
  }
}

/**
 * rgb 转 16 进制形式
 * @param {String} rgb 'rgb(255, 255, 255)'
 * @returns {String} #ffffff
 */
export function rgbToHex(rgb) {
  const hex = rgb
    .match(/\d+/g) // 提取 rgb 三个数值字符
    .map(n => Number(n).toString(16).padStart(2, 0)) // 在前面补零至两位数，比如 A -> 0A
    .join('')

  return `#${hex}`
}
