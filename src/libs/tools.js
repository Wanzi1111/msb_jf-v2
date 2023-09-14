export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  const len = arr.length
  while (++i < len) {
    const item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的交集, 两个数组的元素为数值或字符串
 */
export const getIntersection = (arr1, arr2) => {
  const len = Math.min(arr1.length, arr2.length)
  let i = -1
  const res = []
  while (++i < len) {
    const item = arr2[i]
    if (arr1.indexOf(item) > -1) res.push(item)
  }
  return res
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 * @description 得到两个数组的并集, 两个数组的元素为数值或字符串
 */
export const getUnion = (arr1, arr2) => {
  return Array.from(new Set([...arr1, ...arr2]))
}

/**
 * @param {Array} target 目标数组
 * @param {Array} arr 需要查询的数组
 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
 */
export const hasOneOf = (targetarr, arr) => {
  return targetarr.some(_ => arr.indexOf(_) > -1)
}

/**
 * @param {String|Number} value 要验证的字符串或数值
 * @param {*} validList 用来验证的列表
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * @param {Number} timeStamp 判断时间戳格式是否是毫秒
 * @returns {Boolean}
 */
const isMillisecond = timeStamp => {
  const timeStr = String(timeStamp)
  return timeStr.length > 10
}

/**
 * @param {Number} timeStamp 传入的时间戳
 * @param {Number} currentTime 当前时间时间戳
 * @returns {Boolean} 传入的时间戳是否早于当前时间戳
 */
const isEarly = (timeStamp, currentTime) => {
  return timeStamp < currentTime
}

/**
 * @param {Number} num 数值
 * @returns {String} 处理后的字符串
 * @description 如果传入的数值小于10，即位数只有1位，则在前面补充0
 */
const getHandledValue = num => {
  return num < 10 ? '0' + num : num
}

/**
 * @param {Number} timeStamp 传入的时间
 * @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 * @param {Number} isTimeStamp 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
 */
export const getDate = (timeStamp, startType, isTimeStamp) => {
  if (timeStamp === '') return ''
  let d = ''
  if (isTimeStamp) {
    d = new Date(timeStamp * 1000)
  } else {
    d = new Date(timeStamp)
  }
  const year = d.getFullYear()
  const month = getHandledValue(d.getMonth() + 1)
  const date = getHandledValue(d.getDate())
  const hours = getHandledValue(d.getHours())
  const minutes = getHandledValue(d.getMinutes())
  const second = getHandledValue(d.getSeconds())
  let resStr = ''
  if (startType === 'full') {
    resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + second
  } else if (startType === 'date') {
    resStr = year + '-' + month + '-' + date
  } else {
    resStr = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
  }
  return resStr
}

/**
 * @param {String|Number} timeStamp 时间戳
 * @returns {String} 相对时间字符串
 */
export const getRelativeTime = timeStamp => {
  // 判断当前传入的时间戳是秒格式还是毫秒
  const IS_MILLISECOND = isMillisecond(timeStamp)
  // 如果是毫秒格式则转为秒格式
  if (IS_MILLISECOND) Math.floor(timeStamp /= 1000)
  // 传入的时间戳可以是数值或字符串类型，这里统一转为数值类型
  timeStamp = Number(timeStamp)
  // 获取当前时间时间戳
  const currentTime = Math.floor(Date.parse(new Date()) / 1000)
  // 判断传入时间戳是否早于当前时间戳
  const IS_EARLY = isEarly(timeStamp, currentTime)
  // 获取两个时间戳差值
  let diff = currentTime - timeStamp
  // 如果IS_EARLY为false则差值取反
  if (!IS_EARLY) diff = -diff
  let resStr = ''
  const dirStr = IS_EARLY ? '前' : '后'
  // 少于等于59秒
  if (diff <= 59) resStr = diff + '秒' + dirStr
  // 多于59秒，少于等于59分钟59秒
  else if (diff > 59 && diff <= 3599) resStr = Math.floor(diff / 60) + '分钟' + dirStr
  // 多于59分钟59秒，少于等于23小时59分钟59秒
  else if (diff > 3599 && diff <= 86399) resStr = Math.floor(diff / 3600) + '小时' + dirStr
  // 多于23小时59分钟59秒，少于等于29天59分钟59秒
  else if (diff > 86399 && diff <= 2623859) resStr = Math.floor(diff / 86400) + '天' + dirStr
  // 多于29天59分钟59秒，少于364天23小时59分钟59秒，且传入的时间戳早于当前
  else if (diff > 2623859 && diff <= 31567859 && IS_EARLY) resStr = getDate(timeStamp)
  else resStr = getDate(timeStamp, 'year')
  return resStr
}

/**
 * @param {Number|String} second 秒
 * @returns {String} 转换后时间字符串
 */
export const transformTime = (second = 0) => {
  if (isNaN(parseInt(second))) return
  second = parseInt(second)
  let s, minute, hour, day, year
  if (second < 60) { // 秒
    return `${second}秒`
  } else if (second < 3600) { // 分
    minute = parseInt(second / 60)
    s = second % 60
    return `${minute}分钟${s ? s + '秒' : ''}`
  } else if (second < 86400) { // 时
    hour = parseInt(second / 3600)
    minute = parseInt(second % 3600 / 60)
    s = second % 60
    return `${hour}小时${minute ? minute + '分钟' : ''}`
  } else if (second < 31536000) { // 天
    day = parseInt(second / 86400)
    hour = parseInt(second % 86400 / 3600)
    minute = parseInt(second % 86400 % 3600 / 60)
    s = second % 60
    return `${day}天${hour ? hour + '小时' : ''}${minute ? minute + '分钟' : ''}`
  } else { // 年
    year = parseInt(second / 31536000)
    day = parseInt(second % 31536000 / 86400)
    hour = parseInt(second % 31536000 % 86400 / 3600)
    minute = parseInt(second % 31536000 % 86400 % 3600 / 60)
    s = second % 60
    return `${year}年${day ? day + '天' : ''}${hour ? hour + '小时' : ''}${minute ? minute + '分钟' : ''}${s ? s + '秒' : ''}`
  }
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

/**
 * @description 绑定事件 on(element, event, handler)
 */
export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    const keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @param {*} obj1 对象
 * @param {*} obj2 对象
 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
 */
export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  /* eslint-disable-next-line */
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}

/**
 * 获取当前时间
 */
export const getNowTime = () => {
  const date = new Date()
  // date.setTime(date.getTime() - 24 * 60 * 60 * 1000)/
  const year = date.getFullYear()
  const mon = date.getMonth() > 9 ? date.getMonth() : '0' + (date.getMonth() + 1)
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  return `${year}-${mon}-${day}`
}

/**
 * 获取七天前时间
 */
export const getPrevTime = () => {
  const date = new Date()
  date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * 6)
  const year = date.getFullYear()
  const mon = date.getMonth() > 9 ? date.getMonth() : '0' + (date.getMonth() + 1)
  const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  return `${year}-${mon}-${day}`
}

/**
 * @param {*} startTime
 * @param {*} endTime
 * @description 判断开始时间不能大于结束时间
 */
export const timeEqual = (startTime, endTime) => {
  const start = new Date(startTime)
  const end = new Date(endTime)
  if (start.getTime() > end.getTime()) {
    return false
  } else {
    return true
  }
}

/**
 * @param {*} startTime
 * @param {*} endTime
 * @description 判断时间在两个月范围内
 */
export const timeHorizon = (start, end) => {
  const d1 = new Date(start)
  const d2 = new Date(end)
  let year = d1.getFullYear()
  let month = d1.getMonth() + 2
  if (month >= 11) {
    year += 1
    month -= 11
    d1.setFullYear(year)
    d1.setMonth(month - 1)
  } else {
    d1.setFullYear(year)
    d1.setMonth(month)
  }
  if (d1.getTime() >= d2.getTime()) {
    return true
  } else {
    return false
  }
}

export const expriationTime = () => {
  const expireTime = localStorage.getItem('expireTime')
  if (expireTime && expireTime !== '') {
    const d = new Date()
    const t = new Date(expireTime)
    if (d.getTime() > t.getTime()) {
      localStorage.setItem('expireTime', '')
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}
